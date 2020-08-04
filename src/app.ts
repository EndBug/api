import express from 'express'

const app = express(),
  port = 3000
app.listen(port, () => console.log(`API running on port ${port}`))

app.get('/', (_, res) => {
  res.redirect('https://github.com/EndBug')
})
