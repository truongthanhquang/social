import { Route } from "core/interfaces";
import express from "express";
import mongoose from "mongoose";

class App {
  public app: express.Application;
  public port: string | number;

  constructor(route: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.initializeRoute(route);
    this.connectToDatabase();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is listening  on port ${this.port}`);
    });
  }

  private initializeRoute(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private connectToDatabase() {
    try {
      const connectString = process.env.MONGODB_URI;
      if(!connectString){
          console.log('ConnectionString is invalid');
          return;
      }
      mongoose.connect(connectString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });

      console.log("Database connected.......");
    } catch (error) {
      console.log("Connect to database error........");
      console.log(error);
    }
  }
}

export default App;
