//const express = require('express')
import express from 'express'
import cors from 'cors'
const app = express()
app.use(express.json)
app.use(cors())


let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]
const requestLogger = (req,res, next)=>{
  console.log('Method: ', req.method)
  console.log('Path: ', req.path)
  console.log('Body: ', req.body)
  console.log('--------')
  next()
}
app.use(requestLogger)
app.get('/', (req, res)=>{
    res.send('<h3>Hello world</h3>')
})
app.get('/api/notes', (req, res)=>{
    res.json(notes)
})


app.post('/api/notes', (request, response) => {
  const body = request.body
  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }
  notes = notes.concat(note)
  response.json(note)
})

app.get('/api/notes/:id', (req, res)=>{
  const id = Number(req.params.id)
  console.log(id)
  const note = notes.find(note => note.id===id)
  if (note){
    res.json(note)
  }else{
    res.status(404).end()
  }
})
app.delete('/api/notes/:id', (req, res)=>{
  const id = Number(req.params.id)
  const note = notes.filter(note => note.id !== id)
  
  res.status(204).end()
})
const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Server is listening on port: ${PORT}`)
})
