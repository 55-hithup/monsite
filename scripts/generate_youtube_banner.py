from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

width, height = 2560, 1440
img = Image.new('RGBA', (width, height), (7, 10, 15, 255))
center_x, center_y = width // 2, height // 2

# 1. Halo bleu glacier central
glow = Image.new('RGBA', (width, height), (0, 0, 0, 0))
glow_draw = ImageDraw.Draw(glow)
for r in range(850, 0, -8):
    alpha = int(32 * (1 - r / 850))
    glow_draw.ellipse(
        [center_x - r * 1.6, center_y - r * 0.8, center_x + r * 1.6, center_y + r * 0.8],
        fill=(2, 132, 199, alpha)
    )
img = Image.alpha_composite(img, glow)

# 2. Points tech subtils
lines_layer = Image.new('RGBA', (width, height), (0, 0, 0, 0))
lines_draw = ImageDraw.Draw(lines_layer)
for x in range(160, width, 160):
    for y in range(120, height, 120):
        if abs(x - center_x) < 700 and abs(y - center_y) < 240:
            continue
        lines_draw.ellipse([x - 1.5, y - 1.5, x + 1.5, y + 1.5], fill=(255, 255, 255, 14))
img = Image.alpha_composite(img, lines_layer)

# 3. Logo officiel logo.webp
logo_path = r'C:/Users/Alex/Desktop/Pro/devsupai new site/public/logo.webp'
logo_raw = Image.open(logo_path).convert('RGBA')
logo_size = 144
logo = logo_raw.resize((logo_size, logo_size), Image.Resampling.LANCZOS)

logo_glow = Image.new('RGBA', (logo_size + 80, logo_size + 80), (0, 0, 0, 0))
lg_draw = ImageDraw.Draw(logo_glow)
lg_draw.ellipse([15, 15, logo_size + 65, logo_size + 65], fill=(2, 132, 199, 95))
logo_glow = logo_glow.filter(ImageFilter.GaussianBlur(24))

font_dir = r'C:/Users/Alex/Desktop/Pro/devsupai new site/public/fonts'
font_title = ImageFont.truetype(os.path.join(font_dir, 'Montserrat-Black.ttf'), 102)
font_serif = ImageFont.truetype(os.path.join(font_dir, 'PlayfairDisplay-Italic.ttf'), 38)
font_tags = ImageFont.truetype(os.path.join(font_dir, 'Montserrat-Bold.ttf'), 17)
font_url = ImageFont.truetype(os.path.join(font_dir, 'Montserrat-Bold.ttf'), 20)

title_text = 'DEVSUPAI'
tracking_px = 16
title_w = sum(font_title.getbbox(char)[2] + tracking_px for char in title_text) - tracking_px

gap = 46
total_w = logo_size + gap + title_w
start_x = center_x - total_w // 2

logo_x = start_x
logo_y = center_y - logo_size // 2 - 28

img.paste(logo_glow, (logo_x - 40, logo_y - 40), logo_glow)
img.paste(logo, (logo_x, logo_y), logo)

text_draw = ImageDraw.Draw(img)
cur_x = logo_x + logo_size + gap
title_y = center_y - 88

for char in title_text:
    text_draw.text((cur_x, title_y + 4), char, font=font_title, fill=(0, 0, 0, 190))
    text_draw.text((cur_x, title_y), char, font=font_title, fill=(255, 255, 255, 255))
    char_w = font_title.getbbox(char)[2]
    cur_x += char_w + tracking_px

sub_text = chr(76) + chr(39) + 'Atelier Web Sur-Mesure & Performance'
sub_y = title_y + 114
text_draw.text((logo_x + logo_size + gap, sub_y + 2), sub_text, font=font_serif, fill=(0, 0, 0, 140))
text_draw.text((logo_x + logo_size + gap, sub_y), sub_text, font=font_serif, fill=(186, 230, 253, 250))

tags_y = sub_y + 64
badges = ['SITES SUR-MESURE', 'REACT & VITE', 'PERFORMANCE 100/100', 'SEO CIBLE']
badge_x = logo_x + logo_size + gap

for badge in badges:
    bbox = font_tags.getbbox(badge)
    bw = bbox[2] - bbox[0] + 26
    bh = 32
    badge_rect = [badge_x, tags_y, badge_x + bw, tags_y + bh]
    text_draw.rounded_rectangle(badge_rect, radius=16, fill=(15, 23, 42, 200), outline=(2, 132, 199, 130), width=1)
    text_draw.text((badge_x + 13, tags_y + 6), badge, font=font_tags, fill=(240, 249, 255, 240))
    badge_x += bw + 12

url_text = 'devsupai.fr'
url_x = center_x + 460
url_y = center_y + 155
text_draw.text((url_x, url_y), url_text, font=font_url, fill=(2, 132, 199, 230))

out_dir = r'C:/Users/Alex/Desktop/Pro/devsupai new site/public/banniere-youtube'
os.makedirs(out_dir, exist_ok=True)
out_file = os.path.join(out_dir, 'banniere_youtube_devsupai_identite_officielle_2560x1440.jpg')

rgb_img = img.convert('RGB')
rgb_img.save(out_file, 'JPEG', quality=96, optimize=True)

desktop_file = r'C:/Users/Alex/Desktop/banniere_youtube_devsupai_identite_officielle_2560x1440.jpg'
rgb_img.save(desktop_file, 'JPEG', quality=96, optimize=True)

print('Succes: Banniere officielle 2560x1440 generee !')
print('Poids:', os.path.getsize(out_file) / 1024 / 1024, 'Mo')
