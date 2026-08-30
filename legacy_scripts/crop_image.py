from PIL import Image

# Open the image
img = Image.open('public/dashboard-screen.png')
width, height = img.size

# Crop 35 pixels from every side to ensure cursors/edges are removed
left = 35
top = 35
right = width - 35
bottom = height - 35

cropped_img = img.crop((left, top, right, bottom))
cropped_img.save('public/dashboard-screen.png')
print(f"Cropped from {width}x{height} to {cropped_img.size[0]}x{cropped_img.size[1]}")
