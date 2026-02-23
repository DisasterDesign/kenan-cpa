"use client";

import { useState, useRef, useEffect, useId } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionProps {
  question: string;
  answer: string;
  light?: boolean;
}

export default function Accordion({ question, answer, light = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [answer]);

  return (
    <div
      className={`border-b transition-colors ${
        light ? "border-white/20" : "border-white/10"
      }`}
    >
      <button
        id={buttonId}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between py-5 text-right gap-4 transition-colors ${
          light
            ? "text-primary hover:text-white"
            : "text-white hover:text-accent"
        }`}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="text-base md:text-lg font-medium leading-relaxed">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          } ${light ? "text-primary" : "text-accent"}`}
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        style={{
          maxHeight: isOpen ? `${height}px` : "0px",
          overflow: "hidden",
          transition: "max-height 0.4s ease",
        }}
      >
        <div
          ref={contentRef}
          className={`pb-5 text-sm md:text-base leading-relaxed ${
            light ? "text-primary/70" : "text-white/70"
          }`}
        >
          {answer}
        </div>
      </div>
    </div>
  );
}
