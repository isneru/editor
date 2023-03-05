import { ArchiveIcon, Pencil2Icon } from "@radix-ui/react-icons"
import clsx from "clsx"
import { NoteMenuContext, TooltipPopover } from "components"
import { User } from "next-auth"
import { useContext } from "react"
import { api } from "utils/api"
import { NotesContext } from "utils/providers"

interface SidebarExplorerProps {
  isOpen: boolean
  user?: User
}

export const SidebarExplorer = ({ isOpen, user }: SidebarExplorerProps) => {
  const { userNotes, selectedNote, refetchNotes, addNoteToLS } =
    useContext(NotesContext)
  const noteCreate = api.notes.create.useMutation()

  async function handleCreateNote() {
    if (!user) return
    const createdNote = await noteCreate.mutateAsync({
      userId: user.id
    })
    await refetchNotes().finally(() => addNoteToLS(createdNote))
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
        {userNotes && (
          <div className="mt-2 flex flex-col justify-center gap-0.5">
            {userNotes.map(note => (
              <NoteMenuContext note={note}>
                <button
                  onClick={() => addNoteToLS(note)}
                  className={clsx(
                    "flex items-center overflow-hidden rounded px-2 py-[3px] hover:bg-background-500",
                    {
                      "bg-background-500": note.id === selectedNote?.id
                    }
                  )}
                  key={note.id}>
                  {!!note.name ? note.name : "Untitled"}
                </button>
              </NoteMenuContext>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
