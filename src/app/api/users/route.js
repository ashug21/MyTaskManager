import pool from '../../../../lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const { rows } = await pool.query('select * from users')
  return NextResponse.json(rows);
}

export async function POST(req) {
  const body = await req.json()

  await pool.query(
    'insert into users (name, email) values ($1, $2)',
    [body.name, body.email]
  )

  return NextResponse.json({ success: true })
}
