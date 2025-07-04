const express = require("express");
const rideRouter = require('./router/ride.router');
const visitorRouter = require('./router/visitor.router');
const ticketRouter = require('./router/ticket.router');
const employeeRouter = require('./router/employee.router');
const maintenanceRouter = require('./router/maintenance.router');
const PORT = 3000;
const app = express();
const VERSIN_URL_01 = '/api';

// parse json object here
app.use(express.json());

// All real path router navigations
app.use(`${VERSIN_URL_01}/rides`, rideRouter );
app.use(`${VERSIN_URL_01}/visitors`, visitorRouter );
app.use(`${VERSIN_URL_01}/tickets`, ticketRouter );
app.use(`${VERSIN_URL_01}/employees`, employeeRouter );
app.use(`${VERSIN_URL_01}/maintenance`, maintenanceRouter );


app.listen(PORT,() => console.log(`Server is running on port  http://localhost:${PORT}`))