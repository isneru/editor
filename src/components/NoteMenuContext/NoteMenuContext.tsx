import { Note } from "@prisma/client"
import * as ContextMenu from "@radix-ui/react-context-menu"
import { TrashIcon } from "@radix-ui/react-icons"
import { AnimatePresence, motion } from "framer-motion"
import { ReactNode, useContext, useState } from "react"
import { NotesContext } from "utils/providers"

interface NoteMenuContextProps {
  children: ReactNode
  note: Note
}

export const NoteMenuContext = ({ children, note }: NoteMenuContextProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const { deleteNote } = useContext(NotesContext)
  return (
    <ContextMenu.Root onOpenChange={setOpen}>
      <ContextMenu.Trigger asChild>{children}</ContextMenu.Trigger>
      <AnimatePresence>
        {open && (
          <ContextMenu.Content forceMount asChild>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.08 }}
              className="rounded-lg bg-background-800 p-1 shadow-[0px_0px_0px_1px] shadow-black/10">
              <ContextMenu.Item asChild>
                <button
                  className="flex items-center justify-center gap-2 rounded px-2 py-1 transition-colors hover:bg-white/10"
                  onClick={() => deleteNote(note)}>
                  Delete Note <TrashIcon width={16} height={16} />
                </button>
              </ContextMenu.Item>
            </motion.div>
          </ContextMenu.Content>
        )}
      </AnimatePresence>
    </ContextMenu.Root>
  )
}
