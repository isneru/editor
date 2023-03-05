import { Note } from "@prisma/client"
import * as ContextMenu from "@radix-ui/react-context-menu"
import { TrashIcon } from "@radix-ui/react-icons"
import { ReactNode, useContext } from "react"
import { NotesContext } from "utils/providers"

interface NoteMenuContextProps {
  children: ReactNode
  note: Note
}

export const NoteMenuContext = ({ children, note }: NoteMenuContextProps) => {
  const { deleteNote } = useContext(NotesContext)
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>{children}</ContextMenu.Trigger>
      <ContextMenu.Content className="rounded-lg bg-background-800 p-1 shadow-[0px_0px_0px_1px] shadow-black/10">
        <ContextMenu.Item asChild>
          <button
            className="flex items-center justify-center gap-2 rounded px-2 py-1 transition-colors hover:bg-white/10"
            onClick={() => deleteNote(note)}>
            Delete Note <TrashIcon width={16} height={16} />
          </button>
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  )
}
