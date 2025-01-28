import app from '../../src/server';
import { Server } from 'http';
import request from 'supertest';
import { iUser } from '../../src/common/interface/entity-pg-user';

let server: Server;

beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  if (server) {
    server.close();
  }
});

describe('Should test the POST app routes', () => {
  const data: iUser = {
    username: 'jacudo',
    firstname: 'John',
    lastname: 'Doe',
    email: 'johndoe156293@example.com',
    password: 'password123',
  };

  it('Sould test user register', async () => {
    const response = await request(app)
      .post('/register')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(201);
    console.log('res', response);
    expect(response.body.response.id).not.toBeNull();
    expect(response.body.response.id).toBeDefined();
    expect(response.body.response.firstname).toBe(data.firstname?.toLowerCase());
    expect(response.body.response.lastname).toBe(data.lastname?.toLowerCase());
    expect(response.body.response.username).toBe(data.username?.toLowerCase());
    expect(response.body.response.email).toBe(data.email?.toLowerCase());
  });
});
