"use client";

import { useRef, useEffect } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  as?: "button" | "a";
}

export default function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  as = "button",
  ...props
}: MagneticButtonProps & React.HTMLAttributes<HTMLElement> & { target?: string; rel?: string }) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as unknown as React.MouseEvent;
      const rect = button.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left - rect.width / 2;
      const y = mouseEvent.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    };

    const handleMouseLeave = () => {
      button.style.transform = "translate(0, 0)";
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const Component = as === "a" ? "a" : "button";

  return (
    <Component
      ref={buttonRef as React.RefObject<HTMLButtonElement & HTMLAnchorElement>}
      href={href}
      onClick={onClick}
      className={`hover-trigger ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
