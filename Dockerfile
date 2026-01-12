# Pull the Node.js base image from Docker Hub repository
FROM node:24

# Go to the src directory and set it as our working directory
WORKDIR /src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the app dependencies (RUN happens during build time)
RUN npm install

# Copy the rest of the app's source code to the working directory
COPY . .

# Set port 3000 to be exposed by the container at runtime
ENV PORT=3000
EXPOSE 3000

# Run our app
CMD ["node", "src/index.js"]