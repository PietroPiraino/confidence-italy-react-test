import {useCallback, useState} from "react";

export default function useHttp(requestConfig, applyData) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const sendRequest = useCallback(async (locationsReq) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch(requestConfig.url
                , {
                    method: requestConfig.method ? requestConfig.method : 'GET',
                    headers: requestConfig.headers ? requestConfig.headers : {},
                    mode: requestConfig.mode ? requestConfig.mode : 'no-cors',
                    body: locationsReq ? JSON.stringify(locationsReq) : requestConfig.body ? JSON.stringify(requestConfig.body) : null
                }
            )

            if (!response.ok) {
                throw new Error('Request failed!')
            }

            const data = await response.json()
            applyData(data)
        } catch (err) {
            setError(err.message || 'Somenthing went wrong!')
        }
        setIsLoading(false)
    }, [requestConfig, applyData])

    return {
        error,
        isLoading,
        sendRequest
    }
}
