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
  selectedNote: Note | undefined
  setSelectedNote: Dispatch<SetStateAction<Note | undefined>>
  userNotes: Note[] | undefined
  refetchNotes(): Promise<void>
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

  return (
    <NotesContext.Provider
      value={{
        selectedNote,
        setSelectedNote,
        userNotes,
        refetchNotes
      }}>
      {children}
    </NotesContext.Provider>
  )
}
