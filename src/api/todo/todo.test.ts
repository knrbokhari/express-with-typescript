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
