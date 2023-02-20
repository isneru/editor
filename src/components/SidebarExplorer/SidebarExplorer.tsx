import clsx from "clsx"

interface SidebarExplorerProps {
  isOpen: boolean
}

export const SidebarExplorer = ({ isOpen }: SidebarExplorerProps) => {
  return (
    <div
      className={clsx("py-3 transition-all", {
        "w-0 bg-transparent": !isOpen,
        "w-full bg-background-800": isOpen
      })}></div>
  )
}
