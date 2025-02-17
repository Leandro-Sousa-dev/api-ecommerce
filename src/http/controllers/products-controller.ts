import { prisma } from '../../prisma/prisma'
import { Request, Response } from 'express'

// MVC - MODEL / VIEW / CONTROLLER

export class ProductsController {
  async findAll(_request: Request, response: Response) {
    const products = await prisma.product.findMany()
    response.send(products)
  }

  async create(request: Request, response: Response) {
      const { name, price, discount, description, color_id,category_id, size_id, highlight, ean  } = request.body
      const image = request.file.filename!

    try {
        const productExistentInDatabase = await prisma.product.findUnique({
            where: {
                ean
            }
        })
    
        if (productExistentInDatabase) return response.status(409).send({ message: '❌ Produto já cadastrado no sistema.' })
    
        const product = await prisma.product.create({
            data: {
                name,
                image,
                price,
                discount,
                description,
                color_id,
                category_id,
                size_id,
                highlight,
                ean
            }
        })
    
        return response.status(201).send(product)
    } catch (error) {
        return response.status(500).send(error)
    }
  }

  async update(request: Request, response: Response) {
    const id = Number(request.params.id)
    const { name, price, discount, description, color_id, updated_at, category_id, size_id, highlight, ean  } = request.body

    const productExistentInDatabase = await prisma.product.findUnique({
        where: {
            id
        }
    })

    if (!productExistentInDatabase) return response.status(409).send({ message: '❌ Produto não encontrado no sistema.'})

    await prisma.product.update({
        where: {
            id
        },
        data: {
            name,
            price,
        }
    })

    response.status(200).send({ message: 'Produto atualizado.' })
  }

  async destroy(request: Request, response: Response) {
    const id = Number(request.params.id)

    await prisma.product.delete({
        where: {
            id
        }
    })

    response.status(200).send({ message: 'Produto deletado com sucesso.' })
  }
}
