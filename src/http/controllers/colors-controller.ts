import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma";

export class ColorsController {
    async findAll(_request: Request, response: Response) {
        const colors = await prisma.color.findMany()
        response.send(colors)
    }


    async create(request: Request, response: Response) {
        const { name } = request.body

        try {
            const colorExistentInDatabase = await prisma.color.findFirst({
                where: {
                    name: {
                        equals: name,
                        mode: "insensitive",
                    }
                }
            })

            if (colorExistentInDatabase) {
                response.status(409).send({ message: '❌ Cor já cadastrada no sistema.' })
                return
            }

            await prisma.color.create({
                data: {
                    name
                }
            })

            response.status(201).send({ message: "Cor cadastrada com sucessso!" })

        } catch (error) {
            response.status(500).send(error)
            return
        }

    }

    async destroy(request: Request, response: Response) {
        const id = Number(request.params.id)

        try {

            const color = await prisma.color.findUnique({
                where: {
                    id
                }
            })

            if (!color) {
                response.status(404).send({ message: 'Cor não encontrada!' })
                return
            }

            await prisma.color.delete({
                where: {
                    id
                }
            })
            response.status(200).send({ message: 'Cor deletada com sucesso!' })
            return

        } catch (error) {
            response.status(500).send(error)
            return
        }
    }
}