import { AnimatePresence, motion } from "framer-motion"
import { createContext, ReactNode, useState } from "react"

interface ToastContextData {
  addToast: (message: string) => void
  removeToast: () => void
}

export const ToastContext = createContext({} as ToastContextData)

interface ToastProviderProps {
  children: ReactNode
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  function addToast(message: string) {
    if (isToastVisible) return
    setToast({ message })
    setIsToastVisible(true)
  }
  function removeToast() {
    setIsToastVisible(false)
  }

  const [toast, setToast] = useState({ message: "" })
  const [isToastVisible, setIsToastVisible] = useState(false)
  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <AnimatePresence>
        {isToastVisible && (
          <motion.div
            initial={{
              bottom: -200,
              opacity: 0
            }}
            animate={{
              bottom: 20,
              opacity: 1
            }}
            exit={{
              bottom: -200,
              opacity: 0
            }}
            transition={{
              duration: 0.5,
              type: "tween"
            }}
            className="fixed right-5 flex items-center justify-center gap-2 rounded px-2 py-1">
            <SpinSVG />
            <span className="animate-pulse">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  )
}

const SpinSVG = () => (
  <svg
    width={20}
    height={20}
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <style
      dangerouslySetInnerHTML={{
        __html:
          ".spinner_V8m1{transform-origin:center;animation:spinner_zKoa 2s linear infinite}.spinner_V8m1 circle{stroke-linecap:round;animation:spinner_YpZS 1.5s ease-in-out infinite}@keyframes spinner_zKoa{100%{transform:rotate(360deg)}}@keyframes spinner_YpZS{0%{stroke-dasharray:0 150;stroke-dashoffset:0}47.5%{stroke-dasharray:42 150;stroke-dashoffset:-16}95%,100%{stroke-dasharray:42 150;stroke-dashoffset:-59}}"
      }}
    />
    <g className="spinner_V8m1">
      <circle cx={12} cy={12} r="9.5" fill="none" strokeWidth={2} />
    </g>
  </svg>
)
