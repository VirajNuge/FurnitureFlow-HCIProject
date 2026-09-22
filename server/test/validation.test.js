const test = require('node:test');
const assert = require('node:assert/strict');
const { validateRegister, validateLogin } = require('../middleware/validateAuth');

const runMiddleware = (middleware, body) => new Promise((resolve) => {
  const response = {
    statusCode: 200,
    status(code) { this.statusCode = code; return this; },
    json(payload) { resolve({ statusCode: this.statusCode, payload }); },
  };
  middleware({ body }, response, () => resolve({ statusCode: 200 }));
});

test('registration validation rejects short and malformed credentials', async () => {
  const result = await runMiddleware(validateRegister, { name: 'A', email: 'invalid', password: '123' });
  assert.equal(result.statusCode, 400);
  assert.equal(result.payload.errors.length, 3);
});

test('registration validation accepts valid credentials', async () => {
  const result = await runMiddleware(validateRegister, { name: 'Alice', email: 'alice@example.com', password: 'secret1' });
  assert.equal(result.statusCode, 200);
});

test('login validation requires both fields', async () => {
  const result = await runMiddleware(validateLogin, { email: '', password: '' });
  assert.equal(result.statusCode, 400);
});
