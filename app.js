const employees = require('./employees');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/employees', (req, res) => {

    const page = req.query?.page;

    if (page == 1) {
        var result = employees.slice(0, 2);
        res.send(result);
        return;
    }

    if (page == 2) {
        var result = employees.slice(2, 5);
        res.send(result);
        return;
    }

    res.send(employees);
    return;
});

app.listen(8000,
    () => console.log('Server running on port 8000')
);