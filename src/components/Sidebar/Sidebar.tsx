import { DashboardIcon, GearIcon } from "@radix-ui/react-icons"
import clsx from "clsx"
import { SidebarExplorer, TooltipPopover } from "components"
import { User } from "next-auth"

interface SidebarProps {
  isOpen: boolean
  user?: User
}

export const Sidebar = ({ isOpen, user }: SidebarProps) => {
  return (
    <aside
      className={clsx("flex h-full w-full transition-all", {
        "max-w-[2.75rem] bg-transparent": !isOpen,
        "max-w-[21.5rem] bg-background-800 shadow-[1px_0px_0px_0px] shadow-white/10":
          isOpen
      })}>
      <div className="z-10 flex h-full w-full max-w-[2.75rem] flex-col items-center justify-center py-3 shadow-[1px_0px_0px_0px] shadow-white/10">
        <div className="flex flex-col items-center justify-center">
          <TooltipPopover side="right" label="Dashboard">
            <button
              type="button"
              className="flex items-center justify-center rounded p-1 transition-all hover:bg-white/10">
              <DashboardIcon width={16} height={16} />
            </button>
          </TooltipPopover>
        </div>
        <div className="mt-auto flex flex-col items-center justify-center">
          <TooltipPopover side="right" label="Settings">
            <button
              type="button"
              className="flex items-center justify-center rounded p-1 transition-all hover:bg-white/10">
              <GearIcon width={16} height={16} />
            </button>
          </TooltipPopover>
        </div>
      </div>
      <SidebarExplorer user={user} isOpen={isOpen} />
    </aside>
  )
}
