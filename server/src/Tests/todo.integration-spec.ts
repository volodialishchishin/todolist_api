import request from 'supertest';
import { App } from '../app';
import { boot } from '../server';

let application: App;

beforeAll(async () => {
  const { app } = await boot;
  application = app;
});

describe('Todo integration', () => {
  it('Todo - get No todo', async () => {
    const res = await request(application.app).get('/todolists').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.NDQ.V0EZvi93Fq0Q7HGGjEkBZ5ZFOORcCjyqU-kf7TOxaXI');
    expect(res.statusCode).toBe(420);
  });

  it('Todo - get Invalid token', async () => {
    const res = await request(application.app).get('/todolists').set('Authorization', 'Bearer eyJhbGciOzI1NiJ9.Mzg.vxK2vxhXOPE3tscERvjR5QVM6juhf_V8pUiNNK0TtlQ');
    expect(res.statusCode).toBe(500);
  });

  it('Todo - get Valid', async () => {
    const res = await request(application.app).get('/todolists').set('Authorization', 'Bearer eyJhbGciOzI1NiJ9.Mzg.vxK2vxhXOPE3tscERvjR5QVM6juhf_V8pUiNNK0TtlQ');
    expect(res.statusCode).toBe(500);
  });

  it('Todo - post Valid', async () => {
    const res = await request(application.app).post('/todolists').send({ title: 'Lofsdf' });
    expect(res.statusCode).toBe(201);
  });

  it('Todo - post Invalid', async () => {
    const res = await request(application.app).post('/todolists').send({ title: '' });
    expect(res.statusCode).toBe(421);
  });

  it('Todo - delete Invalid', async () => {
    const res = await request(application.app).delete('/todolists/106');
    expect(res.statusCode).toBe(200);
  });

  afterAll(() => {
    application.close();
  });
});
