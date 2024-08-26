import { ErrorToMessage, UserExistsException } from '../../lib/utils/errors';
import {
  CreateUserDto,
  CreateExternalUserDto,
  EditUserDto,
} from './../models/User.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/User.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PostgresError } from 'pg-error-enum';
import { SocialExternalProviders } from '../models/SocialExternalProviders.entity';
import { Profile } from '../models/Profile.entity';
import { ErrorResponseResult } from '../../models/respone';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
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
      // Define the error message based on the error code
      let errorMessage = 'Your user profile is invaild, Please check again!'; // Assuming this returns a string message
      let errorCode = HttpStatus.BAD_REQUEST;

      if (error.code === PostgresError.UNIQUE_VIOLATION) {
        errorMessage = `${userDto.email} already exists.`;
        errorCode = HttpStatus.CONFLICT;
      }
      const errRes = new ErrorResponseResult({
        success: false,
        message: errorMessage,
        error: error.message || 'An error occurred',
      });
      this.logger.error(errRes);
      // Throw a customized HttpException with the desired structure
      throw new HttpException(errRes, errorCode);
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
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'External create user is fail, Please check again!',
        error: error.message || 'An error occurred',
      });
      const errorCode = HttpStatus.BAD_REQUEST;
      this.logger.error(errRes);
      throw new HttpException(errRes, errorCode);
    }
  }
  async getUserAndAccessByProviderId(providerId: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          provider: { providerId },
        },
        relations: ['access', 'access.role', 'access.object'],
      });

      if (!user) {
        const errRes = new ErrorResponseResult({
          success: false,
          message: `User with provider ID ${providerId} not found.`,
          error: 'An error occurred',
        });
        throw new NotFoundException(errRes);
      }

      return user;
    } catch (error) {
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'An error occurred while fetching the user.',
        error: error.message || 'An error occurred',
      });
      // Handle unexpected errors
      throw new InternalServerErrorException(errRes);
    }
  }
  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.find({
        relations: ['profile'],
      });
    } catch (error) {
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'An error occurred while fetching users.',
        error: error.message || 'An error occurred',
      });
      throw new InternalServerErrorException(errRes);
    }
  }

  async findOne(id: string): Promise<User | null> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: ['profile'],
      });

      if (!user) {
        const errRes = new ErrorResponseResult({
          success: false,
          message: `User with ID ${id} not found.`,
          error: 'An error occurred',
        });
        throw new NotFoundException(errRes);
      }

      return user;
    } catch (error) {
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'An error occurred while fetching users.',
        error: error.message || 'An error occurred',
      });
      throw new InternalServerErrorException(errRes);
    }
  }
  findByEmail(email) {
    try {
      return this.usersRepository.findOne({
        where: { email },
        relations: ['profile'],
      });
    } catch (error) {
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'Not found Email, Please check again!',
        error: error.message || 'An error occurred',
      });
      const errorCode = HttpStatus.BAD_REQUEST;
      this.logger.error(errRes);
      throw new HttpException(errRes, errorCode);
    }
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
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'Update user and profile is fail, Please check again!',
        error: error.message || 'An error occurred',
      });
      const errorCode = HttpStatus.BAD_REQUEST;
      this.logger.error(errRes);
      throw new HttpException(errRes, errorCode);
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
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'Remove user is fail, Please check again!',
        error: error.message || 'An error occurred',
      });
      const errorCode = HttpStatus.BAD_REQUEST;
      this.logger.error(errRes);
      throw new HttpException(errRes, errorCode);
    }
  }
}
