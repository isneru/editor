import { useContext } from "react"
import { NotesContext, ToastContext } from "utils/providers"
import { EditorHelper } from "./Editor.helper"

interface EditorProps {}

export const Editor = ({}: EditorProps) => {
  const { refetchUserNotes, selectedNote, setSelectedNote } =
    useContext(NotesContext)

  const { lineList, handleKeyPress, debouncedChangeHandler } = EditorHelper({
    refetchUserNotes
  })

  const { addToast } = useContext(ToastContext)

  const noteName = selectedNote?.name === "Untitled" ? "" : selectedNote?.name

  return (
    <section className="mx-auto h-full w-full max-w-[80vw] pt-8 md:max-w-[40vw]">
      {selectedNote && (
        <>
          <input
            spellCheck={false}
            id={selectedNote?.id}
            onKeyDown={handleKeyPress}
            value={noteName}
            onChange={e => {
              addToast("Saving")
              setSelectedNote({ ...selectedNote!, name: e.currentTarget.value })
              debouncedChangeHandler(e.currentTarget.value, selectedNote!.id)
            }}
            className="mb-3 bg-transparent text-3xl font-bold leading-none focus:outline-none"
            placeholder="Untitled"
          />
          {lineList.map(line => line)}
        </>
      )}
    </section>
  )
}
