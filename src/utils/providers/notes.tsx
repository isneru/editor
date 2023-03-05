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
  selectedNote: Note | undefined
  setSelectedNote: Dispatch<SetStateAction<Note | undefined>>
  userNotes: Note[] | undefined
  refetchNotes(): Promise<void>
  openedNotes: Note[]
  addNoteToLS: (note: Note) => void
  removeNoteFromLS: (note: Note) => void
  deleteNote(note: Note): Promise<void>
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

  function addNoteToLS(note: Note) {
    setSelectedNote(note)
    const isDuplicate = openedNotes.some(n => n.id === note.id)
    if (isDuplicate) return
    const newOpenedNotes = [...openedNotes, note]
    setOpenedNotes(newOpenedNotes)
  }

  async function deleteNote(note: Note) {
    await handleDeleteNote.mutateAsync(
      { noteId: note.id },
      {
        onSuccess: () => {
          removeNoteFromLS(note)
          refetchNotes()
        }
      }
    )
  }

  function removeNoteFromLS(note: Note) {
    const newOpenedNotes = openedNotes.filter(n => n.id !== note.id)
    setOpenedNotes(newOpenedNotes)
    setSelectedNote(newOpenedNotes.length ? newOpenedNotes[0] : undefined)
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("openedTabs", JSON.stringify(openedNotes))
    }
  }, [openedNotes])

  return (
    <NotesContext.Provider
      value={{
        selectedNote,
        setSelectedNote,
        userNotes,
        refetchNotes,
        addNoteToLS,
        removeNoteFromLS,
        openedNotes,
        deleteNote
      }}>
      {children}
    </NotesContext.Provider>
  )
}
