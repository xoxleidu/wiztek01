import ajax from "@/utils/ajax";

export const login = query => {
  //query = JSON.parse(JSON.stringify(query));
  return ajax.post("/login", query);
};

export const getUserList = query => {
  return ajax.get("/user/list", {params:query});
};

export const getUser = id => {
  return ajax.get("/user/id", {params:id});
};

export const addUser = data => {
  return ajax.post("/user/add", data);
};

export const editUser = data => {
  return ajax.post("/user/edit", data);
};

export const deleteUser = id => {
  return ajax.post("/user/del", {id:id});
};

export const deleteAllUser = ids => {
  return ajax.post("/user/del-all", {ids:ids});
};

export const statusUser = data => {
  console.log(data)
  return ajax.post("/user/status", data);
};

export const editPass = data => {
  return ajax.post("/user/password", data);
};