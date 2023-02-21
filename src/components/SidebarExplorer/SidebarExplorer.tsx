import clsx from "clsx"
import { User } from "next-auth"

interface SidebarExplorerProps {
  isOpen: boolean
  user?: User
}

export const SidebarExplorer = ({ isOpen, user }: SidebarExplorerProps) => {
  return (
    <div
      className={clsx("overflow-hidden whitespace-nowrap py-3 transition-all", {
        "w-[18.75rem]": isOpen,
        "w-0": !isOpen
      })}>
      <div className="px-3">
        <span>{user?.name}</span>
      </div>
    </div>
  )
}
