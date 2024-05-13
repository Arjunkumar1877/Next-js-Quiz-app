import { connectToDb } from "@/app/libs/mongoDB";
import Quiz from "@/app/models/QuizSchema";
import { NextResponse } from "next/server";

export async function POST(request){
    await connectToDb();
    const { quizTitle, icon, quizQuestions } = await request.json();
    await Quiz.create({ quizTitle, icon, quizQuestions });

    try {
        return NextResponse.json({
            message: 'The quiz has been created successfully.'
        })
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}


export async function GET(){
    await connectToDb();
    const quizzes = await Quiz.find();

    try {
        return NextResponse.json({ quizzes });
    } catch (error) {
        return NextResponse.json({ message: error });
    }
}