# Exam Bank System

An Exam Management Web Application built with React Frontend Bun Express Backend npm and MongoDB Database This system allows users to manage search and download exam questions easily.

## How to Use

**Step1: Clone the repository**

Download or clone this repo by using the link below:

    https://github.com/Kaitosss/ExamDepot.git

**Step2: Install dependencies**

Go to the project root and run the following command to install both frontend and backend dependencies:

    bun install --cwd ExamDepot/frontend && npm install --prefix ExamDepot/backend
    
**Step3: Configure environment variables**

Create a `.env` file inside the **backend** folder with the following content:

    PORT=8000
    JWT_SECRET=your_jwt_secret_key_here
    MONGODB_URL=your_mongodb_connection_string_here
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret

**Step 4: Run the project**

Start frontend (React + Bun):

    bun run --cwd ExamDepot/frontend dev

Start backend (Express + npm):

    npm start --prefix ExamDepot/backend
