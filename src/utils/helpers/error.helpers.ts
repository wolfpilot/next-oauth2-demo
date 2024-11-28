import { CustomError } from "ts-custom-error"

// Constants
import {
  SERVICE_ERROR_NAME,
  ServiceErrorCodes,
  serviceErrors,
} from "@constants/errors.constants"

export class ServiceError extends CustomError {
  public code: string

  constructor(code: keyof typeof ServiceErrorCodes, message?: string) {
    const err = serviceErrors[code]

    super()

    Object.defineProperty(this, "name", {
      value: SERVICE_ERROR_NAME,
    })

    this.code = code || err.code || serviceErrors.Unhandled.code
    this.message = message || err.message || serviceErrors.Unhandled.message
  }
}
