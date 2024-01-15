import {Router} from 'express'
import {PrismaClient} from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()
let result = {
  "status":true,
  "message": ""
}

router.get('/', async(req,res)=>{
  const categorias = await prisma.categoria.findMany()
  return res.json(categorias)
})

router.get('/:id', async(req,res)=>{
  const searchCategoria = await prisma.categoria.findFirst({
    where: {
      id: parseInt(req.params.id)
    }
  })
   if(!searchCategoria){
    return res.status(404).json("no se encontro categoria")
  }
  return res.json(searchCategoria)
})

router.post('/', async(req, res)=>{
  try {
    const newData = await prisma.categoria.create({
      data: req.body
    });
    if (newData != {}) {
      result.status= true;
      result.message = "Categoria insertado correctamente";
      return res.json(result).status(200);
    }
  } catch (error) {
    result.status = false;
    result.message = "Ocurrió un error al procesar la solicitud.";
    return res.status(500).json(result);
  } finally {
    await prisma.$disconnect();
  }
})

router.delete('/:id', async(req,res)=>{
  try {
  const rowDelete = await prisma.categoria.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

   if(!rowDelete){
    result.status=false;
    result.message="error categoria no eliminada"
    return res.status(404).json(result)
  }
  result.st
  result.message = "Categoria eliminada correctamente"
  return res.json(result  )

  // Resto de la lógica aquí...
} catch (error) {
  if (error.code === 'ER_ROW_IS_REFERENCED_' + parseInt(req.params.id) ) {
    return res.status(400).json({ message: 'No se puede eliminar el registro debido a dependencias en otras tablas.' });
  } else {
    // Otro tipo de error, manejar según sea necesario
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
}

})

router.put('/:id', async(req,res)=>{
  const updateCategoria = await prisma.categoria.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  })
    return res.json(updateCategoria)
})

export default router;