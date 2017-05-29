
import { Controller, Get } from "express-ts-controller";
import { Request, Response } from "express";

import UserRepository = require("../repository/UserRepository");
const userRepo = new UserRepository();

@Controller("/user")
export default class UserController {
    @Get("/")
    async greet(req: Request, res: Response) {
        let users = await userRepo.retrieve()
        res.send(users)
    }
}