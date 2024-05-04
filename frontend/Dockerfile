# Step 1: Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json files and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of your application's source code
COPY . .

# Step 5: Build the React application
RUN npm run build

# Step 6: Install serve to serve the production build
RUN npm install -g serve

# Step 7: Set the command to run your app using serve
CMD ["npm", "start"]

# Step 8: Expose the port the app runs on
EXPOSE 3000
