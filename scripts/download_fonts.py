import urllib.request
import re
import os

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

with open('public/fonts/fonts.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Find protocol-relative and https fontshare URLs
fontshare_matches = re.findall(r'//cdn\.fontshare\.com/[^\'\")]+', css)

counter = 100
for match in set(fontshare_matches):
    counter += 1
    full_url = 'https:' + match
    ext = 'woff2' if '.woff2' in match else ('woff' if '.woff' in match else 'ttf')
    local_name = f'fontshare_{counter}.{ext}'
    local_path = os.path.join('public/fonts', local_name)
    
    print(f'Downloading {full_url} -> {local_name}')
    req = urllib.request.Request(full_url, headers=headers)
    with urllib.request.urlopen(req) as resp:
        with open(local_path, 'wb') as f_out:
            f_out.write(resp.read())
            
    css = css.replace(match, f'/fonts/{local_name}')

with open('public/fonts/fonts.css', 'w', encoding='utf-8') as f:
    f.write(css)

print('Fontshare local replacement complete!')
