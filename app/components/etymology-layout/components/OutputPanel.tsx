'use client'

import MarkdownOutput from '@/app/components/etymology-layout/components/MarkdownOutput'

type OutputPanelProps = {
    data: {
        prefix?: string
        root?: string
        suffix?: string
        historicalPath?: string
        relatedWords?: string
    } | null
}

const OutputPanel = ({ data }: OutputPanelProps) => {

    // Markdown Copy
    const handleCopy = async (text: string) => {
        await navigator.clipboard.writeText(text)
    }

    return (
        <section className="output-section">
            <section className="output-subsection">
                <section id="prefix-section">
                    <div className="output-subheader-layout">
                        <h3 id="prefix-title" className="output-title">
                            Prefix
                        </h3>
                        <button className="copy-button" onClick={() => handleCopy(data?.prefix ?? '')}>
                            Copy
                        </button>
                    </div>
                    <MarkdownOutput
                        id="prefix-text"
                        content={data?.prefix ?? ''}
                    />
                </section>

                <section id="root-section">
                    <div className="output-subheader-layout">
                        <h3 id="root-title" className="output-title">
                            Root
                        </h3>
                        <button className="copy-button" onClick={() => handleCopy(data?.root ?? '')}>
                            Copy
                        </button>
                    </div>
                    <MarkdownOutput
                        id="root-text"
                        content={data?.root ?? ''}
                    />
                </section>

                <section id="suffix-section">
                    <div className="output-subheader-layout">
                        <h3 id="suffix-title" className="output-title">
                            Suffix
                        </h3>
                        <button className="copy-button" onClick={() => handleCopy(data?.suffix ?? '')}>
                            Copy
                        </button>
                    </div>
                    <MarkdownOutput
                        id="suffix-text"
                        content={data?.suffix ?? ''}
                    />
                </section>
            </section>

            <section className="output-subsection">
                <div className="output-subheader-layout">
                    <h3 id="historical-path-title" className="output-title">
                        Historical Path
                    </h3>
                    <button className="copy-button" onClick={() => handleCopy(data?.historicalPath ?? '')}>
                            Copy
                    </button>
                </div>
                <MarkdownOutput
                    id="historical-path-text"
                    content={data?.historicalPath ?? ''}
                />
            </section>

            <section className="output-subsection">
                <div className="output-subheader-layout">
                    <h3 id="related-words-title" className="output-title">
                        Related Words
                    </h3>
                    <button className="copy-button" onClick={() => handleCopy(data?.relatedWords ?? '')}>
                        Copy
                    </button>
                </div>
                <MarkdownOutput
                    id="related-words-text"
                    content={data?.relatedWords ?? ''}
                />
            </section>
        </section>
    )
}

export default OutputPanel