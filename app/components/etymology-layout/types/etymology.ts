/**
 * Etymology result displayed on the page.
 */
export type EtymologyData = {
    prefix: string
    root: string
    suffix: string
    historicalPath: string
    relatedWords: string
}

/**
 * Outputs returned by the Dify workflow.
 */
type WorkflowOutputs = {
    errCode1?: string
    errCode2?: string
    errCode3?: string
    errMsg?: string
    returnObj: string
}

/**
 * Response returned by the workflow API route.
 */
export type WorkflowResponse = {
    data?: {
        outputs?: WorkflowOutputs
    }
}
