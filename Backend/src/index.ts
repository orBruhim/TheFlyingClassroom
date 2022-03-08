import express from 'express'
import { getClasses } from './service/class.service'
const app = express()
const port = 5000

app.get('api/v1/classes', (_, res) => {
  res.send(getClasses());
})
app.listen(port, () => console.log(`Running on port ${port}`))
