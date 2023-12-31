import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { connectDb } from './db.js';
import mealrouter from './routes/mealRoutes.js';
import orderrouter from './routes/orderRoutes.js';
import editorderrouter from './routes/editOrderRoutes.js';
import cors from 'cors';
import loginrouter from './routes/login.js';
import popularrouter from './routes/popularRoutes.js';
import customerrouter from './routes/customerSideRoutes.js';
import * as dotenv from 'dotenv';
dotenv.config();

const port = 1523 || process.env.PORT_KEY;
const app = express();
export const secret = process.env.MONGO_URI;

//middleware
app.use(cors());
app.use('/api', express.json());
app.use('/', (req, res, next) => {
	console.log(`**Logger: ${req.method} ${req.url}`, req.body);
	next();
});

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToStaticFolder = join(__dirname, '../dist');
app.use(express.static(pathToStaticFolder));

// api
app.use('/api/meals', mealrouter);
app.use('/api/orders', orderrouter);
app.use('/api/editorder', editorderrouter);
app.use('/api/login', loginrouter);
app.use('/api/popular', popularrouter);
app.use('/api/customer', customerrouter);

app.get('*', (req, res) => {
	res.sendFile(join(pathToStaticFolder, 'index.html'));
});

// start
app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`);
});

connectDb();
