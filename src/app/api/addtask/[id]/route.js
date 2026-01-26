import { NextResponse } from "next/server";
import pool from "../../../../../lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function DELETE(req,{params}){

    try {

    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json({success : false , message : "User Unauthenticated"}, {status : 401});
    }

    const {id} = await params;

    const task = await pool.query("Select * from tasks where id = $1",[id]);
    

    if(task.rows.length === 0){
        return NextResponse.json({success : false , message : "No Task Found"},{status : 404});
    }

    await pool.query("Delete from tasks where id = $1", [id]);

    return NextResponse.json({success : true , message : "Task Deleted Successfully"},{status : 200});

    } catch (error) {
        return NextResponse.json({success : false , message : "Internal Server error" + error},{status : 500});
    }

}


export async function PATCH(req,{params}){

    try {
        const session = getServerSession(authOptions);

        if(!session){
            return NextResponse.json({success : false , message : "User not authenticated"} , {status : 401});
        }

        const {id} = await params;

        const task = await pool.query(
            "select * from tasks where id = $1",
            [id]
          );
      
          if (task.rows.length === 0) {
            return NextResponse.json(
              { success: false, message: "Task not found" },
              { status: 404 }
            );
          }

          const newStatus = task.rows[0].status === "completed" ? "pending" : "completed";


          const updated = await pool.query(
            "update tasks set status = $1 where id = $2 returning *",
            [newStatus, id]
          );
      
          return NextResponse.json(
            { success: true, task: updated.rows[0] },
            { status: 200 }
          );
        

    } catch (error) {
        return NextResponse.json({success : false , message : "Internal Server error" + error},{status : 500});
    }
}