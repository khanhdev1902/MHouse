require('dotenv').config()
const express = require('express')
const { connectDB } = require('@/configs/db')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello')
})

const PORT = process.env.PORT || 3000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  })
})
