export GEMINI_API_KEY="$GEMINI_API_KEY"

# The script requires the API key to be set in the environment or passed as an argument.
# Since we are using Antigravity, we can use our existing key. Let's make sure it's exported.
# I will use the python SDK script to generate a 9:16 vertical video.

PROMPT="[0-3s] Clean dark background. A subtle, elegant fade reveals the text: 'A better way to stay focused on your Mac.' 
[3-7s] Smooth zoom into a pristine, realistic screen recording of the Margin application interface on a Mac. The UI features dark glass, translucent layers, and squircle corners. 
[7-17s] Calm, intentional cursor movement demonstrates the Scope Monitor and Dynamic Quoting features. Soft, clean text overlays appear briefly: 'Control what matters, instantly.' and 'Built for a calmer workflow.'
[17-25s] The UI gently blurs out, revealing the Margin logo and the text: 'Margin - Premium Scope & Quote Management. Try Margin today.'

Motion: Slow, cinematic pacing. Soft easing for all movement. Smooth dissolves and masked UI transitions.
Style: Minimalist, premium, high-end product demo. No people, faces, or lifestyle scenes. 
Audio design: Quiet, refined, modern technology background music. No vocals. Subtle, soft UI click sound effects."

python3 /Users/daanu/.gemini/config/plugins/gemini-api/skills/gemini-omni-flash-api/scripts/video/generate_video.py \
  --aspect-ratio "9:16" \
  --output "margin_instagram_ad.mp4" \
  "$PROMPT"
