'use client'

import { useState, useEffect } from 'react'
import InputPanel from '@/app/components/etymology-layout/components/InputPanel'
import OutputPanel from '@/app/components/etymology-layout/components/OutputPanel'
import { CODE } from '@/app/components/etymology-layout/constants/code'
import { getErrMsg } from '@/app/components/etymology-layout/utils/error'

import type {
    EtymologyData,
    WorkflowResponse,
} from '@/app/components/etymology-layout/types/etymology'

/**
 * Manages the application layout, API requests, and etymology results.
 */
const EtymologyLayout = () => {

    // Application state
    const [isResponding, setIsResponding] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)
    const [etymologyData, setEtymologyData] = useState<EtymologyData | null>(null)

    /**
     * Updates the elapsed time while the API is responding.
     */
    useEffect(() => {
        if (!isResponding) {
            setElapsedTime(0)
            return
        }

        const timer = setInterval(() => {
            setElapsedTime((prev) => prev + 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [isResponding])

    /**
     * Sends the search query to the API and processes the response.
     *
     * @param query - Validated English word or phrase.
     */
    const handleSearch = async (query: string) => {

        // Enable the responding mask.
        setIsResponding(true)

        // Send the API request.
        let data

        try {
            const response = await fetch('/api/workflows/run', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputs: { query },
                }),
            })

            if (!response.ok) {
                throw new Error('API request failed')
            }

            const rawRes: WorkflowResponse = await response.json()
            data = rawRes.data

            if (!data?.outputs) {
                throw new Error('Invalid workflow response')
            }

        } catch (error) {
            console.error('API request error:', error)
            alert(getErrMsg(CODE.API_ERROR))
            return

        } finally {
            // Disable the responding mask.
            setIsResponding(false)
        }

        // Check for Dify workflow errors.
        const errCode =
            data.outputs?.errCode1 ??
            data.outputs?.errCode2 ??
            data.outputs?.errCode3

        if (errCode) {
            alert(getErrMsg(errCode, data.outputs?.errMsg))
            return
        }

        // Parse the returned etymology data.
        let returnObj: EtymologyData

        try {
            returnObj = JSON.parse(data.outputs.returnObj)
        } catch (error) {
            console.error('JSON parsing error:', error)
            alert(getErrMsg(CODE.JSON_PARSE_ERROR))
            return
        }

        // Update the displayed etymology result.
        setEtymologyData(returnObj)
    }

    return (
        <main className="app-shell">

            {/* Application header */}
            <header className="app-header">
                <h1 className="app-title">Etymology</h1>
                <p className="app-subtitle">
                    Deconstruct an English word or an expression.
                </p>
            </header>

            {/* Responding mask and elapsed time */}
            {isResponding && (
                <div className="responding-mask">
                    <div className="responding-msg">
                        <div>Responding...</div>
                        <div>
                            {String(Math.floor(elapsedTime / 60)).padStart(2, '0')}:
                            {String(elapsedTime % 60).padStart(2, '0')}
                        </div>
                    </div>
                </div>
            )}

            {/* Input and search panel */}
            <InputPanel onSearch={handleSearch} />

            {/* Etymology results */}
            <OutputPanel data={etymologyData} />

            {/* Application footer */}
            <footer className="app-footer">
                <span>Contents are AI-generated. No commercial use.</span>
                <span>
                    For more details, bug reports, or developer inquiries, visit the{' '}
                    <a
                        href="https://github.com/np-nolan-project/dify-etymology-webapp-text-generator"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub repository
                    </a>.
                </span>
            </footer>

        </main>
    )
}

export default EtymologyLayout
