import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

declare var process: {
    env: {
        JWT_SECRET: string
    }
}

let secret = process.env.JWT_SECRET;

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        console.log(secret);
        res.status(401).json('Usuário não autenticado')
    }

    const [, token] = authorization.split(" ");

    try {
        const decoded = verify(token, secret);
        const { id } = decoded as TokenPayload;

        //@ts-ignore
        req.userId = id;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' })
    }
}