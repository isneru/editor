import { useContext, useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown"
import { NotesContext, ToastContext } from "utils/providers"
import { EditorHelper } from "./Editor.helper"
export const Editor = () => {
  const { addToast } = useContext(ToastContext)
  const { selectedNote, setSelectedNote } = useContext(NotesContext)
  const [isEditing, setIsEditing] = useState(false)
  const {
    handleKeyPress,
    debouncedContentChangeHandler,
    debouncedNameChangeHandler
  } = EditorHelper()

  useEffect(() => {
    isEditing && inputRef.current?.focus()
  }, [isEditing])

  const inputRef = useRef<HTMLTextAreaElement>(null)

  return (
    <section className="mx-auto h-full w-full max-w-[80vw] overflow-y-hidden pt-8 md:max-w-[40vw]">
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
          {isEditing ? (
            <textarea
              ref={inputRef}
              spellCheck={false}
              onBlur={() => setIsEditing(false)}
              className="h-full w-full resize-none bg-transparent focus:outline-none"
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
          ) : (
            <div
              contentEditable
              onFocus={() => {
                setIsEditing(true)
              }}>
              <ReactMarkdown className="prose prose-invert h-full w-full">
                {selectedNote.content ?? ""}
              </ReactMarkdown>
            </div>
          )}
        </>
      )}
    </section>
  )
}
