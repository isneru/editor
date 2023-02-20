import { DashboardIcon, GearIcon } from "@radix-ui/react-icons"
import clsx from "clsx"
import { SidebarExplorer } from "components/SidebarExplorer"

interface SidebarProps {
  isOpen: boolean
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <aside
      className={clsx("flex h-full w-full max-w-[21.5rem] transition-all", {
        "bg-transparent": !isOpen,
        "bg-background-800 shadow-[1px_0px_0px_0px] shadow-white/10": isOpen
      })}>
      <div className="z-10 flex h-full w-full max-w-[2.75rem] flex-col items-center justify-center py-3 shadow-[1px_0px_0px_0px] shadow-white/10">
        <div className="flex flex-col items-center justify-center">
          <button
            type="button"
            className="flex items-center justify-center rounded p-1 transition-all hover:bg-white/10">
            <DashboardIcon width={16} height={16} />
          </button>
        </div>
        <div className="mt-auto flex flex-col items-center justify-center">
          <button
            type="button"
            className="flex items-center justify-center rounded p-1 transition-all hover:bg-white/10">
            <GearIcon width={16} height={16} />
          </button>
        </div>
      </div>
      <SidebarExplorer isOpen={isOpen} />
    </aside>
  )
}
