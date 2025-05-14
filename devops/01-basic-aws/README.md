# AWS EC2 Server Setup Guide

## 1. Introduction to AWS

![AWS Logo](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fc7e1aa8e-eb51-43e2-8383-a7e85b08f771%2F2560px-Amazon_Web_Services_Logo.svg.png?table=block&id=e1ab450d-41d0-4d36-9427-08b78ad4aa4b&cache=v2)

AWS (Amazon Web Services) is Amazon's cloud service platform that offers a wide range of services including:

1. Renting servers
2. Managing domains
3. Uploading objects (mp4 files, jpgs, mp3s, etc.)
4. Autoscaling servers
5. Creating k8s clusters

**In this guide, we'll focus on renting servers using EC2.**

## 2. Understanding EC2 Servers

VMs (Virtual Machines) on AWS are called **EC2 Servers**. EC2 stands for Elastic Compute Cloud Version 2.

- **Elastic**: Can increase/decrease the size of the machine
- **Compute**: It is a computing machine

You can spin up a new EC2 instance from the AWS dashboard.

![EC2 Dashboard](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Ff0ee3fa6-e989-4982-a580-e8039c48ae62%2FScreenshot_2024-02-11_at_6.33.46_AM.png?table=block&id=3dc2315f-4c68-4d34-995e-c56ba0d08feb&cache=v2)

## 3. Creating a New EC2 Server

### 3.1. Launch a New Instance
Click on "Launch a new instance" button.

![Launch Instance](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fce12b6eb-5d32-4cfa-bf79-049356382237%2FScreenshot_2024-02-11_at_6.35.37_AM.png?table=block&id=62284127-f634-49e1-8372-ae190cbe5e53&cache=v2)

### 3.2. Name Your Instance
Give your EC2 instance a descriptive name.

![Name Instance](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F99db06f8-46b8-4724-97b0-edf8eceddc2a%2FScreenshot_2024-02-11_at_6.40.08_AM.png?table=block&id=dc8d9b86-099f-43d9-b591-b73fba177838&cache=v2)

### 3.3. Select an Operating System
Choose the OS you want to run on your server.

![Select OS](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F3d164ebc-9528-40fe-a313-669a9346657e%2FScreenshot_2024-02-11_at_6.40.15_AM.png?table=block&id=1b5a057c-15c7-4306-9c7c-b777110ce930&cache=v2)

### 3.4. Select Instance Size
Choose the appropriate computing resources for your needs.

![Select Size](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F4fad1e6c-5929-4619-87c9-6dd50bc4dc79%2FScreenshot_2024-02-11_at_6.41.19_AM.png?table=block&id=688a2e65-4d63-4976-a9e8-9b0a64038ae5&cache=v2)

### 3.5. Create a New Key Pair
This will allow you to securely SSH into your server.

![Create Key Pair](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fb988d06e-447a-476f-9599-b1b98a561f11%2FScreenshot_2024-02-11_at_6.42.11_AM.png?table=block&id=1f313b84-ebcc-4ac1-a118-7abcd4f33e13&cache=v2)

### 3.6. Configure Storage Size
Select the amount of storage needed for your instance.

![Select Storage](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F4f28c0ac-7f35-4200-a0e6-21df5ac982b3%2FScreenshot_2024-02-11_at_6.38.05_AM.png?table=block&id=f32975d3-a6ee-4a3b-a666-33eb338ff4fe&cache=v2)

### 3.7. Configure Security Groups
Allow traffic on HTTP/HTTPS ports to make your server accessible on the web.

![Configure Security](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Faa98e7a1-aedf-4a1a-8e53-edb938b1b476%2FScreenshot_2024-02-11_at_6.37.57_AM.png?table=block&id=7f497c85-0715-467d-adcf-1bfc99fe7791&cache=v2)

## 4. SSH into Your Server

### 4.1. Set SSH Key Permissions
```bash
chmod 700 kirat-class.pem
```

### 4.2. Connect to Your Instance
```bash
ssh -i kirat-class.pem ubuntu@ec2-65-0-180-32.ap-south-1.compute.amazonaws.com
```

### 4.3. Clone the Repository
```bash
git clone https://github.com/hkirat/sum-server
```

