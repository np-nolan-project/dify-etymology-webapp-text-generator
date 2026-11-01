import ReactMarkdown from 'react-markdown'

type MarkdownOutputProps = {
    id?: string
    content: string
}

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
