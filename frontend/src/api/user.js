import request from "superagent";

const jwtToken = localStorage.getItem("jwtToken");

export const PostAddLikes = (data) => {
  return request
    .post("/api/v1/user/add-like")
    .set("Authorization", `Bearer ${jwtToken}`)
    .send(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const GetLikes = () => {
  return request
    .get("/api/v1/user/likes")
    .set("Authorization", `Bearer ${jwtToken}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const DeleteUser = (data) => {
  return request
    .post("/api/v1/user/deleteUser")
    .set("Authorization", `Bearer ${jwtToken}`)
    .send(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
