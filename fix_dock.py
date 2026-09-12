import re

with open('src/components/ui/glass-dock.tsx', 'r') as f:
    content = f.read()

# 1. Update the parent pill motion.div to have overflow-hidden and w-auto
old_pill = """                                <motion.div
                                    layout
                                    className={cn(
                                        'px-5 py-2 rounded-lg',
                                        'bg-black text-white dark:bg-white dark:text-black',
                                        'shadow-md flex items-center justify-center',
                                        'border border-neutral-700 dark:border-neutral-300',
                                        'w-max min-w-[100px] '
                                    )}
                                >
                                    <div className="relative h-6 flex items-center justify-center overflow-hidden w-full">"""

new_pill = """                                <motion.div
                                    layout
                                    className={cn(
                                        'px-5 py-2 rounded-lg',
                                        'bg-black text-white dark:bg-white dark:text-black',
                                        'shadow-md flex items-center justify-center',
                                        'border border-neutral-700 dark:border-neutral-300',
                                        'w-max min-w-[100px] overflow-hidden'
                                    )}
                                >
                                    <div className="relative h-6 flex items-center justify-center w-max">"""

content = content.replace(old_pill, new_pill)

# 2. Change AnimatePresence mode to 'wait' instead of 'popLayout' to completely avoid layout snapping on exit
# If we use wait, it finishes exiting before the new one enters, but it might be slower.
# If we keep popLayout, we need to ensure the width stretches to accommodate BOTH or just let layout animations handle it.
# Actually, the user's screenshot shows the text is statically cropped (it's not mid-animation).
# If it's statically cropped, the issue is that w-max isn't working because of the w-0 parent container constraint in CSS!

with open('src/components/ui/glass-dock.tsx', 'w') as f:
    f.write(content)
