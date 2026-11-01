'use client'

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
    return (
        <section className="output-section">
        <section className="output-sub-section">
            <section id="prefix-section">
            <h3 id="prefix-title" className="output-title">
                Prefix
            </h3>
            <textarea
                id="prefix-text"
                className="output-text"
                readOnly
                aria-readonly="true"
                placeholder="---"
                value={data?.prefix ?? '---'}
            />
            </section>

            <section id="root-section">
            <h3 id="root-title" className="output-title">
                Root
            </h3>
            <textarea
                id="root-text"
                className="output-text"
                readOnly
                aria-readonly="true"
                placeholder="---"
                value={data?.root ?? '---'}
            />
            </section>

            <section id="suffix-section">
            <h3 id="suffix-title" className="output-title">
                Suffix
            </h3>
            <textarea
                id="suffix-text"
                className="output-text"
                readOnly
                aria-readonly="true"
                placeholder="---"
                value={data?.suffix ?? '---'}
            />
            </section>
        </section>

        <section className="output-sub-section">
            <h3 id="historical-path-title" className="output-title">
            Historical Path
            </h3>
            <textarea
                id="historical-path-text"
                className="output-text"
                readOnly
                aria-readonly="true"
                placeholder="---"
                value={data?.historicalPath ?? '---'}
            />
        </section>

        <section className="output-sub-section">
            <h3 id="related-words-title" className="output-title">
            Related Words
            </h3>
            <textarea
                id="related-words-text"
                className="output-text"
                readOnly
                aria-readonly="true"
                placeholder="---"
                value={data?.relatedWords ?? '---'}
            />
        </section>
        </section>
    )
}

export default OutputPanel