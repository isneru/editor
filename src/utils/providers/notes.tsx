import { Note } from "@prisma/client"
import { useSession } from "next-auth/react"
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState
} from "react"
import { api } from "utils/api"

interface NotesContextData {
  userNotes: Note[] | undefined
  refetchNotes(): Promise<void>
  selectedNote: Note | undefined
  setSelectedNote: Dispatch<SetStateAction<Note | undefined>>
  openedNotes: Note[]
  addNoteToLS(note: Note): () => void
  removeNoteFromLS(noteId: Note["id"]): void
  deleteNote(noteId: Note["id"]): () => Promise<void>
}
export const NotesContext = createContext({} as NotesContextData)

interface NotesProviderProps {
  children: ReactNode
}

export const NotesProvider = ({ children }: NotesProviderProps) => {
  const [selectedNote, setSelectedNote] = useState<Note>()
  const [openedNotes, setOpenedNotes] = useState<Note[]>([])

  const { data: session } = useSession()
  const { data: userNotes, refetch } = api.notes.getAllByUserId.useQuery(
    {
      userId: session?.user?.id
    },
    {
      enabled: !!session?.user
    }
  )
  const handleDeleteNote = api.notes.delete.useMutation()

  async function refetchNotes() {
    await refetch()
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const openedTabs = localStorage.getItem("openedTabs")
      setOpenedNotes(JSON.parse(openedTabs ?? "[]"))
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("openedTabs", JSON.stringify(openedNotes))
    }
  }, [openedNotes])

  function addNoteToLS(note: Note) {
    return () => {
      setSelectedNote(note)
      const isDuplicate = openedNotes.some(n => n.id === note.id)
      if (isDuplicate) return
      const newOpenedNotes = [...openedNotes, note]
      setOpenedNotes(newOpenedNotes)
    }
  }

  function deleteNote(noteId: Note["id"]) {
    return async () => {
      await handleDeleteNote.mutateAsync(
        { noteId: noteId },
        {
          onSuccess: () => {
            removeNoteFromLS(noteId)
            refetchNotes()
          }
        }
      )
    }
  }

  function removeNoteFromLS(noteId: Note["id"]) {
    const newOpenedNotes = openedNotes.filter(n => n.id !== noteId)
    setOpenedNotes(newOpenedNotes)
    setSelectedNote(newOpenedNotes.length ? newOpenedNotes[0] : undefined)
  }

  return (
    <NotesContext.Provider
      value={{
        userNotes,
        refetchNotes,
        selectedNote,
        setSelectedNote,
        openedNotes,
        addNoteToLS,
        removeNoteFromLS,
        deleteNote
      }}>
      {children}
    </NotesContext.Provider>
  )
}
