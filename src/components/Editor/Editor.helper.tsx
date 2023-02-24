import debounce from "lodash.debounce"
import {
  HTMLAttributes,
  KeyboardEvent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react"
import { api } from "utils/api"
import { NotesContext, ToastContext } from "utils/providers"

export const EditorHelper = () => {
  const { removeToast } = useContext(ToastContext)
  const { refetchNotes } = useContext(NotesContext)
  const [lineList, setLineList] = useState<ReactNode[]>([])
  const linesProps: HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> =
    {
      contentEditable: true,
      spellCheck: false,
      suppressContentEditableWarning: true,
      tabIndex: 0
    }
  const inputRef = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [lineList])
  function handleKeyPress(e: KeyboardEvent<HTMLHeadingElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      setLineList(lines => [
        ...lines,
        <p
          ref={inputRef}
          className="input focus:outline-none"
          data-placeholder={
            lines.length === 0 ? "Type / to see commands..." : ""
          }
          key={lines.length}
          {...linesProps}
        />
      ])
    }
  }

  const noteNameChange = api.notes.changeName.useMutation()

  async function handleNoteNameChange(noteName: string, noteId: string) {
    await noteNameChange.mutateAsync({
      name: noteName,
      noteId: noteId
    })
    await refetchNotes().finally(removeToast)
  }

  const debouncedChangeHandler = useCallback(
    debounce(handleNoteNameChange, 1000),
    []
  )

  return {
    lineList,
    handleKeyPress,
    debouncedChangeHandler
  }
}
