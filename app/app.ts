import http from 'node:http';
import 'dotenv/config';
import { db, testData } from './database.ts';
import { isValidKeys, isValidObject } from './utils/compareKeys.ts';
import { uuidv4Apiregex } from './utils/uuidv4Regex.ts';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const url = req.url ?? '';
  const method = req.method;

  if (url === '/api/users') {
    switch (method) {
      case 'GET':
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(db));
        return;
      case 'POST':
        let stream = '';

        req.on('data', (chunk) => {
          stream += chunk + [];
        });

        req.on('end', () => {
          if (!stream) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify('No request body'));
            return;
          }

          try {
            const data = JSON.parse(stream);
            if (isValidObject(data, testData)) {
              data.id = crypto.randomUUID();
              db.push(data);
              res.writeHead(201, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(data));
              return;
            }

            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify('Request body does not contain required fields'));
          } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify('Invalid JSON'));
            return;
          }
        });

        break;
      default:
        break;
    }
  }

  if (url?.startsWith('/api/users/')) {
    const id = url.replace('/api/users/', '') ?? '';
    if (uuidv4Apiregex.test(id)) {
      let user = db.find((item) => item.id === id);
      if (user) {
        switch (method) {
          case 'PUT':
            let stream = '';

            req.on('data', (chunk) => {
              stream += chunk + [];
            });

            req.on('end', () => {
              if (!stream) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify('No request body'));
                return;
              }

              try {
                const data = JSON.parse(stream);
                if (isValidKeys(data, testData)) {
                  user = {
                    ...user,
                    ...data,
                  };

                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify(user));
                  return;
                }

                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify('Request body does not contain required fields'));
                return;
              } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify('Invalid JSON'));
              }
            });

          case 'DELETE':
            db.splice(db.indexOf(user), 1);
            res.writeHead(204, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(`User with id ${user.id} removed`));
            return;
          default:
            break;
        }
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(`User with id ${id} doesn't exist`));
        return;
      }
    }
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('Invalid id'));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify('Page not Found'));
  return;
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
