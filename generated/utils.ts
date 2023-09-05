export type Result<Error, Data> = {
    success: true;
    data: Data;
} | {
    success: false;
    error: Error;
};
export const Ok = <TData>(data: TData): Result<never, TData> => ({
    success: true,
    data,
});
export const Err = <TError extends Error>(error: TError): Result<TError, never> => ({ success: false, error });
export const tryCatchSync = <T>(fn: () => T): Result<Error, T> => {
    try {
        return Ok(fn());
    }
    catch (error) {
        if (error instanceof Error) {
            return Err(error);
        }
        throw error;
    }
};
export const tryCatch = async <T>(fn: () => Promise<T>): Promise<Result<Error, T>> => {
    try {
        return Ok(await fn());
    }
    catch (error) {
        if (error instanceof Error) {
            return Err(error);
        }
        throw error;
    }
};