> **Note**: If you encounter an error about "temporary failure in name resolution," your AWS machine might not have internet access. See this solution: [Resolve Temporary Failure in Name Resolution](https://www.tecmint.com/resolve-temporary-failure-in-name-resolution/)
>
> ![Error Message](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fd91828ba-3177-4433-bdd4-7cbb5cca3841%2FScreenshot_2024-02-11_at_6.48.19_AM.png?table=block&id=fbe9df04-332b-43a8-89e2-e1bed09efa74&cache=v2)

### 4.4. Install Node.js
Follow the instructions at: [How to Install Node.js on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)

### 4.5. Install Dependencies
```bash
cd sum-server
npm install
```

### 4.6. Start the Backend Server
```bash
node index.js
```

## 5. Test Your Server

Your EC2 instance will have an IP/DNS that you can use to access your server.

![Server IP/DNS](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fc937d600-8c4e-4c69-8f94-b08d7f47b6af%2FScreenshot_2024-02-11_at_6.54.09_AM.png?table=block&id=39e74650-04ba-490c-9c29-f99dad477d0e&cache=v2)

Try visiting your backend at:
```
your_domain:3000
```

You might notice that you can't access the website yet:

![Connection Failed](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F90f755af-9a75-4875-a126-1410feef6917%2FScreenshot_2024-02-11_at_6.57.17_AM.png?table=block&id=334e0f49-6d1e-4eeb-bb9d-405efa43671e&cache=v2)

## 6. Configure Security Groups

You need to modify your security group settings to allow traffic on the required ports.

![Security Group](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F1b991aa0-bc28-4642-83b9-5101a4ba4f4d%2FScreenshot_2024-02-11_at_6.59.14_AM.png?table=block&id=45e8ee3d-7edd-4160-85c5-dccc8abb6df8&cache=v2)

You can either open port 8080 or use port 80 (HTTP):

![Open Ports](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Febe18a38-147c-4866-9a30-71bace5a829c%2FScreenshot_2024-02-11_at_7.01.21_AM.png?table=block&id=48e9db64-d800-4c6e-87e9-1b890aa215e3&cache=v2)

![Port Configuration](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F5cb4a372-d4db-4698-94c6-37ccaccf9fab%2FScreenshot_2024-02-11_at_7.02.59_AM.png?table=block&id=0c572982-e36c-4658-934d-6753620b7f93&cache=v2)

Now you can access your server at:
```
http://your_domain:8080
```

## 7. Setting Up Nginx

[Nginx](https://www.nginx.com/resources/glossary/nginx/) is a powerful web server that can also act as a reverse proxy.

![Nginx](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F0263a8e2-e824-45b1-901c-34b635308f87%2FScreenshot_2024-02-11_at_7.05.48_AM.png?table=block&id=ff5b15cd-c123-4238-a3bb-aada54dd8407&cache=v2)

### 7.1. What is a Reverse Proxy?

A reverse proxy receives client requests, forwards them to the backend server, and returns the server's response to the client.

![Reverse Proxy](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F2f9a47c6-e0ae-4819-a24e-f9110af8afd6%2FScreenshot_2024-02-11_at_7.12.50_AM.png?table=block&id=e8fc9376-df68-4487-8363-6a3aa4a8ebd8&cache=v2)

### 7.2. Installing Nginx

```bash
sudo apt update
sudo apt install nginx
```

This will start an Nginx server on port 80. Try visiting your website now:

![Nginx Welcome Page](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fbc6b7e9a-9119-43d1-bebf-b870fecf66bf%2FScreenshot_2024-02-11_at_8.24.36_AM.png?table=block&id=06f6c8ad-ebd4-485b-ad72-9be5f4b6d6da&cache=v2)

### 7.3. Create Reverse Proxy Configuration

```bash
sudo rm /etc/nginx/nginx.conf
sudo vi /etc/nginx/nginx.conf
```

Add the following configuration to your Nginx config file:

```nginx
events {
    # Event directives...
}

http {
    server {
        listen 80;
        server_name be1.100xdevs.com;

        location / {
            proxy_pass http://localhost:8080;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

Reload Nginx to apply changes:
```bash
sudo nginx -s reload
```

### 7.4. Start the Backend Server

```bash
node index.js
```

### 7.5. Visit Your Website

Now you can access your website at:
```
https://be1.100xdevs.com/
```

![Website Running](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F6f3c6675-2178-43e1-bbfe-a90e391db2f4%2FScreenshot_2024-02-11_at_8.50.59_AM.png?table=block&id=8a6d5e90-7897-498b-bdd3-bc2ab958c683&cache=v2)

## 8. Certificate Management

For HTTPS setup, use [Certbot](https://certbot.eff.org/) to obtain and install SSL certificates.