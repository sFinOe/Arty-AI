import request from "superagent";

const jwtToken = localStorage.getItem("jwtToken");
const guestJwtToken = localStorage.getItem("GuestJwt");

export const PostFilter = (data) => {
  let authToken = jwtToken ? `Bearer ${jwtToken}` : `Bearer ${guestJwtToken}`;
  return request
    .post("/api/v1/files/filter")
    .set("Authorization", authToken)
    .send(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const PostArtWall = (data) => {
  let authToken = jwtToken ? `Bearer ${jwtToken}` : `Bearer ${guestJwtToken}`;
  return request
    .post("/api/v1/files/art-wall")
    .set("Authorization", authToken)
    .send(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
