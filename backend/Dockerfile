# Step 1: Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Step 2: Set the working directory
WORKDIR /usr/src/app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of your application's source code
COPY . .

# Step 5: Your app binds to port 3002
EXPOSE 3002

# Step 6: Define the command to run your app
CMD ["npm", "start"]
