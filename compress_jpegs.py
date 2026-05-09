import os
from pathlib import Path
from PIL import Image

PUBLIC = Path("public")

jpegs = list(PUBLIC.rglob("*.jpg")) + list(PUBLIC.rglob("*.jpeg"))
print(f"Found {len(jpegs)} JPEGs to compress\n")

total_before = 0
total_after = 0

for jpg in jpegs:
    before = jpg.stat().st_size // 1024
    total_before += before

    img = Image.open(jpg)
    
    # Resize if wider than 1920px
    if img.width > 1920:
        ratio = 1920 / img.width
        new_size = (1920, int(img.height * ratio))
        img = img.resize(new_size, Image.LANCZOS)

    img.save(jpg, "JPEG", quality=82, optimize=True)

    after = jpg.stat().st_size // 1024
    total_after += after
    print(f"✓ {jpg.name}  {before}KB → {after}KB  (saved {before - after}KB)")

print(f"\nTotal: {total_before}KB → {total_after}KB (saved {total_before - total_after}KB)")