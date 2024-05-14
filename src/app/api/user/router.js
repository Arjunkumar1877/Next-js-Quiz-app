import { connectToDb } from "@/app/libs/mongoDB";
import User from "@/app/models/UserSchema";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request){
    await connectToDb();
   
    try {
        const countUser = await User.countDocuments();

        if(countUser > 0){
            const findUser = await User.findOne();

            return NextRequest.json({
                message: 'User already exists',
                user: findUser,
            })
        }

        const { name, isLogged, experience } = await request.json();
        const newUser = await User.create({ name, isLogged, experience });
        return NextResponse.json({
            user: newUser,
        });

    } catch (error) {
        return NextResponse.json({ message: error });
    }
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