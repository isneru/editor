import { Editor, Sidebar, Topbar } from "components"
import { useSession } from "next-auth/react"
import Head from "next/head"
import { useContext, useState } from "react"
import { NotesContext } from "utils/providers"

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { selectedNote } = useContext(NotesContext)

  const { data: session } = useSession()

  function toggleSidebar() {
    setIsSidebarOpen(val => !val)
  }

  return (
    <>
      <Head>
        <title>{!!selectedNote?.name ? selectedNote?.name : "Untitled"}</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen w-screen flex-col">
        <Topbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex h-full w-full">
          <Sidebar user={session?.user} isOpen={isSidebarOpen} />
          <Editor />
        </main>
      </div>
    </>
  )
}
