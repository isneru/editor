import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from "@radix-ui/react-icons"

interface TopbarProps {
  toggleSidebar: () => void
  isSidebarOpen: boolean
}

export const Topbar = ({ toggleSidebar, isSidebarOpen }: TopbarProps) => {
  return (
    <section className="flex h-10 w-full items-center bg-background-700 px-3">
      <button
        type="button"
        onClick={toggleSidebar}
        className="flex items-center justify-center rounded p-1 transition-all hover:bg-white/5">
        {isSidebarOpen ? (
          <DoubleArrowLeftIcon width={16} height={16} />
        ) : (
          <DoubleArrowRightIcon width={16} height={16} />
        )}
      </button>
    </section>
  )
}
