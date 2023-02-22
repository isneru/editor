import {
  DashboardIcon,
  EnterIcon,
  ExitIcon,
  GearIcon
} from "@radix-ui/react-icons"
import clsx from "clsx"
import { TooltipPopover } from "components"
import { User } from "next-auth"
import { signIn, signOut } from "next-auth/react"
import { ReactNode } from "react"

interface SidebarProps {
  isOpen: boolean
  user?: User
  children: ReactNode
}

export const Sidebar = ({ isOpen, user, children }: SidebarProps) => {
  return (
    <aside
      className={clsx("flex h-full transition-all", {
        "bg-background-800 shadow-[1px_0px_0px_0px] shadow-white/10": isOpen,
        "bg-transparent": !isOpen
      })}>
      <div className="flex h-full w-full min-w-[2.75rem] max-w-[2.75rem] flex-col items-center py-3 shadow-[1px_0px_0px_0px] shadow-white/10 transition-all">
        <div className="flex flex-col items-center justify-center">
          <TooltipPopover side="right" label="Dashboard">
            <button
              type="button"
              className="flex items-center justify-center rounded p-1 transition-all hover:bg-white/10">
              <DashboardIcon width={16} height={16} />
            </button>
          </TooltipPopover>
        </div>
        <div className="mt-auto flex flex-col items-center justify-center gap-2">
          <TooltipPopover side="right" label={user ? "Logout" : "Login"}>
            <button
              type="button"
              onClick={user ? () => signOut() : () => signIn("google")}
              className="flex items-center justify-center rounded p-1 transition-all hover:bg-white/10">
              {user ? (
                <ExitIcon width={16} height={16} />
              ) : (
                <EnterIcon width={16} height={16} />
              )}
            </button>
          </TooltipPopover>
          <TooltipPopover side="right" label="Settings">
            <button
              type="button"
              className="flex items-center justify-center rounded p-1 transition-all hover:bg-white/10">
              <GearIcon width={16} height={16} />
            </button>
          </TooltipPopover>
        </div>
      </div>
      {children}
    </aside>
  )
}
