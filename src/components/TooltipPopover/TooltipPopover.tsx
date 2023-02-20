import * as Tooltip from "@radix-ui/react-tooltip"
import clsx from "clsx"
import { ReactNode, useState } from "react"

interface TooltipPopoverProps {
  label: string
  children: ReactNode
  side?: "top" | "right" | "bottom" | "left"
}

export const TooltipPopover = ({
  children,
  label,
  side
}: TooltipPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Tooltip.Provider delayDuration={0} skipDelayDuration={0}>
      <Tooltip.Root onOpenChange={setIsOpen}>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Content
          side={side}
          sideOffset={4}
          style={{
            transition:
              "transform 75ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)"
          }}
          className={clsx(
            "z-50 mx-1 flex items-center justify-center rounded bg-black/80 px-2 py-1 text-xs font-medium",
            { "scale-0 opacity-0": !isOpen, "opacity-1 scale-100": isOpen }
          )}>
          {label}
          <Tooltip.Arrow width={11} height={5} className="fill-black/90" />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
