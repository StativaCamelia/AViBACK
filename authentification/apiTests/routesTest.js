const request = require("supertest");
const router = require("../index");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWUxNGRkY2RkZTZlMjNhMDQ5NmJkMDAiLCJpYXQiOjE1OTE4NzA1ODJ9.jbJbC99Lk_y7ZJiyH1s7TUii4-xO7mOk0ydLB7OwCXQ";
userId = "5ed277c10138791960261824";
let userData = {
  email: "test@gmail.com",
  username: "teste",
  password: "abc123",
};

describe("GET /users", function () {
  it("respond with json containing a list of all users", function (done) {
    request(router)
      .get("/users")
      .set("Accept", "application/json")
      .set("auth-token", token)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("GET users/general", function () {
  it("general data about users", function (done) {
    request(router)
      .get("/users/general")
      .set("Accept", "application/json")
      .set("auth-token", token)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe(`GET /users/${userId}`, function () {
  it("respond with json containing a list of all users", function (done) {
    request(router)
      .get(`/users/${userId}`)
      .set("Accept", "application/json")
      .set("auth-token", token)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe(`GET /users/authorization?token=${token}`, function () {
  it("respond with json containg authorization for a resourse", function (done) {
    request(router)
      .get(`/users/authorization?token=${token}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe(`PUT /users/${userId}`, function () {
  let data = {
    email: "stativa1999@gmail.com",
  };
  it("respond with 200 updated", function (done) {
    request(router)
      .put(`/users/${userId}`)
      .set("auth-token", token)
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe(`DELETE /users/${userId}`, function () {
  it("respond with 204 deleted", function (done) {
    request(router)
      .delete(`/users/${userId}`)
      .set("auth-token", token)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
