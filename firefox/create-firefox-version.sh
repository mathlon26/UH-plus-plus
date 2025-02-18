#!/bin/bash

# Define source and destination directories
SOURCE_DIR="$(dirname "$(dirname "$(realpath "$0")")")"
BUILD_DIR="$SOURCE_DIR/build"

# Ensure the build directory exists
mkdir -p "$BUILD_DIR"

# Copy files from the parent directory to the build folder
# -r: Copy directories recursively
# -u: Only copy files if the source file is newer than the destination file or if the destination file does not exist
# --parents: Preserve the directory structure relative to the source directory
find "$SOURCE_DIR" -type f -not -path "$BUILD_DIR/*" | while read -r FILE; do
  RELATIVE_PATH="${FILE#$SOURCE_DIR/}"
  DEST_PATH="$BUILD_DIR/$RELATIVE_PATH"
  mkdir -p "$(dirname "$DEST_PATH")"
  cp -u "$FILE" "$DEST_PATH"
done

echo "All files have been copied to the build folder: $BUILD_DIR"
