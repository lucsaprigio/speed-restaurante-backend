import { Router, Request, Response, response } from "express";

export const router = Router();

router.get('/login', async (req: Request, res: Response) => {
    try {
        const { userId, name, password } = req.body;

        res.send(201).json({ userId, name, password });
    } catch (err) {
        res.send(400).json({ err });
    }
});