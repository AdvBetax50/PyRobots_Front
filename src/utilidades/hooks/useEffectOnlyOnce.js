import { useEffect } from "react";

// eslint-disable-next-line react-hooks/exhaustive-deps
const useEffectOnlyOnce = (func) => useEffect(func, [])
export default useEffectOnlyOnce