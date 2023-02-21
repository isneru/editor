import { Button, Editor, Sidebar, Topbar } from "components"
import { signIn, useSession } from "next-auth/react"
import Head from "next/head"
import { useState } from "react"

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [editorTitle, setEditorTitle] = useState<string | undefined>()
  const { data: session, status } = useSession()

  function toggleSidebar() {
    setIsSidebarOpen(val => !val)
  }

  function handleEditorTitleChange(title: string) {
    setEditorTitle(title)
  }

  return (
    <>
      <Head>
        <title>{`Home | ${editorTitle ?? "Untitled"}`}</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen w-screen flex-col">
        <Topbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex h-full w-full">
          <Sidebar user={session?.user} isOpen={isSidebarOpen} />
          <Editor handleEditorTitleChange={handleEditorTitleChange} />
        </main>
        {status === "unauthenticated" && (
          <Button
            className="absolute right-5 bottom-5"
            onClick={() => signIn("google")}>
            Sign In
          </Button>
        )}
      </div>
    </>
  )
}
