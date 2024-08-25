import { ErrorToMessage, UserExistsException } from '../../lib/utils/errors';
import {
  CreateUserDto,
  CreateExternalUserDto,
  EditUserDto,
} from './../models/User.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/User.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PostgresError } from 'pg-error-enum';
import { SocialExternalProviders } from '../models/SocialExternalProviders.entity';
import { Profile } from '../models/Profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(SocialExternalProviders)
    private externalUserRepository: Repository<SocialExternalProviders>,
  ) {}
  async create(userDto: CreateUserDto): Promise<User> {
    try {
      const user = this.usersRepository.create(userDto);
      const success = await this.usersRepository.save(user);
      return success;
    } catch (error) {
      if (error.code === PostgresError.UNIQUE_VIOLATION) {
        throw new UserExistsException(`${userDto.email} already exists.`);
      }
      throw new HttpException(ErrorToMessage(error), HttpStatus.BAD_REQUEST);
    }
  }
  async createByExternal(
    user: CreateExternalUserDto,
  ): Promise<SocialExternalProviders> {
    try {
      const provider = await this.externalUserRepository.create(user);
      const success = await this.externalUserRepository.save(provider);
      return success;
    } catch (error) {
      console.error(error);
    }
  }
  async getUserByProviderId(providerId: string): Promise<User> {
    return this.usersRepository.findOneBy({
      provider: { providerId },
    });
  }
  async getUserAndAccessByProviderId(providerId: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        provider: { providerId },
      },
      relations: ['access', 'access.role', 'access.object'],
    });
  }
  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['profile'],
    });
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
  }
  findByEmail(email) {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['profile'],
    });
  }
  async update(id: string, userDto: EditUserDto): Promise<User> {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new Error('User not found');
      }
      this.usersRepository.merge(user, userDto);
      const r = await this.usersRepository.save(user);
      return r;
    } catch (error) {
      throw new HttpException(ErrorToMessage(error), HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          id,
        },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const r = await this.usersRepository.remove(user);
      return r;
    } catch (error) {
      throw new HttpException(ErrorToMessage(error), HttpStatus.BAD_REQUEST);
    }
  }
}
