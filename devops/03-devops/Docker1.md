
# 🐳 Docker Essentials: A Beginner's Guide

## 1. What is Containerisation?

**Containerisation** is a lightweight form of virtualization that allows applications to run in isolated environments called **containers**. Containers bundle the code, dependencies, and runtime needed to run the application, ensuring it works reliably across different environments.

### Benefits:

* Portability
* Consistency across environments
* Lightweight and faster than VMs
* Easier CI/CD workflows

---

## 2. History of Docker

* **2013:** Docker was released as an open-source project by DotCloud (later renamed Docker Inc).
* It built upon existing Linux container technologies (like LXC).
* Docker popularized container usage due to its simplicity, developer-friendly tools, and ecosystem (like Docker Hub).

---

## 3. How to Install Docker and Run Locally

### Installation:

* [Docker Desktop for Windows/macOS](https://www.docker.com/products/docker-desktop/)
* Linux: Use package managers like `apt`, `dnf`, or `yum`.

```bash
# Example for Ubuntu:
sudo apt-get update
sudo apt-get install docker.io
sudo systemctl start docker
sudo systemctl enable docker
```

### Test Docker:

```bash
docker --version
docker run hello-world
```

---

## 4. Containers vs Images

| Feature    | Image                        | Container                    |
| ---------- | ---------------------------- | ---------------------------- |
| Definition | Read-only blueprint/template | Running instance of an image |
| State      | Static                       | Dynamic, has state           |
| Use case   | Used to create containers    | Used to run applications     |
| Commands   | `docker build`               | `docker run`                 |

---

## 5. Creating a Simple Full Stack App & Dockerfile

### Sample `Dockerfile`:

```Dockerfile
# Base image
FROM node:18-alpine

# Working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Start the app
CMD ["npm", "start"]
```

Build the image:

```bash
docker build -t my-fullstack-app .
```

Run the container:

```bash
docker run -p 3000:3000 my-fullstack-app
```

---

## 6. Containerizing the Backend

Example for a Python Flask app:

**Dockerfile:**

```Dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "app.py"]
```

---

## 7. Deploying to Docker Hub

### Steps:

1. [Create Docker Hub account](https://hub.docker.com/)
2. Login:

   ```bash
   docker login
   ```
3. Tag your image:

   ```bash
   docker tag myapp username/myapp
   ```
4. Push:

   ```bash
   docker push username/myapp
   ```

---

## 8. Pulling an Image and Deploying

```bash
docker pull username/myapp
docker run -p 3000:3000 username/myapp
```

---

## 9. A Small Flaw in Our Approach (Assignment)

Often, Dockerfiles are not optimized:

* Not using `.dockerignore`
* Installing dev dependencies in production
* Caching issues
* Large image sizes

### Assignment:

* Optimize Dockerfile
* Use multi-stage builds
* Push to Docker Hub

---

## 10. Bonus - Caching and Layers in Docker

* Docker images are built in **layers**.
* Each command in the Dockerfile creates a new layer.
* Docker uses **layer caching** to speed up builds.

Tips:

* Order Dockerfile instructions from least to most likely to change.
* Avoid frequent `COPY . .` at the start.

---

## 🚀 Common Docker Commands

| Command                          | Description                                |
| -------------------------------- | ------------------------------------------ |
| `docker build -t name .`         | Build an image from Dockerfile             |
| `docker run -p host:container`   | Run a container with port mapping          |
| `docker ps`                      | List running containers                    |
| `docker ps -a`                   | List all containers                        |
| `docker images`                  | List images                                |
| `docker pull image_name`         | Pull an image from Docker Hub              |
| `docker push username/image`     | Push an image to Docker Hub                |
| `docker stop container_id`       | Stop a running container                   |
| `docker rm container_id`         | Remove a container                         |
| `docker rmi image_id`            | Remove an image                            |
| `docker exec -it container bash` | Execute interactive command in a container |
| `docker logs container_id`       | View logs of a container                   |

---

Let me know if you want this in PDF format or expanded with practical examples (like React + Node app containerization).
