namespace demo;

using {cuid} from '@sap/cds/common';

@assert.unique: {name: [
    firstName,
    lastName
]}
entity Employees : cuid {
    firstName  : String not null;
    lastName   : String not null;
    email      : String not null;
    department : Association to Departments;
}

@assert.unique: {name: [name]}
entity Departments : cuid {
    name      : String;
    employees : Association to many Employees
                    on employees.department = $self;
}
