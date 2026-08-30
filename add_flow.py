import json
import os

config_path = os.path.expanduser('~/.gemini/config/mcp_config.json')

with open(config_path, 'r') as f:
    config = json.load(f)

config['mcpServers']['google-flow-browser'] = {
    "command": "npx",
    "args": [
        "-y",
        "google-flow-browser-mcp"
    ]
}

with open(config_path, 'w') as f:
    json.dump(config, f, indent=2)

print("Added google-flow-browser to MCP config")
