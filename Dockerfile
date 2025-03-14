# Use Ubuntu as the base image
FROM ubuntu:20.04

# Install necessary packages: Node.js, npm, dnsmasq, NGINX, and Supervisor
RUN apt-get update && \
    apt-get install -y nodejs npm dnsmasq nginx supervisor && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install application dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Copy dnsmasq configuration file
COPY dnsmasq.conf /etc/dnsmasq.conf

# Copy NGINX configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy supervisor configuration file
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose the application ports and DNS port
EXPOSE 3000 443 8080 5500 53/udp

# Command to run supervisor
CMD ["/usr/bin/supervisord"]
