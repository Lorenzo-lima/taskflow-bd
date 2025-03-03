import request from 'supertest';
import app from '../app';

describe('Auth API', () => {
  it('deve registrar um usuário com dados válidos', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ username: 'testuser', email: 'test@example.com', password: '123456', confirm_password: '123456' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('deve falhar ao registrar com email inválido', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ username: 'testuser', email: 'invalid', password: '123456' });
    expect(response.status).toBe(400);
  });
});