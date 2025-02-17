import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma";

export class CategoriesController {
    async findAll(_request: Request, response: Response) {
        const categories = await prisma.category.findMany()
        response.send(categories)
    }


    async create(request: Request, response: Response) {
        const { name } = request.body

        try {
            const categoryExistentInDatabase = await prisma.category.findFirst({
                where: {
                    name: {
                        equals: name,
                        mode: "insensitive",
                    }
                }
            })

            if (categoryExistentInDatabase) {
                response.status(409).send({ message: '❌ Categoria já cadastrada no sistema.' })
                return
            }

            await prisma.category.create({
                data: {
                    name
                }
            })

            response.status(201).send({ message: "Categoria cadastrada com sucessso!" })

        } catch (error) {
            response.status(500).send(error)
            return
        }

    }

    async destroy(request: Request, response: Response) {
        const id = Number(request.params.id)

        try {

            const category = await prisma.category.findUnique({
                where: {
                    id
                }
            })

            if (!category) {
                response.status(404).send({ message: 'Categoria não encontrada!' })
                return
            }

            await prisma.category.delete({
                where: {
                    id
                }
            })
            response.status(200).send({ message: 'Categoria deletada com sucesso!' })
            return

        } catch (error) {
            response.status(500).send(error)
            return
        }
    }
}