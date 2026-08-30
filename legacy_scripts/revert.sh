#!/bin/bash

# Revert Integrations
sed -i '' 's/import ShinyButton from "@\/components\/ui\/shiny-button";/import RadialGlowButton from "@\/components\/ui\/radial-glow-button";/g' src/app/dashboard/integrations/page.tsx
sed -i '' 's/<ShinyButton>Request App<\/ShinyButton>/<RadialGlowButton>Request App<\/RadialGlowButton>/g' src/app/dashboard/integrations/page.tsx

# Revert Scope Monitor
sed -i '' 's/import ShinyButton from "@\/components\/ui\/shiny-button";/import GenerateButton from "@\/components\/ui\/generate-button";/g' src/app/dashboard/scope-monitor/page.tsx
sed -i '' 's/<ShinyButton className="w-full" icon={<Sparkles className="w-4 h-4" \/>}>/<GenerateButton defaultText="Draft Change Order" generatingText="Drafting..." className="w-full h-12 rounded-xl" \/>/g' src/app/dashboard/scope-monitor/page.tsx
sed -i '' '/Draft Change Order/d' src/app/dashboard/scope-monitor/page.tsx
sed -i '' '/<\/ShinyButton>/d' src/app/dashboard/scope-monitor/page.tsx

# Revert Clients
sed -i '' 's/import ShinyButton from "@\/components\/ui\/shiny-button";/import GenerateButton from "@\/components\/ui\/generate-button";/g' src/app/dashboard/clients/page.tsx
sed -i '' 's/<ShinyButton className="w-full relative z-10">/<GenerateButton defaultText="Trigger AI Upsell" generatingText="Triggering..." className="w-full relative z-10" \/>/g' src/app/dashboard/clients/page.tsx
sed -i '' '/Trigger AI Upsell/d' src/app/dashboard/clients/page.tsx
sed -i '' '/<\/ShinyButton>/d' src/app/dashboard/clients/page.tsx

# Revert Settings
sed -i '' 's/import ShinyButton from "@\/components\/ui\/shiny-button";/import RadialGlowButton from "@\/components\/ui\/radial-glow-button";/g' src/app/dashboard/settings/page.tsx
sed -i '' 's/<ShinyButton/<RadialGlowButton/g' src/app/dashboard/settings/page.tsx
sed -i '' 's/<\/ShinyButton>/<\/RadialGlowButton>/g' src/app/dashboard/settings/page.tsx
