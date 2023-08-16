const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

test('/employees/:NAME - Consultar empleado por nombre existente', async () => {
    const res = await request.get('/api/employees/Sue');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('privileges');
    expect(res.body.age).toBeGreaterThanOrEqual(18);
});

test('/employees/:NAME - Consultar empleado por nombre NO existente - No encontrado', async () => {
    const res = await request.get('/api/employees/Andres');

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('code', 'not_found');
    expect(res.body.name).toBeUndefined();
});

test('/employees/oldest - Consultar el empleado mas viejo', async () => {
    const res = await request.get('/api/employees/oldest');

    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty('name', 'Martin');
});

test('/api/employees?user=true - Consultar empleados con privilegios = user', async () => {
    const res = await request.get('/api/employees?user=true');

    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(4);
});

test('POST /api/employees - Crear un nuevo empleado', async () => {
    const res = await request.post('/api/employees')
        .send({
            "name": "Andres",
            "age": 43,
            "phone": {
                "personal": "555-123-123",
                "work": "555-456-456",
                "ext": "5623"
            },
            "privileges": "user",
            "favorites": {
                "food": "pizza",
                "artist": "Picasso"
            },
            "finished": [
                18,
                12
            ],
            "badges": [
                "black",
                "blue"
            ],
            "points": [
                {
                    "points": 78,
                    "bonus": 8
                },
                {
                    "points": 57,
                    "bonus": 7
                }
            ]
        });

    const expectedEmployee = {
        "name": "Andres",
        "age": 43,
        "phone": {
            "personal": "555-123-123",
            "work": "555-456-456",
            "ext": "5623"
        },
        "privileges": "user",
        "favorites": {
            "food": "pizza",
            "artist": "Picasso"
        },
        "finished": [
            18,
            12
        ],
        "badges": [
            "black",
            "blue"
        ],
        "points": [
            {
                "points": 78,
                "bonus": 8
            },
            {
                "points": 57,
                "bonus": 7
            }
        ]
    };

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('name', 'Andres');
    expect(res.body).toMatchObject(expectedEmployee);
});

test('POST /api/employees - Crear un nuevo empleado - Error de validacion', async () => {
    const res = await request.post('/api/employees')
        .send({
            "name": "Andres",
            "age": 17
        });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('code', 'bad_request');
    expect(res.body).toHaveProperty('message');
});