import RepositoryBase = require("./base/RepositoryBase");
import {User,IUserModel} from '../schema/modules/user/models';
class UserRepository extends RepositoryBase<IUserModel> {
    constructor () {
        super(User);
    }
}
Object.seal(UserRepository);
export = UserRepository;