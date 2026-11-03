'use client'

import { useState } from 'react'
import { CODE } from '@/app/components/etymology-layout/constants/code'
import { getErrMsg } from '@/app/components/etymology-layout/utils/error'

/**
 * Props for the InputPanel component.
 */
type InputPanelProps = {
    onSearch: (query: string) => void
}

/**
 * Patterns used to detect suspicious prompt-injection attempts.
 */
const suspiciousPatterns = [
    /don't/i,
    /do\s*not/i,
    /dont/i,
    /ignore\s+(all\s+)?(previous|prior)\s+instructions?/i,
    /ignore\s+(all\s+)?(the\s+)?(my\s+)?(previous|prior)\s+instructions?/i,
    /ignore.{0,30}(previous|prior).{0,20}instructions?/i,
    /disregard\s+(all\s+)?(previous|prior)\s+instructions?/i,
    /forget\s+(all\s+)?(previous|prior).{0,20}instructions?/i,
    /you\s+are\s+now\s+(a\s+)?/i,
    /reveal\s+(your\s+)?(system\s+)?prompt/i,
    /show\s+(me\s+)?(your\s+)?(system\s+)?instructions/i,
    /bypass\s+(your\s+)?(rules|restrictions|safety)/i,
    /override\s+(your\s+)?(instructions|rules|system)/i,
]

/**
 * Provides an input field and validates the user's query before searching.
 *
 * @param onSearch - Callback triggered with the validated query.
 */
const InputPanel = ({ onSearch }: InputPanelProps) => {
    const [rawQuery, setRawQuery] = useState('')
    const [error, setError] = useState('')

    /**
     * Validates the input and submits the query.
     *
     * @param event - Form submission event.
     */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // Prevent the browser's default form submission.
        event.preventDefault()

        // Normalize the input.
        const query = rawQuery.trim().normalize('NFC')

        // Check for empty input.
        if (!query) {
            setError(getErrMsg(CODE.EMPTY_INPUT_ERROR))
            return
        }

        // Check for invalid characters.
        const englishRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/u
        if (!englishRegex.test(query)) {
            setError(getErrMsg(CODE.INVALID_CHARACTER_ERROR))
            return
        }

        // Check for suspicious input patterns.
        const isSuspicious = suspiciousPatterns.some(
            (pattern) => pattern.test(query)
        )
        if (isSuspicious) {
            setError(getErrMsg(CODE.SENSITIVE_CHECK_ERROR))
            return
        }

        // Clear errors and submit the validated query.
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

            {/* Display validation errors when present. */}
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
