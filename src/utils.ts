export type Result<Data, Error> = { success: true; data: Data } | { success: false; error: Error }

export const Ok = <TData>(data: TData): Result<TData, never> => ({
    success: true,
    data,
})

export const Err = <TError extends Error>(error: TError): Result<never, TError> => ({ success: false, error })

export const tryCatchSync = <T>(fn: () => T): Result<T, Error> => {
    try {
        return Ok(fn())
    } catch (error) {
        if (error instanceof Error) {
            return Err(error)
        }
        throw error
    }
}

export const tryCatch = async <T>(fn: () => Promise<T>): Promise<Result<T, Error>> => {
    try {
        return Ok(await fn())
    } catch (error) {
        if (error instanceof Error) {
            return Err(error)
        }
        throw error
    }
}
