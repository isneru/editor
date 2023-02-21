import clsx from "clsx"
import { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

export const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        "flex items-center justify-center gap-2 rounded bg-background-500 px-2 py-1 shadow-[0px_0px_0px_1px] shadow-white/10 hover:bg-background-200",
        className ?? ""
      )}
      {...props}>
      {children}
    </button>
  )
}
