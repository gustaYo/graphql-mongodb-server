// GreetingController.ts
import { Controller, Get } from "express-ts-controller";
import { Request, Response } from "express";

@Controller("/")
export default class HomeController {
    @Get("/")
    greet(req: Request, res: Response) {
        res.render('client')
    }
}
