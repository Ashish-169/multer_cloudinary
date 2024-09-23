import express from 'express';
import {configDotenv} from 'dotenv'
import http from 'http'
import { fileUpload } from './UploadFile.js';

configDotenv();
const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());

const server = http.createServer(app);

app.use("/api",fileUpload)

server.listen(port,()=>{
  console.log(`Server running on port ${port} and url http://localhost:${port}/`)
})