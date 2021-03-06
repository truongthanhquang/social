import { Route } from 'core/interfaces';
import express from 'express';

class App{
    public app: express.Application;
    public port: string|number;

    constructor(route: Route[]){
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.initializeRoute(route);
    }

    public listen(){
        this.app.listen(this.port, () =>{
            console.log(`Server is listening  on port ${this.port}`);
        })
    }

    private initializeRoute(routes: Route[]){
        routes.forEach((route) => {
            this.app.use('/', route.router);
        });
    }
}

export default App;