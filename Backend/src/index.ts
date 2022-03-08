import express from 'express'
import { getClasses } from './service/class.service'
const app = express()
const port = 5000
app.get('/', (_, res) => {
  res.send('Hello World!')
})

app.get('/classes', (_, res) => {
  res.send(getClasses());
})
app.listen(port, () => console.log(`Running on port ${port}`))
