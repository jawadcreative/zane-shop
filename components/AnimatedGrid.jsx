"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function AnimatedGrid({ children, className }) {
    const container = useRef(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".product-card",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out",
                    stagger: 0.1,
                    clearProps: "all",
                }
            );
        },
        { scope: container }
    );

    return (
        <div ref={container} className={className}>
            {children}
        </div>
    );
}