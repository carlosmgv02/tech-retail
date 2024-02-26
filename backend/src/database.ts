import { Pool } from 'pg'

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tech-retail',
  password: 'tech_retail',
  port: 5432
})

export const query = async (text: string, params?: any[]) => await pool.query(text, params)
