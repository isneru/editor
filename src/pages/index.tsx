import { Editor, Sidebar, Topbar } from "components"
import Head from "next/head"
import { useState } from "react"

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [editorTitle, setEditorTitle] = useState<string | undefined>()

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
          <Sidebar isOpen={isSidebarOpen} />
          <Editor handleEditorTitleChange={handleEditorTitleChange} />
        </main>
      </div>
    </>
  )
}
