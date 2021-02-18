import { injectable, inject } from 'tsyringe';

import IUserRespository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}
@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRespository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.userRepository.findAllProviders({
      except_user_id: user_id,
    });

    return users;
  }
}

export default ListProviderService;
