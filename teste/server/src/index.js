const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API funcionando 🎉')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
