# Complete Docker Guide

## Table of Contents
- [Essential Docker Commands](#essential-docker-commands)
- [Pushing to Docker Hub](#pushing-to-docker-hub)
- [Docker Compose](#docker-compose)

---

## Essential Docker Commands

Docker provides a wide range of commands that allow you to interact with Docker images, containers, networks, and volumes. Here are the most essential Docker commands every developer should know:

### Container Management

**`docker run`**
- Creates and starts a new container from a Docker image
- Example: `docker run -p 8080:80 nginx`
  - Starts an Nginx container and maps port 8080 on the host to port 80 in the container

**`docker ps`**
- Lists all running containers
- Use `docker ps -a` to list all containers, including stopped ones

**`docker stop`**
- Stops a running container
- Example: `docker stop my-container`

**`docker start`**
- Starts a stopped container
- Example: `docker start my-container`

**`docker rm`**
- Removes one or more containers
- Example: `docker rm my-container`

**`docker exec`**
- Runs a command inside a running container
- Example: `docker exec -it my-container bash`
  - Starts an interactive Bash shell inside the container

**`docker logs`**
- Retrieves the logs of a container
- Example: `docker logs my-container`

### Image Management

**`docker images`**
- Lists all locally available Docker images

**`docker build`**
- Builds a Docker image from a Dockerfile
- Example: `docker build -t my-image .`
  - Builds an image tagged as "my-image" using the Dockerfile in the current directory

**`docker pull`**
- Downloads a Docker image from a registry (e.g., Docker Hub)
- Example: `docker pull ubuntu`

**`docker push`**
- Pushes a Docker image to a registry
- Example: `docker push my-image`

**`docker rmi`**
- Removes one or more Docker images
- Example: `docker rmi my-image`

### Network and Volume Management

**`docker network`**
- Manages Docker networks
- Example: `docker network create my-network`

**`docker volume`**
- Manages Docker volumes
- Example: `docker volume create my-volume`

### Hands-on Experimentation

To gain a better understanding of Docker commands, perform hands-on experimentation:

1. Start with simple commands like `docker run` to create containers
2. Use `docker ps` to monitor running containers
3. Experiment with different options and flags
4. Try running containers with different port mappings, volumes, or environment variables

---

## Pushing to Docker Hub

Docker Hub is a public registry where you can store and share Docker images. It provides a centralized repository for distributing your images to others and managing your own image collections.

### Getting Started with Docker Hub

#### 1. Create a Docker Hub Account
- Visit [Docker Hub](https://hub.docker.com/) and create an account
- Verify your email address

#### 2. Create a New Repository
- Log in to Docker Hub
- Click on "Repositories" tab
- Click "Create Repository"
- Provide a repository name and set visibility (public or private)
- Click "Create"

#### 3. Login to Docker CLI
```bash
docker login
```
- Enter your Docker Hub username and password
- For two-factor authentication, create an access token following the [Docker documentation](https://docs.docker.com/security/for-developers/access-tokens/)

### Pushing Your First Image

#### Step-by-Step Process

1. **Build your Docker image:**
   ```bash
   docker build -t your_username/your_reponame:tagname .
   ```

2. **Tag your existing image (if needed):**
   ```bash
   docker tag your_image_name your_username/your_reponame:tagname
   ```

3. **Push the image to Docker Hub:**
   ```bash
   docker push your_username/your_reponame:tagname
   ```

4. **Run the image from Docker Hub:**
   ```bash
   docker run -p 3000:3000 your_username/your_reponame:tagname
   ```

### Image Tags and Versioning

Tags allow you to manage multiple versions of an image within the same repository, similar to Git branches:

```bash
# Tag with version number
docker tag your_image_name your_username/your_reponame:v1.0
docker push your_username/your_reponame:v1.0

# Tag as latest
docker tag your_image_name your_username/your_reponame:latest
docker push your_username/your_reponame:latest

# Development version
docker tag your_image_name your_username/your_reponame:dev
docker push your_username/your_reponame:dev
```

### Sharing and Collaboration Benefits

Docker Hub enables:
- **Easy sharing** of pre-built images with team members
- **Collaboration** through private repositories
- **Automated builds** integrated with CI/CD pipelines
- **Version control** of your Docker images
- **Global accessibility** of your images from any Docker-enabled machine

---

## Docker Compose

Docker Compose is a powerful tool that simplifies the management of multi-container Docker applications using a single YAML configuration file. It eliminates the complexity of manually managing multiple containers, networks, and volumes.

### The Problem Docker Compose Solves

Before Docker Compose, setting up multi-container applications required multiple manual steps and commands, making the process tedious and error-prone.

#### Before Docker Compose (Manual Setup)

```bash
# Create network
docker network create my_custom_network

# Create volume
docker volume create volume_database

# Start MongoDB container
docker run -d -v volume_database:/data/db --name mongo --network my_custom_network mongo

# Start backend container
docker run -d -p 3000:3000 --name backend --network my_custom_network backend
```

#### After Docker Compose (Declarative Setup)

Create a `docker-compose.yaml` file:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo
    container_name: mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    networks:
      - app-network

  backend:
    image: backend
    container_name: backend_app
    depends_on:
      - mongodb
    ports:
      - "3000:3000"
    environment:
      MONGO_URL: "mongodb://mongodb:27017"
    networks:
      - app-network

volumes:
  mongodb_data:

networks:
  app-network:
    driver: bridge
```

### Essential Docker Compose Commands

```bash
# Start all services
docker-compose up

# Start services in detached mode
docker-compose up -d

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down --volumes

# View logs
docker-compose logs

# Scale a service
docker-compose up --scale backend=3
```

### Docker Compose File Structure

A typical `docker-compose.yaml` file consists of:

- **version**: Specifies the Compose file format version
- **services**: Defines the containers that make up your application
- **volumes**: Defines named volumes for data persistence
- **networks**: Defines custom networks for service communication

### Benefits of Docker Compose

1. **Simplified Application Definition**
   - Define entire application stack in a single YAML file
   - Clear, readable configuration format

2. **Easy Sharing and Collaboration**
   - Version-controlled configuration files
   - Reproducible development environments

3. **Reduced Complexity**
   - Abstracts away manual container management
   - Automatic network and volume creation

4. **Improved Development Workflow**
   - Quick environment setup and teardown
   - Faster iteration and testing cycles

5. **Environment Portability**
   - Consistent setup across development, staging, and production
   - Works across different machines and platforms

6. **Dependency Management**
   - Built-in service dependency handling
   - Automatic startup ordering

### Best Practices

- Use meaningful service names that reflect their purpose
- Leverage environment variables for configuration
- Use named volumes for data that needs to persist
- Implement health checks for critical services
- Use `.env` files for environment-specific configurations
- Pin image versions for production deployments

---

## Conclusion

Docker and Docker Compose provide powerful tools for containerizing applications and managing complex multi-container setups. By mastering these essential commands and concepts, you can:

- Efficiently manage Docker containers and images
- Share your work through Docker Hub
- Simplify multi-container application deployment
- Create reproducible development environments
- Streamline your development and deployment workflows

Start with simple containers and gradually work your way up to complex multi-service applications using Docker Compose. The investment in learning these tools will pay dividends in your development productivity and deployment reliability.