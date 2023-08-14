const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

test('Obtener empleado por nombre existente', async () => {
    const res = await request.get('/api/employees/Sue');
});