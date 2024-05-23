# syntax=docker/dockerfile:1
FROM node:19-bullseye

# Set the working directory
WORKDIR /app

# Copy the file from your host to your current location
COPY . .

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install \
    && npm run build \
    && cp -r public .next/standalone \
    && cp -r .next/static .next/standalone/.next

# Inform Docker that the container is listening on the specified port at runtime
EXPOSE 3000

# Run the specified command within the container
CMD [ "node", ".next/standalone/server.js" ]
