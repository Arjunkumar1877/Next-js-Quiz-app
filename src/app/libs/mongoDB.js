'use server'

import mongoose from 'mongoose';

export async function connectToDb(){
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("CONNECTED TO MONGODB...")
    } catch (error) {
        console.log(error.message)
    }
}