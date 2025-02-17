import { Request, Response } from 'express'
import { prisma } from '../../prisma/prisma'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export class UsersController {
    async create(request: Request, response: Response) {
        const { email, password, firstName, lastName } = request.body

        const findUser = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (findUser) {
            response.status(404).json({ message: 'E-mail already exists' })
            return
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                firstName,
                lastName,
            },
        })

        response.json({ user })
    }

    async login(request: Request, response: Response) {
        const { email, password } = request.body

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (user && bcrypt.compareSync(password, user.passwordHash)) {
            const token = jwt.sign(
                { id: user.id, email: user.email },
                '123456',
                { expiresIn: '1h' }
            )

            response.json({ token })
            return
        }

        response.status(401).json({ message: 'Invalid credentials' })
    }

    async profile(request: Request, response: Response) {
        response.json(request.user)
    }
}
