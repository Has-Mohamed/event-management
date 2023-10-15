import axios from "axios";
import { json } from "react-router-dom";

const token = `eyJhbGciOiJSUzI1NiJ9.eyJpZCI6MzAzLCJ0eXBlIjoidXNlciIsInJhbiI6IkJORU5WSVBOTlFUWVBMS0tVQ0JWIiwic3RhdHVzIjoxfQ.YGV-jGKZj1Lp4SqlM3aiF6Aov6YVF6lZRMpKvx_Zdrpjj4C1zE-JSTKtjVboQ9de58TUViyVOc4JwiktjF_4yxnYzIrw449s584j2GiqUpxfp6OPmfAj8BAbfN_M4RoU5PXEjhcNVh5uNRtxtvxZtpECrl72_22T4he3LbqISMNHzVh5eprIKIFLt_pM7cyRKt3Njf8I89CLnq5nUpiDHnMMForamKq9jubmiYPOHpFvijEE3-jusRk0F1T32zMY_0AELXnpqhbbx6HtmMdxBahnrUNyznacdVwaSrNus8vX01N8zEcfRvkRzYuqjnZXr9jrm2iriHq80iicUG99GQ`;

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
axios.defaults.headers.common["Accept"] = "application/json";

const mainUrl = "https://qa-testing-backend-293b1363694d.herokuapp.com/api/v3/";

export async function getAllSessions({ event_id, offset, limit }) {
  return await axios
    .get(`${mainUrl}get-sessions?`,{
      params: {
        event_id,
        offset,
        limit,
      },
    })
    .then((res) => res)
    .catch((error) => console.log(error));
}

export async function getSessionDetails({ event_id, session_id }) {
  return await axios
    .get(`${mainUrl}session-details/${session_id}`,{
      params: {
        event_id,
       
      },
    })
    .then((res) => res)
    .catch((error) => console.log(error));
}

export async function searchInUsers({ event_id, search }) {
  return await axios
    .get(`${mainUrl}search-users?`, {
      params: {
        event_id,
        search,
      },
    })
    .then((res) => res)
    .catch((error) => console.log(error));
}
export async function usersWithPagination({ event_id, offset, limit }) {
  return await axios
    .get(`${mainUrl}get-users?`, {
      params: {
        event_id,
        offset,
        limit,
      },
    })
    .then((res) => res)
    .catch((error) => console.log(error));
}
export async function createSession(data) {
  return await axios
    .post(`${mainUrl}create-sessions`, {
      ...data,
    })
    .then((res) => res)
    .catch((error) => console.log(error));
}
export async function createUser(data) {
  return await axios
    .post(`${mainUrl}create-users`, {
      ...data,
    })
    .then((res) => res)
    .catch((error) => error);
}
