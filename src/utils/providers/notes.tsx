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
  useOpenedTabs(): {
    readonly openedNotes: Note[] | undefined
    readonly addNoteToLS: (note: Note) => void
    readonly removeItemFromLS: (note: Note) => void
  }
}
export const NotesContext = createContext({} as NotesContextData)

interface NotesProviderProps {
  children: ReactNode
}

export const NotesProvider = ({ children }: NotesProviderProps) => {
  const [selectedNote, setSelectedNote] = useState<Note | undefined>(undefined)

  const { data: session } = useSession()
  const { data: userNotes, refetch } = api.notes.getAllByUserId.useQuery(
    {
      userId: session?.user?.id
    },
    {
      enabled: !!session?.user
    }
  )
  async function refetchNotes() {
    await refetch()
  }

  function useOpenedTabs() {
    const [openedNotes, setOpenedNotes] = useState<Note[]>([])

    useEffect(() => {
      if (typeof window !== "undefined") {
        const openedTabs = localStorage.getItem("openedTabs")
        setOpenedNotes(JSON.parse(openedTabs ?? "[]"))
      }
    }, [])

    function addNoteToLS(note: Note) {
      const isDuplicate = openedNotes.some(n => n.id === note.id)
      if (isDuplicate) return
      const newOpenedNotes = [...openedNotes, note]
      setOpenedNotes(newOpenedNotes)
      localStorage.setItem("openedTabs", JSON.stringify(newOpenedNotes))
    }

    function removeItemFromLS(note: Note) {
      const newOpenedNotes = openedNotes?.filter(n => n.id !== note.id)
      setOpenedNotes(newOpenedNotes)
      localStorage.setItem("openedTabs", JSON.stringify(newOpenedNotes))
    }

    return { openedNotes, addNoteToLS, removeItemFromLS } as const
  }

  return (
    <NotesContext.Provider
      value={{
        selectedNote,
        setSelectedNote,
        userNotes,
        refetchNotes,
        useOpenedTabs
      }}>
      {children}
    </NotesContext.Provider>
  )
}
