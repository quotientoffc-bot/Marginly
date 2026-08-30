---
description: How to send iMessages
trigger: always_on
---

When the user asks to send an iMessage, ALWAYS send it directly using AppleScript (`osascript -e 'tell application "Messages" to send...'`) rather than opening a draft, so the user does not have to press enter.
