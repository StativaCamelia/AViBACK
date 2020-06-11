const request = require("supertest");
const router = require("../index");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWUxNGRkY2RkZTZlMjNhMDQ5NmJkMDAiLCJpYXQiOjE1OTE4NzA1ODJ9.jbJbC99Lk_y7ZJiyH1s7TUii4-xO7mOk0ydLB7OwCXQ";
describe("GET /accidents", function () {
  it("respond with json containing a list of all accidents", function (done) {
    request(router)
      .get("/accidents")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("POST /accidents", function () {
  let data = {
    State: "OH",
  };
  it("respond with 201 created", function (done) {
    request(router)
      .post("/accidents")
      .set("auth-token", token)
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe("GET /accidents/5ecf9cca18d29a0ba86a9f07", function () {
  it("respond with 200 updated", function (done) {
    request(router)
      .get("/accidents")
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

describe("PUT /accidents/5ecf9cca18d29a0ba86a9f07", function () {
  let data = {
    State: "HI",
  };
  it("respond with 200 updated", function (done) {
    request(router)
      .put("/accidents/5ecf9cca18d29a0ba86a9f07")
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

describe("GET /accidents?Type=pie&State=CA", function () {
  it("respond with json containing a list of accidents with state OH", function (done) {
    request(router)
      .get("/accidents")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("GET /accidents/byDetails", function () {
  it("respond with json containing a list of random accidents descriptions", function (done) {
    request(router)
      .get("/accidents/byDetails")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
