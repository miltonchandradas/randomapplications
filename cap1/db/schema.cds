namespace demo;

using {cuid} from '@sap/cds/common';

@assert.unique: {name: [
    firstName,
    lastName
]}
entity Employees : cuid {
    firstName  : String @mandatory;
    lastName   : String @mandatory;
    email      : String @mandatory;
    department : Association to Departments;
}

@assert.unique: {name: [name]}
entity Departments : cuid {
    name      : String;
    employees : Association to many Employees
                    on employees.department = $self;
}
