export const ErrorCodes = {
  GenericError: "GENERIC_ERROR",
  ValueConflict: "VALUE_CONFLICT",
  ResourceNotFound: "RESOURCE_NOT_FOUND",
  FailedInsert: "FAILED_INSERT",
  ValidationError: "VALIDATION_ERROR",
} as const
export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes]
