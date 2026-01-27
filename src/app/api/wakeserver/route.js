import { NextResponse } from "next/server";
import pool from "../../../../lib/db";

export async function GET(){

    await pool.query("Select 1 ");
    return NextResponse.json({message : "Server Waked up"});

    
}

