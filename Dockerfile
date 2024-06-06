# syntax=docker/dockerfile:1
FROM node:19-bullseye

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install node packages
RUN npm install

# Copy the file from your host to your current location
COPY . .

# Build the Next.js app
RUN npm run build

# Move the necessary files for standalone build
RUN cp -r public .next/standalone \
    && cp -r .next/static .next/standalone/.next \
    && cp -r .next/cache .next/standalone/.next

# Install Python and necessary packages
RUN apt-get update && apt-get install -y python3 python3-pip

# Use pip to install the openai package
RUN pip3 install openai

# Copy the requirements.txt and install Python dependencies
COPY src/app/services/requirements.txt .
RUN pip3 install -r requirements.txt

# Inform Docker that the container is listening on the specified port at runtime
EXPOSE 3000

# Run the specified command within the container
CMD [ "node", ".next/standalone/server.js" ]
