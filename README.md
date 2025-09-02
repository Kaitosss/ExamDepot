
# Exam Bank System

An Exam Management Web Application built with React Frontend Bun Express Backend npm and MongoDB Database This system allows users to manage search and download exam questions easily.

## How to Use

**Step1: Clone the repository**

Download or clone this repo by using the link below:

    https://github.com/Kaitosss/ExamDepot.git

**Step2: Install dependencies**

Run the following command to install both frontend and backend dependencies:

    bun install --cwd ExamDepot/frontend && npm install --prefix ExamDepot/backend
    
**Step3: Configure environment variables**

Create a `.env` file inside the **backend** folder with the following content:

    PORT=8000
    JWT_SECRET=your_jwt_secret_key_here
    MONGODB_URL=your_mongodb_connection_string_here
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret

**Step4: Create and run `seed.js` to populate the database**

Before running the app, you need to add initial data to your MongoDB database.

1. Create a file named `seed.js` in the **backend** folder with the following example content:


		import  "dotenv/config"
	    import mongoose from  "mongoose";
	    import Users from  "./models/users.model.js";
	    import bcryptjs from  "bcryptjs";
	    await mongoose.connect(process.env.MONGODB_URL);
	    const  username  =  "your_username";
	    const  password  =  "your_password";
	    const  role  =  "admin";
	    const  profilePic  =  "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
	    const  salt  =  await bcryptjs.genSalt(10);
	    const  hashpassword  =  await bcryptjs.hash(password, salt);
	    const  user  =  new Users({
	    username,
	    password: hashpassword,
	    role,
	    profilePic
	    });
	    await user.save();
	    console.log("Admin inserted successfully");
	    process.exit(0);

2. Run the seed script:

	    node ExamDepot/backend/seed.js
  
  
**Step5: Run the project**

 Start frontend (React + Bun):
 ```
bun run --cwd ExamDepot/frontend dev
```

Start backend (Express + npm):
```
npm start --prefix ExamDepot/backend
```

