import {
  HTMLAttributes,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useRef,
  useState
} from "react"

export const EditorHelper = () => {
  const [lineList, setLineList] = useState<ReactNode[]>([])

  const inputRef = useRef<HTMLParagraphElement>(null)

  const linesProps: HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> =
    {
      contentEditable: true,
      spellCheck: false,
      suppressContentEditableWarning: true,
      tabIndex: 0
    }

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

  return {
    lineList,
    handleKeyPress
  }
}
