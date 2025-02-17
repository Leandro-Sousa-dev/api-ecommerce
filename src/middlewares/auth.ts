import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma/prisma'

export const authMiddleware = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    // await fetch('asdasd', {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': `Bearer ${token}`
    //     }
    // })

    const token = request.headers['authorization']?.split(' ')[1]

    if (!token) {
        response.status(401).send({ message: 'Unauthorized' })
        return
    }    

    const payload = jwt.verify(token, '123456') as { id: number, email: string }

    const user = await prisma.user.findUnique({
        where: {
            id: payload.id
        }
    })

    if (!user) {
        response.status(401).send({ message: 'Failed authenticate token'})
        return
    }

    request.user = user

    next()
}
