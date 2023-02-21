import { type Note } from "@prisma/client"
import { ArchiveIcon, Pencil2Icon } from "@radix-ui/react-icons"
import clsx from "clsx"
import { TooltipPopover } from "components"
import { User } from "next-auth"
import { useState } from "react"
import { api } from "utils/api"

interface SidebarExplorerProps {
  isOpen: boolean
  user?: User
}

export const SidebarExplorer = ({ isOpen, user }: SidebarExplorerProps) => {
  const [notes, setNotes] = useState<Note[]>([])

  const noteCreate = api.note.create.useMutation()
  const userNotes = api.note.getAllByUserId.useQuery(
    {
      userId: user?.id
    },
    {
      enabled: !!user,
      onSuccess: notes => {
        if (!!notes) {
          setNotes([...notes])
        }
      }
    }
  )

  async function handleCreateNote() {
    if (!user) return
    const createdNote = await noteCreate.mutateAsync({
      userId: user.id
    })
    await userNotes.refetch()
    setNotes(notes => [...notes, ...userNotes.data!])
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
                className="flex items-center rounded px-2 py-[3px] hover:bg-background-500"
                key={note.id}>
                {note.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
