import request from 'supertest';
import app from '../app';

describe('GET /locations/:zip', () => {

  /* =============================
     ✅ Default Behavior
  ============================== */

  it('should return temperature in Fahrenheit by default', async () => {
    const res = await request(app).get('/locations/24060');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('temperature');
    expect(typeof res.body.temperature).toBe('number');
    expect(res.body.scale).toBe('Fahrenheit');
  });

  it('should default to Fahrenheit when scale is empty', async () => {
    const res = await request(app).get('/locations/24060?scale=');

    expect(res.status).toBe(200);
    expect(res.body.scale).toBe('Fahrenheit');
  });

  /* =============================
     🌡 Scale Handling
  ============================== */

  it('should return temperature in Celsius when requested', async () => {
    const res = await request(app).get('/locations/24060?scale=Celsius');

    expect(res.status).toBe(200);
    expect(res.body.scale).toBe('Celsius');
    expect(typeof res.body.temperature).toBe('number');
  });

  it('should return Fahrenheit when explicitly requested', async () => {
    const res = await request(app).get('/locations/24060?scale=Fahrenheit');

    expect(res.status).toBe(200);
    expect(res.body.scale).toBe('Fahrenheit');
  });

  it('should return 400 for unsupported scale', async () => {
    const res = await request(app).get('/locations/24060?scale=Kelvin');

    expect(res.status).toBe(400);
  });

  /* =============================
     ❌ ZIP Validation
  ============================== */

  it('should return 400 for non-numeric zip', async () => {
    const res = await request(app).get('/locations/abc');
    expect(res.status).toBe(400);
  });

  it('should return 400 for zip that is too short', async () => {
    const res = await request(app).get('/locations/123');
    expect(res.status).toBe(400);
  });

  it('should return 400 for zip that is too long', async () => {
    const res = await request(app).get('/locations/123456');
    expect(res.status).toBe(400);
  });

  /* =============================
     🧱 Response Structure
  ============================== */

  it('should return only temperature and scale properties', async () => {
    const res = await request(app).get('/locations/24060');

    const keys = Object.keys(res.body).sort();
    expect(keys).toEqual(['scale', 'temperature'].sort());
  });

  it('should return application/json content type', async () => {
    const res = await request(app).get('/locations/24060');
    expect(res.headers['content-type']).toMatch(/application\/json/);
  });

  it('should return temperature within realistic bounds', async () => {
    const res = await request(app).get('/locations/24060');

    expect(res.body.temperature).toBeGreaterThan(-100);
    expect(res.body.temperature).toBeLessThan(150);
  });

  /* =============================
     🔄 Conversion Correctness
  ============================== */

  it('should correctly convert Fahrenheit to Celsius', async () => {
    const fRes = await request(app).get('/locations/24060?scale=Fahrenheit');
    const cRes = await request(app).get('/locations/24060?scale=Celsius');

    const f = fRes.body.temperature;
    const c = cRes.body.temperature;

    const expectedC = Math.round((f - 32) * 5 / 9);

    expect(c).toBe(expectedC);
  });

  /* =============================
     ⚡ Concurrency
  ============================== */

  it('should handle multiple concurrent requests', async () => {
    const requests = Array.from({ length: 20 }, () =>
      request(app).get('/locations/24060')
    );

    const responses = await Promise.all(requests);

    responses.forEach(res => {
      expect(res.status).toBe(200);
    });
  });

});