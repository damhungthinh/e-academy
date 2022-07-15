import { useEffect, useState } from "react";
import { DEBOUNCE_TTL } from "@enums/AppConst";
import { useEmptyFunction } from "./useEmptyFunction";

type VoidFunc = () => void
/**
 * Custom hooks for block callback dupplicated excute
 * 
 * @param cb the callback function
 * @param ttl time to live - time for next callback call
 * @returns the function will be excuted
 */
export const useDebounces = (cb: VoidFunc, ttl: number = DEBOUNCE_TTL) => {
  const defaultCb = useEmptyFunction()
  const [func, setFunc] = useState<VoidFunc>(cb)

  useEffect(() => {

    // Update callback value after delay
    const timer = setTimeout(() => {
      setFunc(defaultCb)
    }, ttl)


    return () => {
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      clearTimeout(timer)
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cb, ttl]) // Only re-call effect if value or delay changes

  return func
}
