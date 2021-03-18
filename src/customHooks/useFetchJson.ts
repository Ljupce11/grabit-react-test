import { useContext, useEffect } from "react"

import { fetchGetJson } from "../services/services"
import { ErrorMessageContext } from "../context/ErrorMessageContext"

export const useFetchJson = (setData: (data: any) => void, shouldFetch: boolean, setShouldFetch: (value: boolean) => void, endpoint: string) => {
  const { setErrorMessage } = useContext(ErrorMessageContext)

  useEffect(() => {
    const getData = async () => {
      setShouldFetch(false)
      const data: any = await fetchGetJson(endpoint)
      if (data.message) {
        setErrorMessage(data.message)
      } else {
        if (endpoint.includes('locations')) {
          setData(data.locations)
        } else if (endpoint.includes('objects')) {
          setData(data.objects)
        } else if (endpoint.includes('buckets/')) {
          setData(data.bucket)
        } else if (endpoint.includes('buckets')) {
          setData(data.buckets)
        }
      }
    }

    if (shouldFetch) {
      getData();
    }
  }, [setErrorMessage, setData, shouldFetch, setShouldFetch, endpoint])
}