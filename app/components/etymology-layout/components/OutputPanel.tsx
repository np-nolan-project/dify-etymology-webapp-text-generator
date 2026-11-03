'use client'

import MarkdownOutput from '@/app/components/etymology-layout/components/MarkdownOutput'

import type { EtymologyData } from '@/app/components/etymology-layout/types/etymology'

/**
 * Props for the OutputBlock component.
 */
type OutputBlockProps = {
    id: string
    title: string
    content: string
    onCopy: (text: string) => void
}

/**
 * Renders an output section with a title, copy button, and Markdown content.
 *
 * @param id - Unique identifier used to generate element IDs.
 * @param title - Section title.
 * @param content - Markdown content to display and copy.
 * @param onCopy - Callback triggered by the Copy button.
 */
const OutputBlock = ({ id, title, content, onCopy }: OutputBlockProps) => {
    return (
        <section id={`${id}-section`}>
            <div className="output-subheader-layout">
                <h3 id={`${id}-title`} className="output-title">
                    {title}
                </h3>
                <button
                    className="copy-button"
                    onClick={() => onCopy(content)}
                >
                    Copy
                </button>
            </div>

            <MarkdownOutput
                id={`${id}-text`}
                content={content}
            />
        </section>
    )
}

/**
 * Props for the OutputPanel component.
 */
type OutputPanelProps = {
    data: EtymologyData | null
}

/**
 * Displays all etymology results, including word structure,
 * historical path, and related words.
 *
 * @param data - Etymology data returned by the workflow.
 */
const OutputPanel = ({ data }: OutputPanelProps) => {

    /**
     * Copies the specified text to the clipboard.
     *
     * @param text - Text to copy.
     */
    const handleCopy = async (text: string) => {
        await navigator.clipboard.writeText(text)
    }

    return (
        <section className="output-section">
            <section className="output-subsection">
                <OutputBlock
                    id="prefix"
                    title="Prefix"
                    content={data?.prefix ?? ''}
                    onCopy={handleCopy}
                />

                <OutputBlock
                    id="root"
                    title="Root"
                    content={data?.root ?? ''}
                    onCopy={handleCopy}
                />

                <OutputBlock
                    id="suffix"
                    title="Suffix"
                    content={data?.suffix ?? ''}
                    onCopy={handleCopy}
                />
            </section>

            <section className="output-subsection">
                <OutputBlock
                    id="historical-path"
                    title="Historical Path"
                    content={data?.historicalPath ?? ''}
                    onCopy={handleCopy}
                />
            </section>

            <section className="output-subsection">
                <OutputBlock
                    id="related-words"
                    title="Related Words"
                    content={data?.relatedWords ?? ''}
                    onCopy={handleCopy}
                />
            </section>
        </section>
    )
}

export default OutputPanel
