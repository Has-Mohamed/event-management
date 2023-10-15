import { useEffect, useState } from "react";
import {
  searchInUsers,
  usersWithPagination,
} from "../../services/createAxiosClient";

let timeoutId = null;
function useSpeakersHook() {
  const [speakers, setSpeakers] = useState({ users: [] });

  useEffect(() => {
    
    getSpeakersWithPagination({})
    return () => {
      
    }
  }, [])
  
 async function getSpeakersWithPagination  ({
    event_id = 19,
    offset = 0,
    limit = 5,
    newList = false,
  }){
    const res = await usersWithPagination({ event_id, offset, limit });
    if (res?.status === 200 || res?.status === 201) {
      const users = [...speakers.users, ...res.data.users];
      const data = newList ? res.data : { ...res.data, users };
      setSpeakers(data);
    }
  };
  

  const getSpeakersWithSearch = async ({ event_id = 19, search }) => {
    const res = await searchInUsers({ event_id, search });
    if (res.status === 200 || res?.status === 201) {
      const data = res.data;
      setSpeakers(data);
    }
  };

  const resetList = ()=>  getSpeakersWithPagination({ newList: true });
  const searchHandler = (value) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (value) {
        getSpeakersWithSearch({ search: value });
      } else {
        resetList()
      }
    }, 300);
  };

  const loadMore = () => {
    getSpeakersWithPagination({ offset: speakers.number });
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
    options: speakers.users,
    hasMoreItem: !speakers?.is_last_offset ,
    resetList
  };
}

export default useSpeakersHook;
