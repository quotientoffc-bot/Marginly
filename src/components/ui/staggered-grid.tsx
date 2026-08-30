'use client'
import React, { useEffect, useRef, useState, useId } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import imagesLoaded from 'imagesloaded'
import { cn } from '@/lib/utils'
import { FaGithub, FaSlack, FaTwitter } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export interface BentoItem {
    id: number | string
    title: string
    subtitle: string
    description: string
    icon: React.ReactNode
    content?: React.ReactNode
    image?: string
}

export interface StaggeredGridProps {
    images: string[]
    bentoItems: BentoItem[]
    integrations?: any[] // Added this custom prop
    centerText?: string
    credits?: {
        madeBy: { text: string; href: string }
        moreDemos: { text: string; href: string }
    }
    className?: string
    showFooter?: boolean
    scroller?: string | Element | Window | null
}

export function StaggeredGrid({
    images,
    bentoItems,
    integrations = [],
    centerText = "Halcyon",
    credits = {
        madeBy: { text: "@codrops", href: "https://x.com/codrops" },
        moreDemos: { text: "More demos", href: "https://tympanus.net/codrops/demos" }
    },
    className,
    showFooter = true,
    scroller
}: StaggeredGridProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const gridFullRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    // Bento Grid State
    const [activeBento, setActiveBento] = useState<number>(0);
    
    // Connection Modal State
    const [selectedIntegration, setSelectedIntegration] = useState<any>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [connectedList, setConnectedList] = useState<string[]>(
      integrations.filter(i => i.connected).map(i => i.id)
    );

    const splitText = (text: string) => {
        return text.split('').map((char, i) => (
            <span key={i} className="char inline-block" style={{ willChange: 'transform' }}>{char === ' ' ? '\u00A0' : char}</span>
        ))
    }

    useEffect(() => {
        const handleLoad = () => {
            document.body.classList.remove('loading')
            setIsLoaded(true)
        }

        // Wait for background images to load
        // Note: we target both regular images and bento images if possible
        const imgLoad = imagesLoaded(document.querySelectorAll('.grid__item-img'), { background: true }, handleLoad)

        return () => {
            // Cleanup
        }
    }, [])

    useGSAP(() => {
        if (!isLoaded) return

        // Animate Text Element
        if (textRef.current) {
            const chars = textRef.current.querySelectorAll('.char')
            gsap.timeline({
                scrollTrigger: {
                    trigger: textRef.current,
                    scroller: scroller || undefined,
                    start: 'top bottom',
                    end: 'center center-=25%',
                    scrub: 1,
                }
            })
                .from(chars, {
                    ease: 'sine.out',
                    yPercent: 300,
                    autoAlpha: 0,
                    stagger: {
                        each: 0.05,
                        from: 'center'
                    }
                })
        }

        // Animate Full Grid
        if (gridFullRef.current) {
            const gridFullItems = gridFullRef.current.querySelectorAll('.grid__item')
            const numColumns = getComputedStyle(gridFullRef.current).getPropertyValue('grid-template-columns').split(' ').length
            const middleColumnIndex = Math.floor(numColumns / 2)

            const columns: Element[][] = Array.from({ length: numColumns }, () => [])
            gridFullItems.forEach((item: any) => {
                const colAttr = item.getAttribute('data-col');
                // Use data-col if available, fallback to a safe index calculation
                const columnIndex = colAttr !== null ? parseInt(colAttr, 10) : 0;
                if (columns[columnIndex]) {
                    columns[columnIndex].push(item)
                }
            })

            columns.forEach((columnItems, columnIndex) => {
                const delayFactor = Math.abs(columnIndex - middleColumnIndex) * 0.2

                const tlGrid = gsap.timeline({
                    scrollTrigger: {
                        trigger: gridFullRef.current,
                        scroller: scroller || undefined,
                        start: 'top bottom',
                        end: 'center center',
                        scrub: 1.5,
                    }
                });
                
                tlGrid.from(columnItems, {
                    yPercent: 450,
                    autoAlpha: 0,
                    delay: delayFactor,
                    ease: 'sine.out',
                });

                const imgTargets = columnItems.map(item => item.querySelector('.grid__item-img')).filter(Boolean);
                if (imgTargets.length > 0) {
                    tlGrid.from(imgTargets, {
                        transformOrigin: '50% 0%',
                        ease: 'sine.out',
                    }, 0);
                }
            })

            // Specific animation for Bento Container
            const bentoContainer = gridFullRef.current.querySelector('.bento-container')

            if (bentoContainer) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: gridFullRef.current,
                        scroller: scroller || undefined,
                        start: 'top top+=15%',
                        end: 'bottom center',
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                })

                // Animate Bento Container to move down and scale
                tl.to(bentoContainer, {
                    y: window.innerHeight * 0.1, // Move down relative to grid
                    scale: 1.5, // Scale up the whole group
                    zIndex: 1000,
                    ease: 'power2.out', // Smooth easing
                    duration: 1,
                    force3D: true // Force hardware acceleration
                }, 0)
            }
        }
    }, { dependencies: [isLoaded], scope: gridFullRef })

    // Prepare grid items: fill up to the end of Row 3 (21 slots)
    // Filter out the bento items from the background tiles so they don't repeat!
    const bentoIds = bentoItems.map(b => b.id);
    const nonBentoImages = images.filter(id => !bentoIds.includes(id));
    
    const mixedGridItems: (string | 'BENTO_GROUP')[] = Array.from({ length: 21 }, (_, i) => nonBentoImages[i % nonBentoImages.length]);

    // Replace the slot where we want the bento group
    // Position at index 16 = Row 3 (middle row), spanning columns 3-5 (center)
    mixedGridItems[16] = 'BENTO_GROUP';

    return (
        <div
            className={cn("shadow relative w-full", className)}
            style={{
                '--grid-item-translate': '0px',
            } as React.CSSProperties}
        >
            <section className="grid place-items-center w-full relative mt-8 z-0">
                <div ref={textRef} className="text font-alt uppercase flex content-center text-[clamp(3rem,14vw,8rem)] leading-[0.7] text-white">
                    {splitText(centerText)}
                </div>
            </section>

            <section className="grid place-items-center w-full relative mt-8 z-10">
                <div ref={gridFullRef} className="grid--full relative w-full h-auto p-4 grid gap-4 grid-cols-7 auto-rows-[250px] max-w-[1400px]">
                    <div className="grid-overlay absolute inset-0 z-[15] pointer-events-none opacity-0 bg-white/80 dark:bg-black/80 rounded-lg transition-opacity duration-500" />
                    {mixedGridItems.map((item, i) => {
                        if (item === 'BENTO_GROUP') {
                            // Render the HoverExpand Group using passed bentoItems
                            if (!bentoItems || bentoItems.length === 0) return null;

                            return (
                                <div key="bento-group" data-col={2} className="grid__item bento-container col-span-3 row-span-1 relative z-20 flex items-center justify-center gap-2 h-full w-full will-change-transform">
                                    {bentoItems.map((bentoItem, index) => {
                                        const isActive = activeBento === index;
                                        const integration = integrations.find(i => i.id === bentoItem.id);
                                        return (
                                            <div
                                                key={bentoItem.id}
                                                className={cn(
                                                    "relative cursor-pointer overflow-hidden rounded-2xl h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border",
                                                    isActive
                                                        ? "bg-white/10 shadow-2xl border-white/20"
                                                        : "bg-white/[0.02] border-white/5 hover:bg-white/5"
                                                )}
                                                style={{ width: isActive ? "60%" : "20%" }}
                                                onMouseEnter={() => setActiveBento(index)}
                                                onClick={() => {
                                                    setActiveBento(index);
                                                }}
                                            >
                                                {/* Content Container */}
                                                <div className="relative z-10 w-full h-full flex flex-col p-0">
                                                    {/* Active State Content */}
                                                    <div className={cn(
                                                        "absolute inset-0 flex flex-col transition-all duration-500 ease-in-out p-5",
                                                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                                    )}>
                                                        <div className="flex-1 flex flex-col relative z-10 justify-center">
                                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                                                              {bentoItem.icon}
                                                            </div>
                                                            <h3 className="text-lg font-bold text-white drop-shadow-md leading-tight tracking-tight mb-1">{bentoItem.title}</h3>
                                                            <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-2">{bentoItem.subtitle}</p>
                                                            <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">{bentoItem.description}</p>
                                                        </div>

                                                        {/* Action Button Row */}
                                                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10 z-20">
                                                            <button 
                                                              onClick={(e) => {
                                                                e.stopPropagation();
                                                                if (!connectedList.includes(integration?.id)) {
                                                                  setSelectedIntegration(integration);
                                                                }
                                                              }}
                                                              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${connectedList.includes(integration?.id) ? 'bg-green-500/20 text-green-400 border-green-500/30 cursor-default' : 'bg-white/10 hover:bg-white/20 text-white border-white/20'}`}
                                                            >
                                                              {connectedList.includes(integration?.id) ? "Configured" : "Connect Now"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Inactive State - Icon + Title - Centered */}
                                                <div className={cn(
                                                    "absolute inset-0 flex flex-col items-center justify-center gap-3 transition-all duration-500",
                                                    isActive ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"
                                                )}>
                                                    <div className="text-white/40 group-hover:text-white transition-colors">
                                                        {bentoItem.icon}
                                                    </div>
                                                    <span className="text-[10px] font-medium text-white/40 group-hover:text-white/70 transition-colors uppercase tracking-wider text-center px-2 leading-tight">{bentoItem.title}</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        }

                        // Skip rendering for the slots that the group takes up
                        // Group starts at 16, takes 17, 18.
                        if (i === 17 || i === 18) return null;

                        if (typeof item === 'string') {
                            const integration = integrations[i % integrations.length];
                            const label = integration?.name || "Integration";

                            return (
                                <figure 
                                  key={`img-${i}`} 
                                  data-col={i % 7} 
                                  className="grid__item m-0 relative z-10 [perspective:800px] will-change-[transform,opacity] group cursor-pointer"
                                  onClick={() => {
                                    if (!connectedList.includes(integration?.id)) {
                                      setSelectedIntegration(integration);
                                    }
                                  }}
                                >
                                    <div className="grid__item-img w-full h-full [backface-visibility:hidden] will-change-transform rounded-xl overflow-hidden shadow-sm border border-white/5 bg-white/[0.02] flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-xl group-hover:border-white/20 group-hover:bg-white/10">

                                        {/* Gradient Overlay for Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                                        {/* Content Container */}
                                        <div className="relative z-10 flex flex-col items-center justify-center gap-3">
                                            {/* Icon */}
                                            <div className="transition-all duration-300 group-hover:scale-110">
                                              {integration?.icon}
                                            </div>

                                            {/* Text Reveal */}
                                            <div className="text-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                                <span className={`block text-[10px] font-bold uppercase tracking-wider mb-0.5 ${connectedList.includes(integration?.id) ? 'text-green-400' : 'text-white/90'}`}>{connectedList.includes(integration?.id) ? "Configured" : "Connect"}</span>
                                                <span className="block text-sm font-bold text-white tracking-tight">{label}</span>
                                            </div>
                                        </div>
                                    </div>
                                </figure>
                            )
                        }
                        return null;
                    })}
                </div>
            </section >

            {showFooter && (
                <footer className="frame__footer w-full p-8 flex justify-between items-center relative z-50 text-neutral-900 dark:text-white uppercase font-medium text-xs tracking-wider">
                    <a href={credits.madeBy.href} className="hover:opacity-60 transition-opacity">{credits.madeBy.text}</a>
                    <a href={credits.moreDemos.href} className="hover:opacity-60 transition-opacity">{credits.moreDemos.text}</a>
                </footer>
            )}

            {/* Connection Modal Overlay */}
            {selectedIntegration && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div 
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                  onClick={() => !isConnecting && setSelectedIntegration(null)}
                />
                
                <div 
                  className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden flex flex-col transform transition-all"
                >
                   {/* Modal Header */}
                   <div className={`p-8 ${selectedIntegration.bg} border-b border-white/5 flex flex-col items-center justify-center text-center relative`}>
                     <div className="absolute top-4 right-4">
                       <button onClick={() => !isConnecting && setSelectedIntegration(null)} className="p-2 bg-black/20 hover:bg-black/40 rounded-full text-white/50 hover:text-white transition-colors">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                       </button>
                     </div>
                     <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 shadow-xl">
                        {selectedIntegration.icon}
                     </div>
                     <h3 className="text-2xl font-bold text-white tracking-tight">{selectedIntegration.name}</h3>
                     <p className="text-sm font-medium text-white/50 uppercase tracking-widest mt-1">{selectedIntegration.category}</p>
                   </div>

                   {/* Modal Body */}
                   <div className="p-8 flex flex-col gap-6 relative">
                      <p className="text-white/70 text-sm text-center leading-relaxed">
                        {selectedIntegration.description}
                      </p>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1">Authentication</label>
                        <input 
                          type="password" 
                          placeholder={selectedIntegration.id === 'ai' ? 'sk-ant-api03-...' : 'OAuth Token (Auto-filled)'}
                          className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-all"
                        />
                      </div>

                      <button 
                        disabled={isConnecting}
                        onClick={() => {
                          setIsConnecting(true);
                          setTimeout(() => {
                            setConnectedList(prev => [...prev, selectedIntegration.id]);
                            setIsConnecting(false);
                            setSelectedIntegration(null);
                          }, 1500);
                        }}
                        className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                          isConnecting 
                            ? 'bg-white/10 text-white/50 border border-white/10 cursor-not-allowed' 
                            : 'bg-white text-black hover:bg-white/90 border border-white'
                        }`}
                      >
                        {isConnecting ? (
                          <>
                            <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                            Connecting...
                          </>
                        ) : (
                          "Authorize Connection"
                        )}
                      </button>
                   </div>
                </div>
              </div>
            )}
        </div >
    )
}

export default StaggeredGrid
