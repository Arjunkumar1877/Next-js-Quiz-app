// import User from "../../UserSchema";
import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "../../libs/mongoDB";
import User from "../../models/UserSchema";



export async function POST(request){
    await connectToDb();
   
    try {
        const { formData } = await request.json();
        const { email, password } = formData;
        const existedUser = await User.findOne({email: email})

        if (existedUser) {
          
            if (existedUser.password === password) {
              const updatedUser = await User.findOneAndUpdate(
                { email: email },
                { $set: { isLogged: true } },
                { new: true } 
              );
          
              if (updatedUser) {
                return NextResponse.json({
                  message: "User successfully logged in",
                  user: updatedUser,
                });
              } else{
                console.log("error updating experience")
              }
            } else {
              return NextResponse.json({
                message: "Invalid credentials",
              });
            }
          } else {
            return NextResponse.json({
              message: "User not found. Please create an account.",
            });
          }
          

        // console.log(formData)
        // const newUser = await User.create(formData);
        // return NextResponse.json({
        //     message: "User succesfully signed up",
        //     user: newUser,
        // });

    } catch (error) {
        return NextResponse.json({ message: error });
    }
}