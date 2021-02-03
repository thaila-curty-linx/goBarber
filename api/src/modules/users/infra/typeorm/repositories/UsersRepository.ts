import { getRepository, Repository } from 'typeorm';

import IUserRespository from '@modules/users/repositories/IUsersRepository';
import ICreateUsertDTO from '@modules/users/dtos/ICreateUsersDTO';
import User from '../entities/User';

class UsersRepository extends Repository<User> implements IUserRespository {
  private ormRepository: Repository<User>;

  constructor() {
    super();
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { email },
    });

    return findUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne(id);

    return findUser;
  }

  public async create(data: ICreateUsertDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
