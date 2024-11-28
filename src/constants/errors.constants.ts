// Types
import type { GenericErrors } from "@ts/errors.types"

export const SERVICE_ERROR_NAME = "ServiceError"

export enum ServiceErrorCodes {
  NotFound = "NotFound",
  Conflict = "Conflict",
  Unhandled = "Unhandled",
}

export type ServiceErrors = GenericErrors<ServiceErrorCodes>

export const serviceErrors: ServiceErrors = {
  NotFound: {
    code: ServiceErrorCodes.NotFound,
    message:
      "The requested operation failed because a resource associated with the request could not be found.",
  },
  Conflict: {
    code: ServiceErrorCodes.Conflict,
    message:
      "The API request cannot be completed because the requested operation would conflict with an existing item. For example, a request that tries to create a duplicate item would create a conflict, though duplicate items are typically identified with more specific errors.",
  },
  Unhandled: {
    code: ServiceErrorCodes.Unhandled,
    message: "The request failed due to an internal error.",
  },
}
