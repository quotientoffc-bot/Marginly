import re

with open('src/components/marketing/ElasticMesh.tsx', 'r') as f:
    content = f.read()

old_texture_code = """  if (texture) {
    texture.anisotropy = 16; // Improve texture resolution quality when tilted
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
  }"""

new_texture_code = """  if (texture) {
    texture.anisotropy = 16;
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
  }"""

content = content.replace(old_texture_code, new_texture_code)

with open('src/components/marketing/ElasticMesh.tsx', 'w') as f:
    f.write(content)
