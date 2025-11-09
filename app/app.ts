import http from 'node:http';
import 'dotenv/config';
import { db } from './database.ts';

const PORT = process.env.PORT || 3000;

const server = http.createServer();

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
