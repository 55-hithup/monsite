import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '../node_modules/vite-react-ssg');

function patchFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    if (content.includes('react-router-dom/server.js')) {
      content = content.replace(/react-router-dom\/server\.js/g, 'react-router');
      modified = true;
    }
    if (content.includes('react-router-dom/server')) {
      content = content.replace(/react-router-dom\/server/g, 'react-router');
      modified = true;
    }

    const searchManifest = "window.__VITE_REACT_SSG_STATIC_LOADER_MANIFEST__ = await (await fetch(withLeadingSlash(manifestUrl))).json();";
    const replaceManifest = "window.__VITE_REACT_SSG_STATIC_LOADER_MANIFEST__ = await (async () => { try { const r = await fetch(withLeadingSlash(manifestUrl)); return r.ok ? await r.json() : {}; } catch { return {}; } })();";
    
    if (content.includes(searchManifest)) {
      content = content.replace(searchManifest, replaceManifest);
      modified = true;
    }

    const searchData = "window.__VITE_REACT_SSG_STATIC_LOADER_DATA__[pathname] = await (await fetch(withLeadingSlash(dataUrl))).json();";
    const replaceData = "window.__VITE_REACT_SSG_STATIC_LOADER_DATA__[pathname] = await (async () => { try { const r = await fetch(withLeadingSlash(dataUrl)); return r.ok ? await r.json() : {}; } catch { return {}; } })();";

    if (content.includes(searchData)) {
      content = content.replace(searchData, replaceData);
      modified = true;
    }

    // Patch React 19 renderToPipeableStream to renderToString in SSG build
    // This prevents React 19 from injecting hoisted <link rel="preload"> tags inside <div id="root">
    const searchPipeable = "async function renderStaticApp(app) {";
    if (content.includes(searchPipeable) && content.includes("renderToPipeableStream")) {
      const renderStaticAppRegex = /async function renderStaticApp\(app\)\s*\{[\s\S]*?return writableStream\.getPromise\(\);\s*\}/;
      if (renderStaticAppRegex.test(content)) {
        content = content.replace(
          renderStaticAppRegex,
          "async function renderStaticApp(app) {\n  return ReactDomServer.renderToString(app);\n}"
        );
        modified = true;
      }
    }

    // Patch React 19 render & hydrate in client bundle to guarantee zero DOM duplication
    const renderHydrateRegex = /function render\(app,\s*container[\s\S]*?function documentReady/;
    if (renderHydrateRegex.test(content)) {
      const replacement = `function render(app, container, renderOptions = {}) {
  container.innerHTML = '';
  import('react-dom/client').then((mod) => {
    const createRoot = mod.createRoot || mod.default?.createRoot;
    const root = createRoot(container);
    React.startTransition(() => {
      root.render(app);
    });
  });
}
function hydrate(app, container, renderOptions = {}) {
  container.innerHTML = '';
  import('react-dom/client').then((mod) => {
    const createRoot = mod.createRoot || mod.default?.createRoot;
    const root = createRoot(container);
    React.startTransition(() => {
      root.render(app);
    });
  });
}

function documentReady`;
      content = content.replace(renderHydrateRegex, replacement);
      modified = true;
    }

    // Patch createRouter to pass hydrationData from server SSR if present
    const searchRouterHydration = "{ basename: BASE_URL, future: routerFeature }";
    const replaceRouterHydration = "{ basename: BASE_URL, future: routerFeature, hydrationData: typeof window !== 'undefined' ? window.__staticRouterHydrationData : void 0 }";
    if (content.includes(searchRouterHydration) && !content.includes('window.__staticRouterHydrationData')) {
      content = content.replace(searchRouterHydration, replaceRouterHydration);
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`[patch-ssg] Patched: ${path.relative(targetDir, filePath)}`);
    }
  } catch (err) {
    console.error(`[patch-ssg] Error processing ${filePath}:`, err);
  }
}

function scanDir(dir) {
  if (!fs.existsSync(dir)) {
    console.warn(`[patch-ssg] Target directory does not exist: ${dir}`);
    return;
  }
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.mjs')) {
      patchFile(fullPath);
    }
  }
}

console.log('[patch-ssg] Scanning vite-react-ssg for react-router-dom server imports...');
scanDir(targetDir);
console.log('[patch-ssg] Done.');
