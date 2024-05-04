# SCE - Prac 1

This document outlines the necessary steps to configure and run the e-commerce application, including the frontend, backend, and database using Docker.

## Prerequisites

Ensure you have the following installed on your system:
- Docker
- Docker Compose
- Git (Optional, for cloning the repository)

## Clone the Repository

If you have the code in a repository, you can clone it using:

```bash
git clone <repository-url>
cd tech-retail
```



If you do not use Git, ensure you have the source code available locally.
## Configuration with Docker Compose

The project includes a `docker-compose.yml` file that defines the necessary services for the frontend, backend, and database. Here's how to use it to bring up all necessary components.
### Project Structure

Ensure the project folder structure is as follows before proceeding:

```Copy code
tech-retail/
│
├── backend/
│   ├── Dockerfile
│   └── ...
├── frontend/
│   ├── Dockerfile
│   └── ...
└── docker-compose.yml
```


### Launching the Services

To start all the services defined in the `docker-compose.yml`, execute the following command in the root directory of the project:

```bash
docker-compose up --build
```



This command will build the necessary images if they are not available and then start the containers.
### Accessing the Application

Once the containers are running, you can access: 
- **Frontend:**  `http://localhost:3001` 
- **Backend:**  `http://localhost:3002`
## Shutting Down the Services

To stop and remove the containers, the network created, and the anonymous volumes, you can use:

```bash
docker-compose down -v
```


## Data Persistence

If you wish to maintain PostgreSQL data between runs, ensure the `db` service in your `docker-compose.yml` file is configured with a volume as shown in the included example.
## Additional Notes
- Make sure to modify the environment variables as needed before bringing up the services. 
- If you make changes to the code, you can rebuild and restart the services with `docker-compose up --build`.