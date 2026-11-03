/**
 * Application status and error codes.
 *
 * Naming convention:
 * - 0000: Success
 * - 000x: Input validation errors
 * - D00x: AI processing errors
 * - A00x: API communication errors
 */
export const CODE = {
    // General
    SUCCESS: '0000', // Operation completed successfully.

    // Input validation errors
    EMPTY_INPUT_ERROR: '0001', // No input was provided.
    INVALID_CHARACTER_ERROR: '0002', // Input contains unsupported characters.
    SENSITIVE_CHECK_ERROR: '0003', // Input failed the sensitive content check.

    // AI processing errors
    WORD_INCORRECT_ERROR: 'D001', // Input is not a valid English word or phrase.
    LLM_ERROR: 'D002', // Failed to process the request using the LLM.
    JSON_PARSE_ERROR: 'D003', // LLM response does not match the expected JSON format.

    // API communication errors
    API_ERROR: 'A001', // API request failed.
} as const;
