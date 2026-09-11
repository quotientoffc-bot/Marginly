import re

with open('src/components/marketing/Scene.tsx', 'r') as f:
    content = f.read()

# Import Lightformer
if 'Lightformer' not in content:
    content = content.replace('Environment, MeshTransmissionMaterial, Float, Sparkles, ContactShadows', 'Environment, MeshTransmissionMaterial, Float, Sparkles, ContactShadows, Lightformer')

# Replace preset="city" with procedural environment
old_env = '<Environment preset="city" />'
new_env = """<Environment resolution={256}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
            <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI} position={[0, -5, 0]} scale={[10, 10, 1]} color="#4ADE80" />
          </group>
        </Environment>"""

content = content.replace(old_env, new_env)

with open('src/components/marketing/Scene.tsx', 'w') as f:
    f.write(content)
