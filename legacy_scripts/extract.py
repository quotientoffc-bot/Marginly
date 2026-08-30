import json

with open("first_overwrites.txt", "r") as f:
    for line in f:
        data = json.loads(line)
        for call in data.get("tool_calls", []):
            if call["name"] == "replace_file_content" and call["args"]["TargetFile"].endswith("dashboard/page.tsx"):
                with open("restored_dashboard.tsx", "w") as out:
                    out.write(call["args"]["TargetContent"])
                print("Found TargetContent for replace_file_content!")
                exit(0)
            if call["name"] == "write_to_file" and call["args"]["TargetFile"].endswith("dashboard/page.tsx"):
                with open("restored_dashboard.tsx", "w") as out:
                    out.write(call["args"]["CodeContent"])
                print("Found CodeContent for write_to_file!")
                exit(0)
print("Not found in JSON.")
