/* const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
}; */

const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        console.log(error)
        res.status(500).send({ error });
    }
}

const createNewEmployee = async (req, res) => {
    const newEmployee = await Employee.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });

    if (!newEmployee.firstname || !newEmployee.lastname) {
        res.status(400).json({ 'status': false, 'error_message': 'First and last name are required' });
    }

    res.status(201).json(newEmployee);
}

const updateEmployee = async (req, res) => {
    const employee = await Employee.findById(req.body.id);
    console.log(employee);
    if (!employee) {
        res.status(404).json({ 'status': false, 'error_message': `Employee with Id: ${req.body.id} not found` });
    }

    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;
    employee.save();
    res.json(employee);
}

const deleteEmployee = async (req, res) => {
    const id = req.body.id;
    const result = await Employee.findByIdAndDelete(id);
    if (!result) {
        res.status(404).json({ 'status': false, 'error_message': `Employee Id: ${req.body.id} not found` });
    }
    res.send({ status: true, message: `Employee deleted successfully`});
}

const getEmployee = async (req, res) => {
    const id = req.body.id;
    const employee = await Employee.findById(id);
    if (!employee) {
        res.status(404).json({ 'status': false, 'error_message': `Employee Id: ${req.params.id} not found` });
    }

    res.send(employee);
}

module.exports = { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee };