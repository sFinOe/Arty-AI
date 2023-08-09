import request from "superagent";

const jwtToken = localStorage.getItem("jwtToken");

export const UploadImage = (file) => {
  const data = new FormData();
  data.append("file", file);

  return request
    .post("/api/v1/files/upload")
    .set("Authorization", `Bearer ${jwtToken}`)
    .send(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const SignedUrl = (data) => {
  return request
    .post("/api/v1/files/signed-url")
    .set("Authorization", `Bearer ${jwtToken}`)
    .send(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
