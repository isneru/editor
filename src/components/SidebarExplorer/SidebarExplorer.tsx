import clsx from "clsx"
import { User } from "next-auth"

interface SidebarExplorerProps {
  isOpen: boolean
  user?: User
}

export const SidebarExplorer = ({ isOpen, user }: SidebarExplorerProps) => {
  return (
    <div
      className={clsx("py-3 transition-all", {
        "w-0 bg-transparent": !isOpen,
        "flex w-full flex-col bg-background-800 px-4": isOpen
      })}>
      {isOpen && <strong>{user?.name}</strong>}
    </div>
  )
}
