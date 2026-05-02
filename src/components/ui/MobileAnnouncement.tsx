"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Monitor } from "lucide-react"

const DURATION = 4500

export default function MobileAnnouncement() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    if (window.innerWidth >= 1024) return
    if (sessionStorage.getItem("pc-hint-shown")) return

    sessionStorage.setItem("pc-hint-shown", "1")
    setVisible(true)

    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      setProgress(Math.max(0, 1 - elapsed / DURATION))
      if (elapsed < DURATION) requestAnimationFrame(tick)
    }
    const rafId = requestAnimationFrame(tick)

    const t = setTimeout(() => setVisible(false), DURATION)
    return () => {
      clearTimeout(t)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.95 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-4 z-[300] pointer-events-none"
        >
          <div
            className="relative flex items-center gap-3 px-4 py-3 rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgb(255 255 255 / 0.92) 0%, rgb(255 255 255 / 0.82) 100%)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgb(255 255 255 / 0.6)",
              boxShadow:
                "0 8px 32px rgb(0 0 0 / 0.1), inset 0 1px 0 rgb(255 255 255 / 0.8), inset 0 -1px 0 rgb(0 0 0 / 0.04)",
            }}
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-primary/5 border border-black/5 shrink-0">
              <Monitor size={14} className="text-primary" strokeWidth={1.5} />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[9px] uppercase tracking-widest text-secondary leading-none">
                tip
              </span>
              <span className="font-thai text-xs text-primary leading-snug whitespace-nowrap">
                เว็บนี้ดูดีกว่าบน PC นะ
              </span>
            </div>

            {/* Progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-primary/15 origin-left"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
