import { Note } from "@prisma/client"
import {
  Button,
  Editor,
  Sidebar,
  SidebarExplorer,
  ToastProvider,
  Topbar
} from "components"
import { signIn, useSession } from "next-auth/react"
import Head from "next/head"
import { useState } from "react"
import { api } from "utils/api"

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedNote, setSelectedNote] = useState<Note | undefined>()
  const [notes, setNotes] = useState<Note[]>([])
  const [isToastVisible, setIsToastVisible] = useState(false)

  const { data: session, status } = useSession()

  function toggleSidebar() {
    setIsSidebarOpen(val => !val)
  }

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
    <>
      <Head>
        <title>{!!selectedNote?.name ? selectedNote?.name : "Untitled"}</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastProvider>
        <div className="flex h-screen w-screen flex-col">
          <Topbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <main className="flex h-full w-full">
            <Sidebar user={session?.user} isOpen={isSidebarOpen}>
              <SidebarExplorer
                notes={notes}
                setNotes={setNotes}
                refetchUserNotes={refetchUserNotes}
                selectedNote={selectedNote}
                setSelectedNote={setSelectedNote}
                isOpen={isSidebarOpen}
                user={session?.user}
              />
            </Sidebar>
            <Editor
              refetchUserNotes={refetchUserNotes}
              setSelectedNote={setSelectedNote}
              selectedNote={selectedNote}
            />
          </main>
          {status === "unauthenticated" && (
            <Button
              className="absolute right-5 bottom-5"
              onClick={() => signIn("google")}>
              Sign In
            </Button>
          )}
        </div>
      </ToastProvider>
    </>
  )
}
