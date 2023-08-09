using {demo} from '../db/schema';

@path : 'service/demo'
service DemoService {

    entity Departments as select from demo.Departments;

    entity Employees as select from demo.Employees;

    entity Events as select from demo.Events;

    function EmployeeOperations(payload: String, operation: String) returns Employees;
}
