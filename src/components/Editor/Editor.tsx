import { Note } from "@prisma/client"
import { Dispatch, SetStateAction } from "react"
import { EditorHelper } from "./Editor.helper"

interface EditorProps {
  selectedNote: Note | undefined
  setSelectedNote: Dispatch<SetStateAction<Note | undefined>>
  refetchUserNotes: () => Promise<void>
}

export const Editor = ({
  selectedNote,
  setSelectedNote,
  refetchUserNotes
}: EditorProps) => {
  const { lineList, handleKeyPress, debouncedChangeHandler } = EditorHelper({
    refetchUserNotes
  })

  const noteName = selectedNote?.name === "Untitled" ? "" : selectedNote?.name

  return (
    <section className="mx-auto h-full w-full max-w-[80vw] pt-8 md:max-w-[40vw]">
      <input
        spellCheck={false}
        id={selectedNote?.id}
        onKeyDown={handleKeyPress}
        value={noteName}
        onChange={e => {
          setSelectedNote({ ...selectedNote!, name: e.currentTarget.value })
          debouncedChangeHandler(e.currentTarget.value, selectedNote!.id)
        }}
        className="input mb-3 bg-transparent text-3xl font-bold focus:outline-none"
        placeholder="Untitled"
      />
      {lineList.map(line => line)}
    </section>
  )
}
