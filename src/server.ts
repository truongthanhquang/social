import express, { Request, Response } from "express";

// set port
const port = process.env.PORT || 5000;

// express server
const app = express();

app.get('/', (req: Request, res: Response) =>{
    res.send('API is running...');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

