import os
from PIL import Image
import pillow_avif

def convert_to_avif():
    folder_path = os.getcwd()
    print(f"Working directory: {folder_path}")
    files = os.listdir('.')
    png_files = [f for f in files if f.endswith('.png') and f.startswith('perfume_')]
    print(f"Found {len(png_files)} PNG files to convert to AVIF.")
    
    count = 0
    for filename in png_files:
        avif_file = filename.rsplit('.', 1)[0] + '.avif'
        try:
            with Image.open(filename) as img:
                # AVIF is very efficient, q=80 is usually visually identical to PNG
                img.save(avif_file, 'avif', quality=80)
            os.remove(filename)
            count += 1
            if count % 20 == 0:
                print(f"Converted {count} / {len(png_files)} files...")
        except Exception as e:
            print(f"Error converting {filename}: {e}")
            
    print(f"Successfully converted {count} files to AVIF.")

if __name__ == "__main__":
    convert_to_avif()
