import express from 'express'
import { articlePost, extractCookies } from './src/data-parsing'
const app = express()

app.get('/', async (req, res) => {
  const myCookies = await extractCookies()
  await articlePost(myCookies)
})

app.listen(3333,() => {
    console.log('Server started on port 3333')
})