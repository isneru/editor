import {
  Cross2Icon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from "@radix-ui/react-icons"
import clsx from "clsx"
import { TooltipPopover } from "components/TooltipPopover"
import { useContext } from "react"
import { NotesContext } from "utils/providers"

interface TopbarProps {
  toggleSidebar: () => void
  isSidebarOpen: boolean
}

export const Topbar = ({ toggleSidebar, isSidebarOpen }: TopbarProps) => {
  const {
    selectedNote,
    setSelectedNote,
    openedNotes,
    removeNoteFromLS,
    userNotes
  } = useContext(NotesContext)

  return (
    <nav className="flex h-10 w-full items-center bg-background-700 px-3">
      <TooltipPopover
        side="right"
        label={isSidebarOpen ? "Collapse" : "Expand"}>
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
      </TooltipPopover>
      <div
        className={clsx("flex gap-1 self-end transition-all", {
          "ml-4": !isSidebarOpen,
          "ml-80": isSidebarOpen
        })}>
        {userNotes &&
          openedNotes?.map((note, idx) => (
            <button
              key={idx}
              onClick={e => setSelectedNote(note)}
              type="button"
              className={clsx("flex items-center gap-2 px-2 leading-7", {
                "tabNote rounded-t-md pb-1": selectedNote?.id === note.id,
                "mb-1 rounded-md hover:bg-white/10":
                  selectedNote?.id !== note.id
              })}>
              {userNotes.find(userNote => userNote.id === note.id)?.name ||
                "Untitled"}
              <span
                role="button"
                onClick={e => {
                  e.stopPropagation()
                  removeNoteFromLS(note)
                }}
                className="flex items-center justify-center rounded p-0.5 hover:bg-white/5">
                <Cross2Icon width={10} height={10} />
              </span>
            </button>
          ))}
      </div>
    </nav>
  )
}
