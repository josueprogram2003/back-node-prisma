import express from 'express'
import categoriaRoutes from './routes/categoria.routes.js'
import productoRoutes from './routes/producto.routes.js'
import cors from 'cors'

const corsOptions ={
    origin:'http://localhost:4200', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}


const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api/categoria', categoriaRoutes)
app.use('/api/producto', productoRoutes)

app.listen(3000)
console.log('server on port', 3000)
