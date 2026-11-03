
import { CODE } from '@/app/components/etymology-layout/constants/code'

/**
 * Returns a user-friendly error message based on the error code.
 *
 * @param errCode - A predefined error code.
 * @param preDefErrMsg - Optional predefined error message. Used for dynamically generated error messages.
 * @returns A formatted error message.
 */
export function getErrMsg(
    errCode: string,
    preDefErrMsg?: string
): string {

    // Error messages for predefined error codes.
    let res = "Error: ";
    switch (errCode) {
        case CODE.EMPTY_INPUT_ERROR:
            res += "Your input is empty."
            break

        case CODE.INVALID_CHARACTER_ERROR:
            res += "Please enter using ONLY English letters, spaces, or hyphens."
            break
        
        case CODE.SENSITIVE_CHECK_ERROR:
            res += "Please enter the correct expression."
            break

        case CODE.WORD_INCORRECT_ERROR:
            res += preDefErrMsg
            break

        case CODE.LLM_ERROR:
            res += `Please contact the developer with the error code ${CODE.LLM_ERROR}.`
            break

        case CODE.JSON_PARSE_ERROR:
            res += `Please contact the developer with the error code ${CODE.JSON_PARSE_ERROR}.`
            break

        case CODE.API_ERROR:
            res += `Please contact the developer with the error code ${CODE.API_ERROR}.`
            break

        default:
            break
    }
    return res
}
