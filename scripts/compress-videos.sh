#!/bin/bash

# Run from project root: bash scripts/compress-videos.sh

VIDEOS_DIR="./public/videos"

echo "=== AriaLux Video Compression ==="
echo ""

if ! command -v ffmpeg &> /dev/null; then
  echo "❌ ffmpeg not found."
  exit 1
fi

echo "Found videos:"
find "$VIDEOS_DIR" -type f \( -name "*.mov" -o -name "*.mp4" \) ! -name ".gitkeep" | while IFS= read -r f; do
  SIZE=$(du -sh "$f" | cut -f1)
  echo "  $SIZE  $f"
done
echo ""

while IFS= read -r INPUT_FILE; do
  FILENAME=$(basename "$INPUT_FILE")
  BASENAME="${FILENAME%.*}"
  DIR=$(dirname "$INPUT_FILE")
  OUTPUT_FILE="${DIR}/${BASENAME}.mp4"
  TEMP_FILE="${DIR}/${BASENAME}.tmp.mp4"

  SIZE_BEFORE=$(du -sh "$INPUT_FILE" | cut -f1)
  echo "▶ Processing: $FILENAME ($SIZE_BEFORE)"

  ffmpeg -i "$INPUT_FILE" \
    -vcodec libx264 \
    -crf 26 \
    -preset slow \
    -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
    -acodec aac \
    -b:a 128k \
    -movflags +faststart \
    -y \
    "$TEMP_FILE" 2>&1 | grep -E "frame=|time=|error|Error" | tail -3

  if [ $? -eq 0 ] && [ -f "$TEMP_FILE" ]; then
    rm -f "$INPUT_FILE"
    mv "$TEMP_FILE" "$OUTPUT_FILE"
    SIZE_AFTER=$(du -sh "$OUTPUT_FILE" | cut -f1)
    echo "  ✅ $SIZE_BEFORE → $SIZE_AFTER"
  else
    echo "  ❌ Failed — original kept"
    rm -f "$TEMP_FILE"
  fi
  echo ""

done < <(find "$VIDEOS_DIR" -type f \( -name "*.mov" -o -name "*.mp4" \) ! -name ".gitkeep")

echo "=== Done ==="
find "$VIDEOS_DIR" -type f ! -name ".gitkeep" -exec du -sh {} \;
echo ""
du -sh "$VIDEOS_DIR"