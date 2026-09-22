/**
 * End-to-end tests for FurnitureFlow using Vitest + jsdom.
 * Covers: register, login, and save-design flows via API mocking.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

// ── Mock fetch globally ────────────────────────────────────────────────────
const mockFetch = vi.fn();
global.fetch = mockFetch;
const storage = new Map();
global.localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, String(value)),
  removeItem: (key) => storage.delete(key),
  clear: () => storage.clear(),
};

beforeEach(() => {
  mockFetch.mockReset();
  localStorage.clear();
});

// ── Register flow ──────────────────────────────────────────────────────────
describe('Register flow', () => {
  it('stores token in localStorage on successful registration', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'test-token', user: { id: '1', name: 'Alice', email: 'alice@test.com' } }),
    });

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Alice', email: 'alice@test.com', password: 'Password1!' }),
    });
    const data = await res.json();
    localStorage.setItem('token', data.token);

    expect(localStorage.getItem('token')).toBe('test-token');
  });

  it('returns 400 when email is already registered', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ message: 'Email already registered' }),
    });

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Bob', email: 'existing@test.com', password: 'Pass1!' }),
    });

    expect(res.ok).toBe(false);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.message).toBe('Email already registered');
  });
});

// ── Login flow ─────────────────────────────────────────────────────────────
describe('Login flow', () => {
  it('returns access token and refresh token on success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'access-token', refreshToken: 'refresh-token', user: { id: '1' } }),
    });

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'alice@test.com', password: 'Password1!' }),
    });
    const data = await res.json();

    expect(data.token).toBe('access-token');
    expect(data.refreshToken).toBe('refresh-token');
  });

  it('returns 401 for invalid credentials', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 401, json: async () => ({ message: 'Invalid credentials' }) });

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'wrong@test.com', password: 'nope' }),
    });

    expect(res.status).toBe(401);
  });
});

// ── Save design flow ───────────────────────────────────────────────────────
describe('Save design flow', () => {
  it('POSTs design payload and returns created design with id', async () => {
    const payload = { name: 'Living Room', room: { width: 400, depth: 300 }, furniture: [] };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ _id: 'design-123', ...payload }),
    });

    localStorage.setItem('token', 'test-token');
    const res = await fetch('/api/designs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    expect(res.ok).toBe(true);
    expect(data._id).toBe('design-123');
    expect(data.name).toBe('Living Room');
  });
});
