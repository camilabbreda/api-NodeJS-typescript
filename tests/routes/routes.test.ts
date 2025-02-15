import app from '../../src/server';
import { Server } from 'http';
import request from 'supertest';
import { iUser } from '../../src/common/interface/entity-pg-user';

let server: Server;
let id: string | undefined = undefined;
let token: string | undefined = undefined;

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
    username: 'julianadasilvajohness',
    firstname: 'Juliana',
    lastname: 'silva Johness',
    email: 'julianadasilvajohness@example.com',
    password: 'password123',
  };

  it('Sould test user register', async () => {
    const response = await request(app)
      .post('/register')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(201);
    id = response.body.response.id;
    expect(response.body.response.id).not.toBeNull();
    expect(response.body.response.id).toBeDefined();
    expect(response.body.response.firstname).toBe(
      data.firstname?.toLowerCase()
    );
    expect(response.body.response.lastname).toBe(data.lastname?.toLowerCase());
    expect(response.body.response.username).toBe(data.username?.toLowerCase());
    expect(response.body.response.email).toBe(data.email?.toLowerCase());
  });
  
  it('Sould test user login', async () => {
    const response = await request(app)
      .post('/login')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200);
    token = response.body.response.token;

    expect(response.body.response.token).not.toBeNull();
    expect(response.body.response.token).toBeDefined();
  });
});

describe('Should test the PUT app routes', () => {
  it.each([
    ['username', { username: 'josepaulofontes' }],
    ['firstname', { firstname: 'jose paulo' }],
    ['lasttname', { lastname: 'fontes' }],
    ['email', { email: 'jose.paulo@gmail.com' }],
    ['password', { password: '123@sjsld#' }],
  ])('Sould update column %s', async (key, param) => {
    await request(app)
      .put(`/register/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(param)
      .expect(204);
  });
});

describe('Should test the DELETE app routes', () => {
  it('Sould test user delete', async () => {
    const response = await request(app)
      .delete(`/register/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body.response).toBe('User was successfully deleted.');
  });
});
