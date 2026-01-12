# AIC GDGC Tech Projects Week 1: Git/Docker
Repository and resources to help you get through the first Tech Projects workshop on Git and Docker!

## Setup
You will need to install the following on your computer to follow along with this tutorial:

- [Git](https://git-scm.com/install/)
- [GitHub Desktop](https://github.com/apps/desktop)
- [Docker / Docker Desktop](https://dockr.ly/3EbT6ol)
- [Node.js](https://nodejs.org/en)

Additionally, you will need to create the following accounts:

- [GitHub](https://github.com/login)
- [Docker Hub](https://hub.docker.com/login)

## Setting Up a Docker Container
### Environment Setup
Run the following commands to setup your Node environment:
```
npm init -y
npm install express pg
```

### Dockerfile
In your working directory, create a file called 'Dockerfile', and fill it with the following:
```
FROM node:24
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD [“node”, “src.index.js”]
```

### Building and Running Your Container
Build your Docker image using:
```
docker build -t hello-docker .
```

Then run the Docker image as a container using:
```
docker run -p 3000:3000 hello-docker
```

When you open Docker Desktop, you'll see the container running as some random name. You can also navigate to http://localhost:3000 to see our welcome message. When you are done running the container, press the stop button on your container.

## Running Multiple Containers with Docker Compose
### Update Our App to Host a Database
Update index.js to be the following code:
```
const express = require('express');
const {Pool} = require('pg');

const app = express();
const db = new Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
});

app.get('/', (req, res) => {
    res.send('Welcome to Tech Projects!');
});

app.get('/health', async (req, res) => {
    try {
        await db.query('SELECT 1');
        res.status(200).send('OK');
    } catch (err) {
        res.status(500).send('Database connection error');
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

### Create Our Compose File
In your directory, create a file called 'compose.yaml', and insert the following:
```
services:
  backend:
    build: .
    ports:
      - "3000:3000"
    environment:
      PORT: 3000
      PGHOST: db
      PGPORT: 5432
      PGUSER: user
      PGPASSWORD: password
      PGDATABASE: mydatabase
    depends_on:
      - db

  db:
    image: postgres:17
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydatabase
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

### Run the Compose Environment
You can now run your containers with:
```
docker compose up
```

Once again, look at Docker Desktop, and this time you'll see two containers running under "aic-gdgc-tech-projects-week-1--git-docker": "backend" and "db". Before closing the containers, head to http://localhost:3000/health to ensure that your database connection is running correctly.