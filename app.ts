import express from 'express'
import { articlePost, extractCookies } from './src/data-parsing'
const app = express()

app.get('/', async (req, res) => {
   const a = await extractCookies()
  const result=  await articlePost(a)
  console.log(result)
    res.send('Hello World!')
})

app.listen(3333,() => {
    console.log('Server started on port 3333')
})