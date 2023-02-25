import md from "markdown-it"
import { useContext, useState } from "react"
import { NotesContext, ToastContext } from "utils/providers"
import { EditorHelper } from "./Editor.helper"

export const Editor = () => {
  const { addToast } = useContext(ToastContext)
  const { selectedNote, setSelectedNote } = useContext(NotesContext)
  const { lineList, handleKeyPress, debouncedChangeHandler } = EditorHelper()
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
              debouncedChangeHandler(e.currentTarget.value, selectedNote!.id)
              setSelectedNote({
                ...selectedNote,
                name: e.currentTarget.value
              })
            }}
            className="mb-3 bg-transparent text-3xl font-bold leading-none focus:outline-none"
            placeholder="Untitled"
          />
          {/* {lineList.map(line => line)} */}
          <div
            contentEditable
            className="prose prose-invert focus:outline-none prose-h1:text-3xl"
            onInput={e => {
              setText(e.currentTarget.innerText)
            }}
            dangerouslySetInnerHTML={{
              __html: md({
                html: true,
                linkify: true,
                typographer: true
              }).render(text)
            }}
          />
        </>
      )}
    </section>
  )
}
