import json

with open('src/app/(auth)/login/avatar.avatar.json', 'r') as f:
    data = json.load(f)

# far-right-glance has y: 35.3
# Let's make surprised-left mirror this for the pure LEFT look
if 'surprised-left' in data['expressions']:
    data['expressions']['surprised-left']['head']['y'] = -35.3

# Let's make asymmetric-up-left actually look up-left (currently y=4.7, which is right!)
if 'asymmetric-up-left' in data['expressions']:
    data['expressions']['asymmetric-up-left']['head']['y'] = -25.0
    data['expressions']['asymmetric-up-left']['head']['x'] = 15.0

with open('src/app/(auth)/login/avatar.avatar.json', 'w') as f:
    json.dump(data, f, indent=2)

print("JSON updated successfully")
