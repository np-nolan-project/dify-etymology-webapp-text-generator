'use client'

import { useState } from 'react'
import { CODE } from '@/app/components/etymology-layout/constants/code'
import { getErrMsg } from '@/app/components/etymology-layout/utils/error'

type InputPanelProps = {
  onSearch: (query: string) => void
}

const InputPanel = ({ onSearch }: InputPanelProps) => {
    const [rawQuery, setRawQuery] = useState('')
    const [error, setError] = useState('')

    /**
     * When the Search button pressed
     */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // Prevent the default submit behavior.
        event.preventDefault()

        // Define the local variable for process
        let query = rawQuery

        // Empty check
        query = query.trim()
        if (!query) {
            setError(getErrMsg(CODE.EMPTY_INPUT_ERROR))
            return
        }

        // English check
        query = query.normalize('NFC')
        const englishRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/u
        if (!englishRegex.test(query)) {
            setError(getErrMsg(CODE.INVALID_CHARACTER_ERROR))
            return
        }

        // Sensitive word check
        const suspiciousPatterns = [
            /don't/i,
            /do\s*not/i,
            /dont/i,
            /ignore\s+(all\s+)?(previous|prior)\s+instructions?/i,
            /ignore\s+(all\s+)?(the\s+)?(my\s+)?(previous|prior)\s+instructions?/i,
            /ignore.{0,30}(previous|prior).{0,20}instructions?/i,
            /disregard\s+(all\s+)?(previous|prior)\s+instructions?/i,
            /forget\s+(all\s+)?(previous|prior)\s+instructions?/i,
            /you\s+are\s+now\s+(a\s+)?/i,
            /reveal\s+(your\s+)?(system\s+)?prompt/i,
            /show\s+(me\s+)?(your\s+)?(system\s+)?instructions/i,
            /bypass\s+(your\s+)?(rules|restrictions|safety)/i,
            /override\s+(your\s+)?(instructions|rules|system)/i,
        ]
        const isSuspicious = suspiciousPatterns.some(
            (pattern) => pattern.test(query)
        )
        if (isSuspicious) {
            setError(getErrMsg(CODE.SENSITIVE_CHECK_ERROR))
            return
        }

        // Success
        setError('')
        onSearch(query)
    }

    return (
         <section className="lookup-section">
            <form
                id="lookup-form"
                className="lookup-form"
                noValidate
                onSubmit={handleSubmit}
            >
                <input
                    id="word-input"
                    name="word"
                    className="word-input"
                    type="text"
                    value={rawQuery}
                    onChange={(event) => setRawQuery(event.target.value)}
                    inputMode="latin"
                    autoComplete="off"
                    autoCapitalize="none"
                    spellCheck={true}
                    placeholder="Enter ONE English word or ONE phrase"
                    required
                />

                <button
                    id="search-button"
                    className="search-button"
                    type="submit"
                >
                    <span id="search-button-label">Search</span>
                </button>
            </form>

            <p
                id="error-msg"
                className="error-msg"
                role="status"
                aria-live="polite"
                hidden={!error}
            >
                {error}
            </p>
        </section>
    )
}

export default InputPanel
