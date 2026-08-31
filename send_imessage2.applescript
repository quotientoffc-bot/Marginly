set msg to "Hey Nirav, here are the step-by-step instructions to configure the Marginly integrations.

For Figma specifically, we need to set the Redirect URLs to:
- https://marginly-psi.vercel.app/api/auth/callback/figma
- http://localhost:3000/api/auth/callback/figma

And for OAuth Scopes, make sure to check:
- Files -> file:read
- Webhooks -> webhooks:write

Once you have the Client ID and Client Secret, send them back!"

tell application "Messages"
    set targetService to 1st service whose service type = iMessage
    set targetBuddy to buddy "Nirav 🖤🐒🐒" of targetService
    send msg to targetBuddy
end tell
