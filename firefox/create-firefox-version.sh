
#!/bin/bash

# Define source and destination directories
SOURCE_DIR="$(dirname "$(dirname "$(realpath "$0")")")"
BUILD_DIR="$SOURCE_DIR/build"
EXCLUDE_DIR="$(basename "$(dirname "$(realpath "$0")")")"  # Exclude the firefox directory

# Clear the build directory if it exists
if [ -d "$BUILD_DIR" ]; then
  rm -rf "$BUILD_DIR"
fi

# Ensure the build directory exists
mkdir -p "$BUILD_DIR"

# Copy files from the parent directory to the build folder, excluding the firefox directory
find "$SOURCE_DIR" -type f -not -path "$BUILD_DIR/*" -not -path "$SOURCE_DIR/$EXCLUDE_DIR/*" | while read -r FILE; do
  RELATIVE_PATH="${FILE#$SOURCE_DIR/}"
  DEST_PATH="$BUILD_DIR/$RELATIVE_PATH"
  mkdir -p "$(dirname "$DEST_PATH")"
  cp -u "$FILE" "$DEST_PATH"
done

# Replace files in the build directory with those from the firefox directory if they exist
find "$SOURCE_DIR/$EXCLUDE_DIR" -type f | while read -r REPLACEMENT_FILE; do
  RELATIVE_PATH="${REPLACEMENT_FILE#$SOURCE_DIR/$EXCLUDE_DIR/}"
  TARGET_FILE="$BUILD_DIR/$RELATIVE_PATH"
  mkdir -p "$(dirname "$TARGET_FILE")"
  cp "$REPLACEMENT_FILE" "$TARGET_FILE"
done

echo "All files have been copied to the build folder: $BUILD_DIR"
echo "Replacements from $EXCLUDE_DIR have been applied to the build directory where applicable."
