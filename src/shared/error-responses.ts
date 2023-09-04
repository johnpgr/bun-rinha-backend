import type { ErrorCode } from "./error-codes"
import { ErrorCodes } from "./error-codes"

export class GenericError {
  constructor(
    public readonly code: ErrorCode,
    public readonly message: string
  ) {}
}

export class ResourceNotFoundError extends GenericError {
  constructor(message: string) {
    super(ErrorCodes.ResourceNotFound, message)
  }
}

export class ValidationError extends GenericError {
  constructor(message: string) {
    super(ErrorCodes.ValidationError, message)
  }
}

export class FailedInsertError extends GenericError {
  constructor(message: string) {
    super(ErrorCodes.FailedInsert, message)
  }
}

export class ValueConflictError extends GenericError {
  constructor(message: string) {
    super(ErrorCodes.ValueConflict, message)
  }
}
