"use client";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import Button from "@/components/Button";
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
    <section className="lg:h-screen h-[50vh] w-full flex flex-col justify-center lg:justify-end p-6">
      <div className="leading-0">
        <div className="overflow-hidden h-fit w-fit">
          <h1
            ref={head1}
            className="text-[clamp(2rem,12vw,12rem)] font-extrabold leading-none"
          >
            ZANE
          </h1>
        </div>
        <div className="overflow-hidden h-fit w-fit">
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
        <Button text={'Shop now'} />
      </div>
    </section>
  );
};

export default page;
