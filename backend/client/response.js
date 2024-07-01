export const constructResponse = (status_code, error, data, message) => {
    return {
        status_code, 
        error,
        data,
        message
    }
}