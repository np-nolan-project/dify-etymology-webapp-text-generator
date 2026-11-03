import ReactMarkdown from 'react-markdown'

/**
 * Props for the MarkdownOutput component.
 */
type MarkdownOutputProps = {
    id?: string
    content: string
}

/**
 * Renders Markdown content as HTML.
 *
 * @param id - Optional HTML element ID.
 * @param content - Markdown text to render.
 */
export default function MarkdownOutput({
    id,
    content,
}: MarkdownOutputProps) {
    return (
        <div
            id={id}
            className="markdown-output markdown-body"
        >
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    )
}
