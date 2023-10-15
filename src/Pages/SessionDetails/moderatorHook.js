import { useEffect, useState } from "react";
import {
  searchInUsers,
  usersWithPagination,
} from "../../services/createAxiosClient";

let timeoutId = null;
function useModeratorsHook() {
  const [moderators, setModerators] = useState({ users: [] });

  useEffect(() => {
    
    getModeratorsWithPagination({})
    return () => {
      
    }
  }, [])
  
 async function getModeratorsWithPagination  ({
    event_id = 19,
    offset = 0,
    limit = 5,
    newList = false,
  }){
    const res = await usersWithPagination({ event_id, offset, limit });
    if (res?.status === 200 || res?.status === 201) {
      const users = [...moderators.users, ...res.data.users];
      const data = newList ? res.data : { ...res.data, users };
      setModerators(data);
    }
  };
  

  const getModeratorsWithSearch = async ({ event_id = 19, search }) => {
    const res = await searchInUsers({ event_id, search });
    if (res.status === 200 || res?.status === 201) {
      const data = res.data;
      setModerators(data);
    }
  };

  const resetList = ()=>  getModeratorsWithPagination({ newList: true });
  const searchHandler = (value) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (value) {
        getModeratorsWithSearch({ search: value });
      } else {
        resetList()
      }
    }, 300);
  };

  const loadMore = () => {
    getModeratorsWithPagination({ offset: moderators.number });
  };
  //   onChange,
  //   value,

  //   options,
  //   hasMoreItem,
  //   searchHandler,
  //   loadMore,
  return {
    loadMore,
    searchHandler,
    options: moderators.users,
    hasMoreItem: !moderators?.is_last_offset ,
    resetList
  };
}

export default useModeratorsHook;
