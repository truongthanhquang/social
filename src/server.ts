import { validateEnv } from '@core/utils';
import 'dotenv/config';
import { IndexRoute } from '@modules/index';
import App from './app';
import UserRoute from '@modules/user/user.route';
validateEnv();

const routes = [new IndexRoute(), new UserRoute];
const app = new App(routes);
app.listen();