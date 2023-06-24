namespace demo;

using {cuid} from '@sap/cds/common';

entity Employees : cuid {
    firstName  : String;
    lastName   : String;
    email      : String;
    department : Association to Departments;
}


@assert.unique: {name: [name]}
entity Departments : cuid {
    name      : String;
    employees : Association to many Employees
                    on employees.department = $self;
}
