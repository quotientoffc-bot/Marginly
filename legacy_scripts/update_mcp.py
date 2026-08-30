import json
import os

config_path = os.path.expanduser('~/.gemini/config/mcp_config.json')

with open(config_path, 'r') as f:
    config = json.load(f)

config['mcpServers']['notebooklm'] = {
    "command": "npx",
    "args": [
        "-y",
        "notebooklm-mcp"
    ]
}

with open(config_path, 'w') as f:
    json.dump(config, f, indent=2)

print("Updated successfully")
