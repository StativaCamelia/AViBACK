const request = require("supertest");
const router = require("../index");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWQ2NTdiOTM1MTY4ZTE5NjgwNDE2MDkiLCJpYXQiOjE1OTExMDU1MjJ9.OIUA8ToDjS7AFpcF7l6DcRia3hfPYxEUozHr2QTuyjE";
userId = "5ed666f034703128206b0c35";
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

describe(`GET /users?userId=${userId}`, function () {
  it("respond with json containing a list of all users", function (done) {
    request(router)
      .get(`/users?userId=${userId}`)
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

describe(`PATCH /users?userId = ${userId}`, function () {
  let data = {
    email: "stativa1999@gmail.com",
  };
  it("respond with 200 updated", function (done) {
    request(router)
      .patch(`/users?userId = ${userId}`)
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

describe(`DELETE /users?userId = ${userId}`, function () {
  it("respond with 204 deleted", function (done) {
    request(router)
      .patch(`/users?userId = ${userId}`)
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
