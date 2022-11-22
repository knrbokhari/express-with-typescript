/* eslint-disable @typescript-eslint/quotes */
import request from "supertest";

import app from "../../app";

describe("GET /api/v1/todo", () => {
  it("responds with an array of todos", async () => {
    await request(app)
      .get("/api/v1/todo")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("length");
        expect(res.body.length).toBeGreaterThanOrEqual(0);
      });
  });
});


describe("POST /api/v1/todo", () => {
  it("responds with an error if the todo is invalid", async () => {
    await request(app)
      .post("/api/v1/todo")
      .set("Accept", "application/json")
      .send({
        content: '',
      })
      .expect("Content-Type", /json/)
      .expect(422)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
      });
  });
});

describe("POST /api/v1/todo", () => {
  it("responds with an inserted object", async () => {
    await request(app)
      .post("/api/v1/todo")
      .set("Accept", "application/json")
      .send({
        content: 'Learn TypeScript',
        done: false,
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty("content");
        expect(res.body).toHaveProperty("_id");
        expect(res.body).toHaveProperty("done");
      });
  });
});