import {
  HTMLAttributes,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useRef,
  useState
} from "react"

interface EditorProps {
  handleEditorTitleChange: (title: string) => void
}

export const Editor = ({ handleEditorTitleChange }: EditorProps) => {
  const [lineList, setLineList] = useState<ReactNode[]>([])

  const inputRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    inputRef.current ? inputRef.current.focus() : titleRef.current?.focus()
  }, [lineList])

  const linesProps: HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> =
    {
      onKeyDown: handleKeyPress,
      contentEditable: true,
      spellCheck: false,
      tabIndex: 0
    }

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

  return (
    <section className="mx-auto h-full w-full max-w-[80vw] pt-8 md:max-w-[40vw]">
      <h1
        ref={titleRef}
        className="input mb-3 text-3xl font-bold focus:outline-none"
        data-placeholder="Untitled"
        onInput={e => handleEditorTitleChange(e.currentTarget.innerText)}
        {...linesProps}
      />
      {lineList.map(line => line)}
    </section>
  )
}
