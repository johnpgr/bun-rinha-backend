import type { ErrorCode } from "./error-codes"
import { ErrorCodes } from "./error-codes"

class BaseError {
  constructor(
    public readonly code: ErrorCode,
    public readonly message: string
  ) {}
}

export class UnknownError extends BaseError {
  constructor(message: string) {
    super(ErrorCodes.UnkownError, message)
  }
}

export class ResourceNotFoundError extends BaseError {
  constructor(message: string) {
    super(ErrorCodes.ResourceNotFound, message)
  }
}

export class ValidationError extends BaseError {
  constructor(message: string) {
    super(ErrorCodes.ValidationError, message)
  }
}

export class FailedInsertError extends BaseError {
  constructor(message: string) {
    super(ErrorCodes.FailedInsert, message)
  }
}
