import { useContext } from "react"
import { NotesContext, ToastContext } from "utils/providers"
import { EditorHelper } from "./Editor.helper"

export const Editor = () => {
  const { addToast } = useContext(ToastContext)
  const { selectedNote, setSelectedNote } = useContext(NotesContext)
  const { lineList, handleKeyPress, debouncedChangeHandler } = EditorHelper()

  return (
    <section className="mx-auto h-full w-full max-w-[80vw] pt-8 md:max-w-[40vw]">
      {selectedNote && (
        <>
          <input
            spellCheck={false}
            id={selectedNote.id}
            onKeyDown={handleKeyPress}
            value={selectedNote.name}
            onChange={e => {
              addToast("Saving")
              debouncedChangeHandler(e.currentTarget.value, selectedNote!.id)
              setSelectedNote({ ...selectedNote, name: e.currentTarget.value })
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
