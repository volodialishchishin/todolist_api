import request from 'supertest';
import { App } from '../app';
import { boot } from '../server';

let application: App;

beforeAll(async () => {
  const { app } = await boot;
  application = app;
});

describe('Users integration', () => {
  it('Login - success', async () => {
    const res = await request(application.app)
      .post('/login')
      .send({ name: '1338243123233', password: 'Volodia0?553' });
    expect(res.statusCode).toBe(200);
  });

  it('Register - error', async () => {
    const res = await request(application.app)
      .post('/register')
      .send({ name: '31233213', password: 'VOlodia0502023?' });
    expect(res.statusCode).toBe(403);
  });

  it('Register - success', async () => {
    const res = await request(application.app)
      .post('/register')

      .send({ name: '31233213333', password: 'VOlodia0502023?' });
    expect(res.statusCode).toBe(200);
  });

  it('Login - error', async () => {
    const res = await request(application.app)
      .post('/login')
      .send({ name: '1338243123', password: 'Volodia0' });
    expect(res.statusCode).toBe(403);
  });
});

afterAll(() => {
  application.close();
});
