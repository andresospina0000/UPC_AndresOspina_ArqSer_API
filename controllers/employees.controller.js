const employees = require('../employees.json');

var Validator = require('jsonschema').Validator;
var v = new Validator();

module.exports.list = (req, res, next) => {

    const queryParams = req.query;

    if (!queryParams) {
        res.send(employees);
        return;
    }

    if (queryParams.page == 1) {
        var result = employees.slice(0, 2);
        res.send(result);
        return;
    } else if (queryParams.page == 2) {
        var result = employees.slice(2, 4);
        res.send(result);
        return;
    } else if (queryParams.page > 2) {
        console.log('page > 2');
        const from = 2 * (queryParams.page - 1);
        const to = (2 * (queryParams.page - 1)) + 1;
        var result = employees.slice(from, to);
        res.send(result);
        return;
    }

    if (queryParams.user == 'true') {
        const employeesCopy = Array.from(employees)
        const onlyUsers = employeesCopy.filter(employee => {
            return employee.privileges == 'user'
        });

        res.send(onlyUsers);
        return;
    }

    if (queryParams.badges == 'black') {
        const employeesCopy = Array.from(employees)
        const blackBadges = employeesCopy.filter(employee => {
            const employeeBadges = Array.from(employee.badges);
            return employeeBadges.includes(queryParams.badges)
        });

        res.send(blackBadges);
        return;
    }

    res.send(employees);
    return;
}

module.exports.oldest = (req, res, next) => {
    const oldest = employees.reduce((prev, current) => {
        return (prev.age > current.age) ? prev : current
    });

    res.send(oldest);
}

// module.exports.getByName = (req, res, next) => {
//     console.log('NAME: ', req.params.NAME);
//     const employeesCopy = Array.from(employees)

//     const employee = employeesCopy.find(employee => {
//         return employee.name.toString().toLowerCase() == req.params.NAME.toLowerCase()
//     });

//     if (!employee) {
//         res.status(404).send({ "code": "not_found" });
//         return;
//     }

//     res.send(employee);
//     return;
// }

module.exports.create = (req, res, next) => {

    const newEmployee = req.body;

    //Creamos el schema de acuerdo a las propiedades del objeto employee. Todas las propiedades son requeridas.
    var employeeSchema = {
        "id": "/EmployeeSchema",
        "type": "object",
        "properties": {
            "name": { "type": "string" },
            "age": { "type": "integer", "minimum": 0 },
            "phone": {
                "type": "object",
                "properties": {
                    "personal": { "type": "string" },
                    "work": { "type": "string" },
                    "ext": { "type": "string" }
                },
                "required": ["personal", "work", "ext"]
            },
            "privileges": { "type": "string" },
            "favorites": {
                "type": "object",
                "properties": {
                    "artist": { "type": "string" },
                    "food": { "type": "string" },
                },
                "required": ["artist", "food"]
            },
            "finished": {
                "type": "array",
                "items": { "type": "integer", "minimum": 1 }
            },
            "badges": {
                "type": "array",
                "items": { "type": "string" }
            },
            "points": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "points": { "type": "integer", "minimum": 1 },
                        "bonus": { "type": "integer", "minimum": 1 }
                    },
                    required: ["points", "bonus"]
                }
            }
        },
        "required": ["name", "age", "phone", "privileges", "favorites", "finished", "badges", "points"]
    };

    v.addSchema(employeeSchema, '/EmployeeSchema');
    const schemaValidation = v.validate(newEmployee, employeeSchema);
    const validSdchema = schemaValidation.valid;

    if (!validSdchema) {
        res.status(400).send({ "code": "bad_request", "message": schemaValidation.errors });
        return;
    }

    employees.push(newEmployee);

    res.status(201).send(newEmployee);
}