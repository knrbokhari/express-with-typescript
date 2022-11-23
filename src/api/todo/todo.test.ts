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

let id: string = '';

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

describe('GET /api/v1/todos/:id', () => {
  // it('responds with a single todo', async () =>
  //   request(app)
  //     .get(`/api/v1/todos/${id}`)
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .then((res) => {
  //       expect(res.body).toHaveProperty('_id');
  //       expect(res.body._id).toBe(id);
  //       expect(res.body).toHaveProperty('content');
  //       expect(res.body.content).toBe('Learn TypeScript');
  //       expect(res.body).toHaveProperty('done');
  //     }),
  // );

  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .get('/api/v1/todos/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });

  it('responds with a not found error', (done) => {
    request(app)
      .get('/api/v1/todos/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

describe('PUT /api/v1/todos/:id', () => {
  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .put('/api/v1/todos/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
      .put('/api/v1/todos/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .send({
        content: 'Learn TypeScript',
        done: true,
      })
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
  it('responds with a single todo', async () =>
    request(app)
      .put(`/api/v1/todos/${id}`)
      .set('Accept', 'application/json')
      .send({
        content: 'Learn TypeScript',
        done: true,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body).toHaveProperty('content');
        expect(response.body).toHaveProperty('done');
        expect(response.body.done).toBe(true);
      }),
  );
});

describe('DELETE /api/v1/todos/:id', () => {
  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .delete('/api/v1/todos/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
      .delete('/api/v1/todos/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
  it('responds with a 204 status code', (done) => {
    request(app)
      .delete(`/api/v1/todos/${id}`)
      .expect(204, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
      .get(`/api/v1/todos/${id}`)
      .set('Accept', 'application/json')
      .expect(404, done);
  });
});