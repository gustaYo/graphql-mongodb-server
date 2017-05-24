import {IUserModel, User} from './models';
import UserRepository = require("../../../repository/UserRepository");
const userRepo = new UserRepository();
export default {
    Query: {
        async getPerson(root, args, ctx) {
            return await userRepo.findById(args.id)
        },
        async persons(root, args, ctx) {
           return await userRepo.retrieve()
        }
    },
    Mutation: {
        async addPerson(root, args, ctx) {
            return await userRepo.save(<IUserModel>args.data)
        },
        async editPerson(root, args, ctx) {
            return await userRepo.update(args.id,<IUserModel>args.data)
        },
        async deletePerson(root, args, ctx) {
            return await userRepo.delete(args.id)
        },
    },
    UserType: {
        async matches(root, args, ctx) {
            return await User.find()
        }
    }
};