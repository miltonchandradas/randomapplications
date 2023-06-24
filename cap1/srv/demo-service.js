const cds = require("@sap/cds");
const { v4: uuidv4 } = require("uuid");

module.exports = async (srv) => {
  const { Employees, Departments } = srv.entities;

  srv.on("error", (err, req) => {
    switch (err.message) {
      case "UNIQUE_CONSTRAINT_VIOLATION":
      case "ENTITY_ALREADY_EXISTS":
        err.message =
          "The entry already exists...  For example, an Employee can have only one active Job Action";
        break;

      default:
        err.message =
          "Server Internal Error.  Technical error message: " + err.message;
        break;
    }
  });
};
