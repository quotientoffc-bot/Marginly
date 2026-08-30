import re

with open('insta.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Look for window._sharedData or <meta property="og:description"
desc = re.search(r'<meta property="og:title" content="([^"]+)"', content)
if desc:
    print("Title:", desc.group(1))

desc = re.search(r'<meta property="og:description" content="([^"]+)"', content)
if desc:
    print("Desc:", desc.group(1))

title = re.search(r'<title>(.*?)</title>', content)
if title:
    print("Title tag:", title.group(1))
