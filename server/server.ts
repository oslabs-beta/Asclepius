import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import { Router } from "express";

const app: Application = express();

const dataRouter: Router = require("./routes/dataRouter");
const azRouter: Router = require("./routes/azRouter");
const awsRouter: Router = require("./routes/awsRouter");

const PORT: number = 3000;

// Parse JSON incoming
app.use(express.json());

// Accept requests from any domain - to be updated
app.use(cors({ origin: "*" }));

// Serve static files and the index.html file
app.use("/", express.static(path.join(__dirname, "../client")));
app.get("/", function (req: Request, res: Response) {
  res.sendFile(path.resolve(__dirname, "../client/index.html"));
});

// Routers
app.use("/getData", dataRouter);
app.use("/azlogin", azRouter);
app.use("/awslogin", awsRouter);

// Serve 404 error to all other unknown routes
app.use("*", (req: Request, res: Response) =>
  res.status(404).send("Page not found")
);

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: "Express error handler caught an unknown middleware error, uh-oh!",
    status: 500,
    message: { err: "An error occurred" },
  };
  // Use default err mashed with changes from passed-in err
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).send(errorObj.message);
});

// Listen for port
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

// Uncomment this \/ for testing
// export default app;