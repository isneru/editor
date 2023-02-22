import { type Note } from "@prisma/client"
import { ArchiveIcon, Pencil2Icon } from "@radix-ui/react-icons"
import clsx from "clsx"
import { TooltipPopover } from "components"
import { User } from "next-auth"
import { Dispatch, SetStateAction } from "react"
import { api } from "utils/api"

interface SidebarExplorerProps {
  isOpen: boolean
  user?: User
  setSelectedNote: Dispatch<SetStateAction<Note | undefined>>
  selectedNote: Note | undefined
  notes: Note[]
  refetchUserNotes: () => Promise<void>
  setNotes: Dispatch<SetStateAction<Note[]>>
}

export const SidebarExplorer = ({
  isOpen,
  user,
  setSelectedNote,
  selectedNote,
  notes,
  refetchUserNotes,
  setNotes
}: SidebarExplorerProps) => {
  const noteCreate = api.note.create.useMutation()

  async function handleCreateNote() {
    if (!user) return
    const createdNote = await noteCreate.mutateAsync({
      userId: user.id
    })
    await refetchUserNotes()
    setNotes(prevNotes => [...prevNotes, ...notes])
    setSelectedNote(createdNote)
  }

  return (
    <div
      className={clsx(
        "overflow-hidden whitespace-nowrap py-3 text-sm transition-all",
        {
          "w-[18.75rem]": isOpen,
          "w-0": !isOpen
        }
      )}>
      <div className="px-3">
        <nav className="mb-2 flex items-center justify-center gap-2">
          <TooltipPopover side="bottom" label="New Note">
            <button
              onClick={handleCreateNote}
              type="button"
              className="flex items-center justify-center rounded p-1 transition-all hover:bg-white/10">
              <Pencil2Icon width={16} height={16} />
            </button>
          </TooltipPopover>
          <TooltipPopover side="bottom" label="New Folder">
            <button
              type="button"
              className="flex items-center justify-center rounded p-1 transition-all hover:bg-white/10">
              <ArchiveIcon width={16} height={16} />
            </button>
          </TooltipPopover>
        </nav>
        <span>{user?.name}</span>
        {notes && (
          <div className="mt-2 flex flex-col justify-center gap-0.5">
            {notes.map(note => (
              <button
                onClick={() => setSelectedNote(note)}
                className={clsx(
                  "flex items-center rounded px-2 py-[3px] hover:bg-background-500",
                  {
                    "bg-background-500": note.id === selectedNote?.id
                  }
                )}
                key={note.id}>
                {selectedNote?.id === note.id
                  ? !!selectedNote.name
                    ? selectedNote.name
                    : "Untitled"
                  : note.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
