"use client"

import { useEffect } from "react"

export function useAOS() {
  useEffect(() => {
    // Add AOS CSS
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://unpkg.com/aos@2.3.4/dist/aos.css"
    document.head.appendChild(link)

    // Add AOS Script
    const script = document.createElement("script")
    script.src = "https://unpkg.com/aos@2.3.4/dist/aos.js"
    script.async = true
    script.onload = () => {
      // Initialize AOS once the script is loaded
      // @ts-ignore - AOS is loaded globally
      if (window.AOS) {
        // @ts-ignore - AOS is loaded globally
        window.AOS.init({
          duration: 800,
          once: true,
        })
      }
    }
    document.body.appendChild(script)

    // Cleanup
    return () => {
      document.head.removeChild(link)
      if (script.parentNode) {
        document.body.removeChild(script)
      }
    }
  }, [])
}
