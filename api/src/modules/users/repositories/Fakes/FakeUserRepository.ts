import { uuid } from 'uuidv4';
import IUsersRespository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUsersDTO';
import IFindAllProviderDTO from '@modules/users/dtos/IFindAllProviderDTO';

import User from '../../infra/typeorm/entities/User';

class UsersRepository implements IUsersRespository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(u => u.id === id);
    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(u => u.email === email);
    return findUser;
  }

  public async create({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), email, name, password });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(u => u.id === user.id);
    this.users[findIndex] = user;
    return user;
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProviderDTO): Promise<User[]> {
    let { users } = this;
    if (except_user_id) {
      users = this.users.filter(user => user.id !== except_user_id);
    }
    return users;
  }
}

export default UsersRepository;
