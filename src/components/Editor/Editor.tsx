import { useContext, useState } from "react"
import { NotesContext, ToastContext } from "utils/providers"
import { EditorHelper } from "./Editor.helper"

export const Editor = () => {
  const { addToast } = useContext(ToastContext)
  const { selectedNote, setSelectedNote } = useContext(NotesContext)
  const {
    lineList,
    handleKeyPress,
    debouncedContentChangeHandler,
    debouncedNameChangeHandler
  } = EditorHelper()
  const [text, setText] = useState("")

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
              debouncedNameChangeHandler(
                e.currentTarget.value,
                selectedNote!.id
              )
              setSelectedNote({
                ...selectedNote,
                name: e.currentTarget.value
              })
            }}
            className="mb-3 block bg-transparent text-3xl font-bold leading-none focus:outline-none"
            placeholder="Untitled"
          />
          <textarea
            spellCheck={false}
            className="w-full resize-none bg-transparent focus:outline-none"
            value={selectedNote.content ?? ""}
            onChange={e => {
              addToast("Saving")
              debouncedContentChangeHandler(
                e.currentTarget.value,
                selectedNote!.id
              )
              setSelectedNote({
                ...selectedNote,
                content: e.currentTarget.value
              })
            }}
          />
        </>
      )}
    </section>
  )
}
