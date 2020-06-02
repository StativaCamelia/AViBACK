const request = require("supertest");
const router = require("../index");

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
      .set(
        "auth-token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWFjOTBhNjJmZWI4OTI0MmNkOTE5NTIiLCJpYXQiOjE1OTEwMzE0NzJ9.Va8ZbFP_FWUdJHtTu-MgqX6Nh8_oV_Q8-LnRN5XOIgA"
      )
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

describe("PATCH /accidents?accidentId = 5ec65d04607fb826d4b69277", function () {
  let data = {
    State: "HI",
  };
  it("respond with 204 updated", function (done) {
    request(router)
      .patch("/accidents")
      .set(
        "auth-token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWFjOTBhNjJmZWI4OTI0MmNkOTE5NTIiLCJpYXQiOjE1OTEwMzE0NzJ9.Va8ZbFP_FWUdJHtTu-MgqX6Nh8_oV_Q8-LnRN5XOIgA"
      )
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(204)
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
