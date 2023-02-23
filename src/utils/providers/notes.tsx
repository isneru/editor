import { Note } from "@prisma/client"
import { useSession } from "next-auth/react"
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from "react"
import { api } from "utils/api"

interface NotesContextData {
  notes: Note[]
  setNotes: Dispatch<SetStateAction<Note[]>>
  selectedNote: Note | undefined
  setSelectedNote: Dispatch<SetStateAction<Note | undefined>>
  refetchUserNotes(): Promise<void>
  openedNotesAsTab: Note[] | undefined
  setOpenedNotesAsTab: Dispatch<SetStateAction<Note[] | undefined>>
}

export const NotesContext = createContext({} as NotesContextData)

interface NotesProviderProps {
  children: ReactNode
}

export const NotesProvider = ({ children }: NotesProviderProps) => {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | undefined>()
  const [openedNotesAsTab, setOpenedNotesAsTab] = useState<Note[] | undefined>()

  const { data: session } = useSession()

  const userNotes = api.note.getAllByUserId.useQuery(
    {
      userId: session?.user?.id
    },
    {
      enabled: !!session?.user,
      onSuccess: notes => {
        if (!!notes) {
          setNotes([...notes])
        }
      }
    }
  )

  async function refetchUserNotes() {
    await userNotes.refetch()
  }

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        selectedNote,
        setSelectedNote,
        refetchUserNotes,
        openedNotesAsTab,
        setOpenedNotesAsTab
      }}>
      {children}
    </NotesContext.Provider>
  )
}
