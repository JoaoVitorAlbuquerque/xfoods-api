import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  getUserById(userId: string) {
    return this.usersRepo.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async findAll() {
    // const IsUserAdmin = await this.usersRepo.findMany({
    //   where: { role: 'ADMIN' },
    // });

    // if (!IsUserAdmin) {
    //   throw new Error('User not is ADMIN');
    // }

    return await this.usersRepo.findMany({
      where: { role: 'WAITER' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const { name, email, password, role } = updateUserDto;

    const emailTaken = await this.usersRepo.findUnique({
      where: { email },
    });

    if (emailTaken) {
      throw new ConflictException('This email is already in use.');
    }

    const hashedPassword = await hash(password, 12);

    return this.usersRepo.update({
      where: { id: userId },
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });
  }

  async remove(userId: string) {
    await this.usersRepo.delete({
      where: { id: userId },
    });

    return null;
  }
}
