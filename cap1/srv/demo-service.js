const cds = require("@sap/cds");
const { v4: uuidv4 } = require("uuid");

module.exports = async (srv) => {
  const { Employees, Departments } = srv.entities;

  srv.on("EmployeeOperations", async (req) => {
    const { payload, operation } = req.data;

    let response;

    switch (operation) {
      case "I": {
        let employee = JSON.parse(payload);
        employee.ID = uuidv4();
        response = await INSERT.into(Employees).entries(employee);

        break;
      }

      case "U": {
        let employee = JSON.parse(payload);
        const { ID, firstName } = employee;
        await UPDATE(Employees).with({ firstName }).where({ ID });

        response = await SELECT.one(Employees).where({ ID });

        break;
      }

      case "D": {
        let employee = JSON.parse(payload);
        const { ID } = employee;
        await DELETE(Employees).where({ ID });

        response = null;

        break;
      }

      default:
        break;
    }

    return response;
  });

  srv.on("error", (err, req) => {
    switch (err.message) {
      case "UNIQUE_CONSTRAINT_VIOLATION":
      case "ENTITY_ALREADY_EXISTS":
        err.message =
          "The entry already exists...  For example, an Employee with the same first name and last name already exists";
        break;

      default:
        err.message =
          "Server Internal Error.  Technical error message: " + err.message;
        break;
    }
  });
};
