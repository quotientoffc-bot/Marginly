import json

with open('src/app/(auth)/login/avatar.avatar.json', 'r') as f:
    data = json.load(f)

# wide-down-left has y: 18.0 (right). Make it look down-left.
if 'wide-down-left' in data['expressions']:
    data['expressions']['wide-down-left']['head']['y'] = -25.0
    data['expressions']['wide-down-left']['head']['x'] = -20.0

with open('src/app/(auth)/login/avatar.avatar.json', 'w') as f:
    json.dump(data, f, indent=2)

print("JSON updated successfully")
