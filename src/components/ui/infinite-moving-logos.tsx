"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingLogos = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  items: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const getDirection = () => {
      if (containerRef.current) {
        if (direction === "left") {
          containerRef.current.style.setProperty(
            "--animation-direction",
            "forwards",
          );
        } else {
          containerRef.current.style.setProperty(
            "--animation-direction",
            "reverse",
          );
        }
      }
    };

    const getSpeed = () => {
      if (containerRef.current) {
        if (speed === "fast") {
          containerRef.current.style.setProperty("--animation-duration", "15s");
        } else if (speed === "normal") {
          containerRef.current.style.setProperty("--animation-duration", "30s");
        } else {
          containerRef.current.style.setProperty("--animation-duration", "60s");
        }
      }
    };

    function addAnimation() {
      if (containerRef.current && scrollerRef.current) {
        const scrollerContent = Array.from(scrollerRef.current.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          if (scrollerRef.current) {
            scrollerRef.current.appendChild(duplicatedItem);
          }
        });

        getDirection();
        getSpeed();
        setStart(true);
      }
    }

    addAnimation();
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-8 md:gap-12 lg:gap-16 py-8",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative flex items-center justify-center shrink-0 px-4"
            key={`${item.alt}-${idx}`}
            style={{
              minWidth: `${item.width || 120}px`,
              height: `${item.height || 60}px`
            }}
          >
            <img
              src={item.src}
              alt={item.alt}
              width={item.width || 120}
              height={item.height || 60}
              className="object-contain transition-all duration-300"
              style={{
                maxWidth: `${item.width || 120}px`,
                maxHeight: `${item.height || 60}px`
              }}
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
