import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma";

export class SizesController {
    async findAll(_request: Request, response: Response) {
        const sizes = await prisma.size.findMany()
        response.send(sizes)
    }


    async create(request: Request, response: Response) {
        const { name } = request.body

        try {
            const sizeExistentInDatabase = await prisma.size.findFirst({
                where: {
                    name: {
                        equals: name,
                        mode: "insensitive",
                    }
                }
            })

            if (sizeExistentInDatabase) {
                response.status(409).send({ message: '❌ Tamanho já cadastrado no sistema.' })
                return
            }

            await prisma.size.create({
                data: {
                    name
                }
            })

            response.status(201).send({ message: "Tamanho cadastrado com sucessso!" })

        } catch (error) {
            response.status(500).send(error)
            return
        }

    }

    async destroy(request: Request, response: Response) {
        const id = Number(request.params.id)

        try {

            const size = await prisma.size.findUnique({
                where: {
                    id
                }
            })

            if (!size) {
                response.status(404).send({ message: 'Tamanho não encontrado!' })
                return
            }

            await prisma.size.delete({
                where: {
                    id
                }
            })
            response.status(200).send({ message: 'Tamanho deletado com sucesso!' })
            return

        } catch (error) {
            response.status(500).send(error)
            return
        }
    }
}