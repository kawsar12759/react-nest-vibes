import { useCallback, useEffect, useState } from 'react';

/**
 * Runs an async loader and tracks { data, error, loading }. Re-runs when deps change;
 * `reload()` re-runs on demand (e.g. after a mutation).
 */
export default function useAsync(loader, deps = []) {
  const [state, setState] = useState({ data: undefined, error: null, loading: true });
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let active = true;
    setState((s) => ({ ...s, loading: true, error: null }));
    Promise.resolve()
      .then(loader)
      .then((data) => active && setState({ data, error: null, loading: false }))
      .catch((error) => active && setState({ data: undefined, error, loading: false }));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce]);

  const reload = useCallback(() => setNonce((n) => n + 1), []);
  return { ...state, reload };
}
