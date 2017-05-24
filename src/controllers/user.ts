// GreetingController.ts
import { Controller, Get } from "express-ts-controller";
import { Request, Response } from "express";

@Controller("/user")
export default class UserController {
    @Get("/")
    greet(req: Request, res: Response) {
        res.send('helloUser')
    }
}