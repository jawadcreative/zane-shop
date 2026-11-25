"use client";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import React, { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
gsap.registerPlugin(SplitText);

const page = () => {
  const head1 = useRef(null);
  const head2 = useRef(null);
  useGSAP(() => {
    const title1 = head1.current;
    const title2 = head2.current;

    const title1Split = SplitText.create(title1, { type: "chars" });
    const title2Split = SplitText.create(title2, { type: "chars" });

    gsap.from([title1Split.chars, title2Split.chars], {
      yPercent: 100,
      stagger: 0.05,
    });
  });
  return (
    <section className="h-screen w-full flex flex-col justify-end p-12">
      <div className="leading-0">
        <div className="overflow-hidden">
          <h1
            ref={head1}
            className="text-[clamp(2rem,12vw,12rem)] font-extrabold leading-none"
          >
            ZANE
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1
            ref={head2}
            className="text-[clamp(2rem,12vw,12rem)] font-extrabold leading-none"
          >
            GOODS SHOP.
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-3 items-start">
        <h2 className="text-2xl">Follow your dreams.</h2>
        <Link
          href="/products"
          className="relative inline-block px-12 py-2 bg-foreground text-background cursor-pointer
          before:absolute before:inset-0 before:bg-background before:transition-transform before:duration-300 before:scale-x-0 before:origin-left hover:before:scale-x-100 hover:text-foreground before:z-10 border border-foreground"
        >
          <span className="relative z-10">Shop now</span>
        </Link>
      </div>
    </section>
  );
};

export default page;
