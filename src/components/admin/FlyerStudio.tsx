import { useEffect, useRef, useState } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';

export default function FlyerStudio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let cesdkInstance: any = null;

    const initSDK = async () => {
      try {
        // Dynamically import CreativeEditorSDK for SSR safety
        const { default: CreativeEditorSDK } = await import('@cesdk/cesdk-js');
        
        if (!containerRef.current) return;

        const config = {
          license: '', // Evaluation mode (demo/trial mode)
          role: 'Creator',
          theme: 'dark',
          ui: {
            elements: {
              view: 'default',
              navigation: {
                action: {
                  export: {
                    show: true,
                    format: ['application/pdf', 'image/png'],
                  },
                },
              },
            },
          },
        };

        cesdkInstance = await CreativeEditorSDK.create(containerRef.current, config as any);

        // Load default Flyer design scene (A5 format, 148 x 210 mm)
        await cesdkInstance.createDesignScene([
          {
            width: 148,
            height: 210,
            unit: 'mm',
          },
        ]);

        setStatus('ready');
      } catch (err: any) {
        console.error('Error loading CE.SDK:', err);
        setErrorMessage(err?.message || 'Erreur d\'initialisation du studio.');
        setStatus('error');
      }
    };

    initSDK();

    return () => {
      if (cesdkInstance && typeof cesdkInstance.dispose === 'function') {
        cesdkInstance.dispose();
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-full w-full rounded-2xl overflow-hidden border border-[rgba(245,246,250,0.08)] bg-[#0B0F1E] shadow-2xl">
      {/* Studio Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-[#121729] border-b border-[rgba(245,246,250,0.06)] gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#2E8FE0]/20 border border-[#2E8FE0]/40 flex items-center justify-center text-[#2E8FE0]">
            <Sparkles size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-text-primary">Studio de Création de Flyers & Visuels</h2>
            <p className="text-[11px] text-text-secondary">Éditeur Canva Clone (IMG.LY CE.SDK) prêt à l'impression (PDF HD & CMJN)</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] label-mono text-emerald-400 font-bold">
            <span>●</span> Format A5 (148 x 210 mm)
          </span>
        </div>
      </div>

      {/* Editor Mount Container */}
      <div className="relative flex-1 w-full min-h-[720px] bg-[#070913]">
        {status === 'loading' && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#070913]/90 text-text-secondary font-mono text-xs gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
            <span>Initialisation du Studio de Création CE.SDK...</span>
          </div>
        )}

        {status === 'error' && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#070913] text-text-secondary font-mono text-xs p-6 text-center">
            <AlertCircle size={24} className="text-red-400 mb-2" />
            <p className="text-sm font-bold text-text-primary mb-1">Erreur de chargement du studio</p>
            <p className="text-xs text-red-400/80">{errorMessage}</p>
          </div>
        )}

        <div ref={containerRef} className="w-full h-[720px]" />
      </div>
    </div>
  );
}
