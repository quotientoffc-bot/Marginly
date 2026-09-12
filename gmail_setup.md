# Real Gmail Integration

To make this a real integration instead of a UI mock, we need to set up Google OAuth so the platform can actually read their emails.

Here is what I need you to do in your browser:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project called **Marginly**.
3. Go to **APIs & Services > Library** and enable the **Gmail API**.
4. Go to **APIs & Services > Credentials** and create an **OAuth Client ID** (Web Application).
5. Add `http://localhost:3000/auth/callback` (or your Supabase callback URL) as the Authorized Redirect URI.
6. Copy the **Client ID** and **Client Secret** and give them to me.

Once you give me those, I will:
1. Configure Supabase to handle the Google OAuth handshake.
2. Request the `https://www.googleapis.com/auth/gmail.readonly` scope.
3. Write a Next.js server action to fetch emails from the user's inbox and parse them for scope creep using AI!
