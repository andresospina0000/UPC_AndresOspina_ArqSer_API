const employees = require('./employees');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/employees', (req, res) => {

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
});

app.get('/api/employees/oldest', (req, res) => {
    const oldest = employees.reduce((prev, current) => {
        return (prev.age > current.age) ? prev : current
    });

    res.send(oldest);
});

app.get('/api/employees/:NAME', (req, res) => {
    console.log('NAME: ', req.params.NAME);
    const employeesCopy = Array.from(employees)

    const employee = employeesCopy.find(employee => {
        return employee.name.toString().toLowerCase() == req.params.NAME.toLowerCase()
    });

    if (!employee) {
        res.status(404).send({ "code": "not_found" });
        return;
    }

    res.send(employee);
});

app.post('/api/employees', (req, res) => {
    const employee = req.body;
    console.log('employee: ', employee);
    res.status(201).send(employee);
});

app.listen(8000,
    () => console.log('Server running on port 8000')
);