import os
from pathlib import Path
from PIL import Image

PUBLIC = Path("public")
SRC    = Path("src")

SKIP = {"arialux-logo.png", "arialux-logo-black.png", "arialux-logo-white.png"}

pngs = [p for p in PUBLIC.rglob("*.png") if p.name not in SKIP]
print(f"Found {len(pngs)} PNGs to convert\n")

for png in pngs:
    webp = png.with_suffix(".webp")
    before = png.stat().st_size // 1024

    img = Image.open(png)
    img.save(webp, "WEBP", quality=82)

    after = webp.stat().st_size // 1024
    print(f"✓ {png.name}  {before}KB → {after}KB  (saved {before - after}KB)")

    for src_file in SRC.rglob("*.ts*"):
        text = src_file.read_text(encoding="utf-8")
        if png.name in text:
            src_file.write_text(text.replace(png.name, webp.name), encoding="utf-8")
            print(f"  → updated {src_file}")

    png.unlink()
    print(f"  → deleted {png.name}\n")

print("All done!")