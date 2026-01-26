import { NextResponse } from "next/server";
import {authOptions} from '../auth/[...nextauth]/route';
import { getServerSession } from "next-auth";
import pool from "../../../../lib/db";

export async function POST(req){

    try {

        const session = await getServerSession(authOptions);

        if(!session){
            return NextResponse.json({success : false , message : "Login to add a task"},{status : 401});
        }


        const {title , subtitle , category , description , deadline , status} = await req.json();

        if(!title || !subtitle || !category || !description || !deadline){
            return NextResponse.json({success : false , message : "All fields are required"},{status : 400});
        }

        const task = await pool.query(`insert into tasks (user_id , title, subtitle , category ,description , deadline , status) 
            values ($1 , $2 , $3 , $4 , $5 , $6 , $7) returning *`,
            [session.user.id , title , subtitle , category , description , deadline , status]
        );

        return NextResponse.json(
            { success: true, message: "Task created successfully", task: task.rows[0] },
            { status: 201 }
          );
        
    } catch (error) {
        return NextResponse.json({success : false , message : "Internal server error"},{status : 500});
    }
}


export async function GET(){

    try {
        
        const session = await getServerSession(authOptions);

        if(!session){
            return NextResponse.json({success : false , message : "Login to add a task"},{status : 401});
        }

        const tasks = await pool.query("select * from tasks where user_id = $1",[session.user.id]);

        if(tasks.rows.length === 0){
            return NextResponse.json({ success : true , message : "No Tasks Found",tasks: []},{status : 200});
        }

        return NextResponse.json({ success: true, message: "Tasks fetched successfully", tasks: tasks.rows},{ status: 200 });
    } catch (error) {
        return NextResponse.json({success : false , message : "Internal server error"},{status : 500});
    }
}