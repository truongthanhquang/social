import { Route } from "@core/interfaces";
import express, { urlencoded } from "express";
import mongoose from "mongoose";
import hpp from 'hpp';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { Logger } from "@core/utils";
import { errorMiddleware } from "@core/middleware";
// import 

class App {
  public app: express.Application;
  public port: string | number;
  public production: boolean;

  constructor(route: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 5002;
    this.production = process.env.NODE_ENV == 'production' ? true: false;
    // this.initializeRoute(route);
    this.connectToDatabase();
    this.initializeMiddleware();
    this.initializeRoute(route);
  }

  public listen() {
    this.app.listen(this.port, () => {
      Logger.info(`Server is listening  on port ${this.port}`);
    });
  }

  private initializeRoute(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeMiddleware(){
      if(this.production){
          this.app.use(hpp());
          this.app.use(helmet());
          this.app.use(morgan('combined'));
          this.app.use(cors({origin:'domain.com', credentials:true}));
      }else{
          this.app.use(morgan('dev'));
          this.app.use(cors({origin:true, credentials:true}));
      }
      this.app.use(errorMiddleware);
      this.app.use(express.json());
      this.app.use(urlencoded({extended: true}));
  }


  private connectToDatabase() {
    
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
      }).catch((reason) =>{
          Logger.error('reason');
      });

      Logger.info('Database connected........');
    
  }
}

export default App;
