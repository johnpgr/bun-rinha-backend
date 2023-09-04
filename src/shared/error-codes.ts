export const ErrorCodes = {
  UnkownError: "UNKNOWN_ERROR",
  ResourceNotFound: "RESOURCE_NOT_FOUND",
  FailedInsert: "FAILED_INSERT",
  ValidationError: "VALIDATION_ERROR",
} as const
export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes]
