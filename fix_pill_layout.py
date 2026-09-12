import re

with open('src/components/ui/glass-dock.tsx', 'r') as f:
    content = f.read()

# Change the pill div to motion.div layout
old_pill = """                                <div
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
                                        'w-max min-w-[100px] '
                                    )}
                                >
                                    <div className="relative h-6 flex items-center justify-center overflow-hidden w-full">"""

content = content.replace(old_pill, new_pill)

# Close the motion.div
content = content.replace("</div>\n                            </motion.div>", "</motion.div>\n                            </motion.div>")

with open('src/components/ui/glass-dock.tsx', 'w') as f:
    f.write(content)
