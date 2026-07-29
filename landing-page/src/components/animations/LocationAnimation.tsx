'use client';

import { useEffect, useState } from 'react';

type DotVariant = 'filled' | 'active';

interface TimelineRowProps {
    variant: DotVariant;
    label: React.ReactNode;
    delay: number;
    mounted: boolean;
}

function TimelineRow({ variant, label, delay, mounted }: TimelineRowProps) {
    return (
        <div
            className="relative z-10 flex items-center gap-2 transition-all duration-600 ease-out"
            style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(10px)',
                transitionDelay: `${delay}ms`,
            }}
        >
            <span
                className={`relative flex-none w-[20px] h-[20px] rounded-full flex items-center justify-center ${variant === 'active'
                    ? 'bg-white border-[3px] border-[#2f6fed]'
                    : 'bg-[#2f6fed] shadow-[0_0_0_4px_rgba(47,111,237,0.12)]'
                    }`}
            >
                {variant === 'active' && (
                    <span className="absolute -inset-[3px] rounded-full bg-[#2f6fed]/35 animate-ping" />
                )}
            </span>
            <span className="font-sans text-sm font-medium leading-[1.3] text-[#1a2233]">
                {label}
            </span>
        </div>
    );
}

export default function SmartNavigationCard() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const t = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(t);
    }, []);

    return (
        <div className="flex justify-center sm:p-6 w-full">
            <div className="relative w-full max-w-[380px] aspect-[380/400] rounded-[28px] overflow-hidden bg-white shadow-[0_20px_45px_rgba(30,60,120,0.14),0_2px_8px_rgba(30,60,120,0.08)]">
                <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 460 460"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <line x1="-40" y1="120" x2="420" y2="-60" stroke="#E4E8F0" strokeWidth="2" />
                    <line x1="-20" y1="260" x2="440" y2="30" stroke="#E4E8F0" strokeWidth="2" />
                    <line x1="40" y1="480" x2="500" y2="140" stroke="#E4E8F0" strokeWidth="2" />
                    <line x1="60" y1="0" x2="260" y2="480" stroke="#EDF0F5" strokeWidth="2" />
                    <line x1="180" y1="-20" x2="400" y2="460" stroke="#EDF0F5" strokeWidth="2" />
                    <line x1="310" y1="-20" x2="500" y2="360" stroke="#EDF0F5" strokeWidth="2" />

                    <path
                        d="M172,470 C150,400 150,355 188,318 C222,284 196,258 226,236 L470,10"
                        fill="none"
                        stroke="#2f6fed"
                        strokeOpacity="0.16"
                        strokeWidth="20"
                        strokeLinecap="round"
                    />
                    <path
                        id="route"
                        d="M172,470 C150,400 150,355 188,318 C222,284 196,258 226,236 L470,10"
                        fill="none"
                        stroke="#2f6fed"
                        strokeWidth="9"
                        strokeLinecap="round"
                        pathLength={1000}
                        style={{
                            strokeDasharray: 1000,
                            strokeDashoffset: mounted ? 0 : 1000,
                            transition: 'stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                    />
                    <path
                        d="M172,470 C150,400 150,355 188,318 C222,284 196,258 226,236 L470,10"
                        fill="none"
                        stroke="#bcd4fb"
                        strokeWidth="4"
                        strokeLinecap="round"
                        pathLength={1000}
                        strokeDasharray="26 974"
                        className="animate-comet opacity-90"
                    />

                    <g
                        transform="translate(226,236) rotate(47)"
                        className={`[transform-box:fill-box] [transform-origin:center] ${mounted ? 'animate-arrow-in' : 'opacity-0'
                            }`}
                    >
                        <circle r="19" fill="#ffffff" />
                        <path d="M0,-11 L9,8 L0,3 L-9,8 Z" fill="#2f6fed" />
                    </g>
                </svg>

                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(110deg,#ffffff_30%,rgba(255,255,255,0.85)_45%,rgba(255,255,255,0.15)_65%)]" />

                <div className="relative z-10 h-full p-8 sm:p-10 flex flex-col justify-between">
                    <div
                        className="absolute left-[42px] sm:left-[50px] -translate-x-1/2 top-[42px] sm:top-[50px] bottom-[42px] sm:bottom-[50px] w-0 border-l-2 border-dashed border-[#b7cdf9] origin-top transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] delay-75"
                        style={{ transform: mounted ? 'scaleY(1)' : 'scaleY(0)' }}
                    />
                    <TimelineRow variant="filled" label="Vipprow Academy" delay={80} mounted={mounted} />
                    <TimelineRow
                        variant="active"
                        label={
                            <>
                                Bethel House,
                                <br />
                                Napier Town
                            </>
                        }
                        delay={220}
                        mounted={mounted}
                    />
                    <TimelineRow variant="filled" label="Near Naveen Vidhya Mandir, Jabalpur" delay={360} mounted={mounted} />
                </div>
            </div>

            <style>{`
                @keyframes routeFlow {
                    to { stroke-dashoffset: -1000; }
                }
                @keyframes arrowIn {
                    from { opacity: 0; transform: translate(226px, 236px) rotate(47deg) scale(0.4); }
                    to { opacity: 1; transform: translate(226px, 236px) rotate(47deg) scale(1); }
                }
                @keyframes arrowFloat {
                    0%, 100% { transform: translate(226px, 236px) rotate(47deg) scale(1) translateY(0); }
                    50% { transform: translate(226px, 236px) rotate(47deg) scale(1) translateY(-5px); }
                }
                .animate-comet {
                    animation: routeFlow 2.6s linear infinite;
                }
                .animate-arrow-in {
                    animation: arrowIn 0.5s ease 1.1s forwards, arrowFloat 2.2s ease-in-out 1.7s infinite;
                }
            `}</style>
        </div>
    );
}