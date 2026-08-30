from PIL import Image, ImageDraw

img = Image.open('public/dashboard-screen.png')
draw = ImageDraw.Draw(img)
# Draw a black rectangle in the bottom left corner to cover the cursor
# The cursor is usually at the bottom left, e.g. x: 0-100, y: 360-461
draw.rectangle([0, 360, 100, 461], fill=(0, 0, 0))
img.save('public/dashboard-screen.png')
