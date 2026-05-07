from PIL import Image
from pathlib import Path

src = Path(__file__).resolve().parent.parent / "public" / "images" / "arialux-logo.png"
img = Image.open(src).convert("RGBA")


def replace_text_color(image, target_color):
    pixels = image.load()
    width, height = image.size
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a > 0 and abs(r - g) < 20 and abs(g - b) < 20 and r > 40:
                pixels[x, y] = (*target_color, a)
    return image


white_path = src.parent / "arialux-logo-white.png"
black_path = src.parent / "arialux-logo-black.png"

replace_text_color(img.copy(), (255, 255, 255)).save(white_path)
replace_text_color(img.copy(), (0, 0, 0)).save(black_path)

print(white_path)
print(black_path)
