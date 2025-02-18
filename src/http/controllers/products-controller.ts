import { prisma } from '../../prisma/prisma'
import { Request, Response } from 'express'

// MVC - MODEL / VIEW / CONTROLLER

export class ProductsController {
    async findAll(_request: Request, response: Response) {
        const products = await prisma.product.findMany()
        response.send(products)
    }

    async create(request: Request, response: Response) {
        const data = { ...request.body }

        try {
            const productExistentInDatabase = await prisma.product.findUnique({
                where: {
                    ean: data.ean
                }
            })

            if (productExistentInDatabase) {
                response.status(409).send({ message: '❌ Produto já cadastrado no sistema.' })
                return
            }

            const image = request.file?.filename

            data.image = image

            await prisma.product.create({
                data: {
                    ...data,
                    colorId: parseInt(data.colorId),
                    categoryId: parseInt(data.categoryId),
                    sizeId: parseInt(data.sizeId),
                    highlight: data.highlight === "true"
                }
            })

            response.status(201).send({ message: `Produto cadastrado com sucessso!` })
            return
        } catch (error) {
            response.status(500).send({ message: `${error}` })
            return
        }
    }

    async update(request: Request, response: Response) {
        const id = Number(request.params.id)

        try {

            const productExistentInDatabase = await prisma.product.findUnique({
                where: {
                    id
                }
            })

            if (!productExistentInDatabase) {
                response.status(409).send({ message: '❌ Produto não encontrado no sistema.' })
                return
            }
            const data = { ...request.body }
            data.updated_at = new Date()

            await prisma.product.update({
                where: {
                    id
                },
                data
            })
            response.status(200).send({ message: 'Produto atualizado.' })
            return
        } catch (error) {
            response.status(500).send(error)
            return
        }

    }

    async destroy(request: Request, response: Response) {
        const id = Number(request.params.id)

        try {

            const product = await prisma.product.findUnique({
                where: {
                    id
                }
            })

            if (!product) {
                response.status(404).send({ message: 'Produto não encontrado!' })
                return
            }

            await prisma.product.delete({
                where: {
                    id
                }
            })
            response.status(200).send({ message: 'Produto deletado com sucesso!' })
            return
        } catch (error) {
            response.status(500).send(error)
            return
        }
    }
}
