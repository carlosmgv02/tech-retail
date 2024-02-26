import express, { type Request, type Response } from 'express'
import { query } from './database' // Asegúrate de ajustar la ruta de importación según tu estructura

const app = express()
const port = 3000

app.get('/test-db', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT NOW()')
    res.json({ currentTime: result.rows[0].now })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
})

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`)
})
