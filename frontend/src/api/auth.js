import request from "superagent";

const jwtToken = localStorage.getItem("jwtToken");

export const PostRegister = (user) => {
  return request
    .post("/api/v1/auth/email/register")
    .send(user)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const PostLogin = (user) => {
  return request
    .post("/api/v1/auth/email/login")
    .send(user)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const PostAdminLogin = (user) => {
  return request
    .post("/api/v1/auth/admin/email/login")
    .send(user)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const GetAuthMe = () => {
  return request
    .get("/api/v1/auth/me")
    .set("Authorization", `Bearer ${jwtToken}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const GetUserSettings = () => {
  return request
    .get("/api/v1/user/settings")
    .set("Authorization", `Bearer ${jwtToken}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const PostChangePassword = (data) => {
  return request
    .post("/api/v1/user/changePassword")
    .set("Authorization", `Bearer ${jwtToken}`)
    .send(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const PostChangeSettings = (data) => {
  return request
    .post("/api/v1/user/changeSettings")
    .set("Authorization", `Bearer ${jwtToken}`)
    .send(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const PostLoginGuest = (user) => {
  return request
    .post("/api/v1/guest-auth/login")
    .send(user)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const PostEmailConfirmation = (data) => {
  return request
    .post("/api/v1/auth/email/confirm")
    .send(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
