import { Note } from "@prisma/client"
import debounce from "lodash.debounce"
import { Dispatch, SetStateAction, useCallback } from "react"
import { api } from "utils/api"
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
  const { lineList, handleKeyPress } = EditorHelper()
  const noteNameChange = api.note.changeName.useMutation()

  async function handleNoteNameChange(noteName: string, noteId: string) {
    await noteNameChange.mutateAsync({
      name: noteName,
      noteId: noteId
    })
    await refetchUserNotes()
  }

  const debouncedChangeHandler = useCallback(
    debounce(handleNoteNameChange, 1000),
    []
  )

  return (
    <section className="mx-auto h-full w-full max-w-[80vw] pt-8 md:max-w-[40vw]">
      <input
        spellCheck={false}
        id={selectedNote?.id}
        onKeyDown={handleKeyPress}
        value={!!selectedNote?.name ? selectedNote?.name : ""}
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
