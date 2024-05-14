// import { connectToDb } from "@/app/libs/mongoDB";
// import Quiz from "@/app/models/QuizSchema";
import { NextResponse } from "next/server";
import { connectToDb } from "../../libs/mongoDB";
import Quiz from "../../models/QuizSchema";


export async function POST(request){
    await connectToDb();
    const { quizTitle, icon, quizQuestions } = await request.json();
    const newQuiz = await Quiz.create({ quizTitle, icon, quizQuestions });

    try {
        return NextResponse.json({
            id: newQuiz._id,
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


export async function PUT(request){
    try {
        const id = request.nextUrl.searchParams.get('id');
        const quizToUpdate = await Quiz.findById(id);
        console.log(request)
        const { updateQuiz, updateQuizQuestions } = await request.json();

        if(updateQuiz){
            quizToUpdate.icon = updateQuiz.icon;
            quizToUpdate.quizTitle = updateQuiz.quizTitle;
            quizToUpdate.quizQuetions = updateQuiz.quizQuestions;
        }

        if(updateQuizQuestions){
            quizToUpdate.quizQuestions = updateQuizQuestions;
        }

        await quizToUpdate.save();
        return NextResponse.json({ message: 'success'});
    } catch (error) {
        console.log(error.message)
        console.log("error 🎶😢🤦‍♂️")
    }
}


export async function DELETE(request){
    const id = request.nextUrl.searchParams.get('id');
    await connectToDb();
    await Quiz.findByIdAndDelete(id);
    return NextResponse.json({ message: 'quiz deleted'});
}


// export async function 