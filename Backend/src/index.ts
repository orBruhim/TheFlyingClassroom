import express from 'express'
import cors from 'cors'
import { getClasses } from './service/class.service'
const app = express()
app.use(cors())
const port = 5000

app.get('/api/v1/classes', (_, res) => {
  res.send(getClasses());
})
app.listen(port, () => console.log(`Running on port ${port}`))
