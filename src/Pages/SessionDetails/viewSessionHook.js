import { useEffect } from "react";
import { getSessionDetails } from "../../services/createAxiosClient";

function useViewSession({ setData, session_id }) {
  useEffect(() => {
    if (session_id) {
      sessionDetails({ session_id });
    }
    return () => {};
  }, []);

  async function sessionDetails({ event_id = 19, session_id }) {
    const res = await getSessionDetails({ event_id, session_id });
    if (res?.status === 200 || res?.status === 201) {
      setData(res.data);
    }
  }

  return {};
}

export default useViewSession;
