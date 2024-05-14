// import User from "@/app/models/UserSchema";
import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "../../libs/mongoDB";
import User from "../../models/UserSchema";
export async function POST(request) {
    // Connect to the database (assuming a database connection function exists)
    await connectToDb();
  
    try {
      // Parse the request body as JSON
      const { formData } = await request.json();
  
      // Validate user input (improve security)
      if (!validateUserInput(formData)) {
        return NextResponse.json({
          message: 'Invalid user input. Please check your data.',
        });
      }
  
      const { email, password, experience, isLogged, name } = formData;
  
      // Check for existing user using findOne (assuming User model exists)
      const existedUser = await User.findOne({ email });
  
      if (existedUser) {
        return NextResponse.json({
          message: 'User already exists.',
        });
      }
  
      // Create a new user instance
      const newUser = new User({
        name,
        email,
        password, // Consider hashing password before saving (security)
        isLogged,
        experience,
      });
  
      // Save the new user to the database
      const savedUser = await newUser.save();
  
      if (savedUser) {
        // Send a success response with the user object (excluding sensitive data like password)
        return NextResponse.json({
          message: 'User successfully signed up.',
          user: {
            name: savedUser.name,
            email: savedUser.email,
            experience: savedUser.experience,
            isLogged: savedUser.isLogged,
          },
        });
      } else {
        // Handle unsuccessful save (improve error handling)
        console.error('Error saving user:', error);
        return NextResponse.json({
          message: 'An error occurred while creating the user.',
        });
      }
    } catch (error) {
      // Handle other errors (improve error handling)
      console.error('Error during user signup:', error);
      return NextResponse.json({
        message: 'An unexpected error occurred.',
      });
    }
  }
  
  // (Optional) Define a validation function for user input (security)
  function validateUserInput(formData) {
    // Implement validation logic for email format, password strength, etc.
    // Return true if valid, false if invalid
    return true; // Replace with actual validation logic
  }
  
export async function PUT(request){
    try {
        const id = request.nextUrl.searchParams.get('id');
        let userUpdate = await User.findById(id);
        const { updateUser } = await request.json();
        userUpdate.isLogged = updateUser.isLogged;
        userUpdate.experience = updateUser.experience;

        await userUpdate.save();
        return NextResponse.json({ message: 'user saved' });
    } catch (error) {
        console.log(error.message)
    }
}