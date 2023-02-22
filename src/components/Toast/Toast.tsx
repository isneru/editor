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
            {toast.message}
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
    <g className="spinner origin-center">
      <circle cx={12} cy={12} r="9.5" fill="none" strokeWidth={2} />
    </g>
  </svg>
)
