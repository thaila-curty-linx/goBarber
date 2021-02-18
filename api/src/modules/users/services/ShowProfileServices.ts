import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserRespository from '@modules/users/repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}
@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRespository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    return this.userRepository.save(user);
  }
}

export default ShowProfileService;
