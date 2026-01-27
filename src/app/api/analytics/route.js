import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"
import { NextResponse } from "next/server";
import pool from "../../../../lib/db";

export async function GET() {
    try {
      const session = await getServerSession(authOptions);
  
      if (!session) {
        return NextResponse.json(
          { success: false, message: 'Login required' },
          { status: 401 }
        )
      }
  
      const totalResult = await pool.query(
        'select count(*) from tasks where user_id = $1',
        [session.user.id]
      )
  
      const completedResult = await pool.query(
        "select count(*) from tasks where user_id = $1 and status = 'completed'",
        [session.user.id]
      )
  
      const pendingResult = await pool.query(
        "select count(*) from tasks where user_id = $1 and status = 'pending'",
        [session.user.id]
      )
  
      return NextResponse.json(
        {
          success: true,
          total: Number(totalResult.rows[0].count),
          completed: Number(completedResult.rows[0].count),
          pending: Number(pendingResult.rows[0].count),
        },
        { status: 200 }
      )
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Internal server error' },
        { status: 500 }
      )
    }
  }
  