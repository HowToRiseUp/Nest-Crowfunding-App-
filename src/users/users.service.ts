import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  getHashPassword = async (password: string) => {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  };

  async create(createUserDto) {
    const { email, password } = createUserDto;
    const hash = await this.getHashPassword(password);
    const user = await this.userModel.create({ email, password: hash });
    return user;
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'Not found';
    const user = await this.userModel.findOne({ _id: id });
    return user;
  }

  async findOneByUsername(user: string) {
    return this.userModel.findOne({ email: user });
  }

  isValidPassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }

  async update(updateUserDto: UpdateUserDto) {
    const user = await this.userModel.updateOne(
      { _id: updateUserDto._id },
      { ...updateUserDto },
    );
    return user;
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'Not found';
    const user = await this.userModel.deleteOne({ _id: id });
    return user;
  }

  async findAll() {
    const user = await this.userModel.find();
    return user;
  }
}
