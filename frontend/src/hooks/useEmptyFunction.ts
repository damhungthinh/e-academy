import { useCallback } from "react";

/** Empty function */
export const useEmptyFunction = () => useCallback(() => {
  // Only write log when development mode on.
  if (process.env.NODE_ENV === "development") {
    console.log("Empty function called!")
  }
}, [])
