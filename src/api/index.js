import { get, post } from "@/utils/ajax";

export const buttonData = data => {
  //query = JSON.parse(JSON.stringify(query));
  return get("/static/button.json", data);
};

export const login = data => {
  //query = JSON.parse(JSON.stringify(query));
  return post("/login", data);
};
export const getUserList = data => {
  return get("/user/list", data);
};
export const searchGlobal = data => {
  console.log("API " + data);
  return get("/user/getTest", data);
};

export const searchAdd = data => {
  return post("/user/postTest", data);
};
