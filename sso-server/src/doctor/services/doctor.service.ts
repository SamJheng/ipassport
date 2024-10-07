import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../users/models/User.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorResponseResult } from '../../models/respone';
import { UpdateDoctorDTO } from '../models/Doctor.dto';
@Injectable()
export class DoctorService {
  private readonly logger = new Logger(DoctorService.name);
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async getAll(): Promise<User[]> {
    try {
      const users = await this.usersRepository.find({
        relations: [
          'profile',
          'profile.roleType',
          'doctorInfo.weeklySchedules',
        ],
        where: {
          profile: {
            roleType: {
              name: 'doctor',
            },
          },
        },
      });
      return users;
    } catch (error) {
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'An error occurred while fetching patient.',
        error: error.message || 'An error occurred',
      });
      throw new InternalServerErrorException(errRes);
    }
  }
  async getDoctorById(id: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({
        relations: [
          'profile',
          'profile.roleType',
          'doctorInfo',
          'doctorInfo.weeklySchedules',
        ],
        where: {
          id,
          profile: {
            roleType: {
              name: 'doctor',
            },
          },
        },
      });
      if (!user) {
        const errRes = new ErrorResponseResult({
          success: false,
          message: `Doctor with ID ${id} not found.`,
          error: 'An error occurred',
        });
        throw new NotFoundException(errRes);
      }
      return user;
    } catch (error) {
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'An error occurred while fetching patient.',
        error: error.message || 'An error occurred',
      });
      throw new InternalServerErrorException(errRes);
    }
  }
  async removeDoctorById(id: string): Promise<User> {
    try {
      const user = await this.getDoctorById(id);
      if (!user) {
        const errRes = new ErrorResponseResult({
          success: false,
          message: `Doctor with ID ${id} not found.`,
          error: 'An error occurred',
        });
        throw new NotFoundException(errRes);
      }
      user.isDelete = true;
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'Delete Doctor is fail, Please check again!',
        error: error.message || 'An error occurred',
      });
      const errorCode = HttpStatus.BAD_REQUEST;
      this.logger.error(errRes);
      throw new HttpException(errRes, errorCode);
    }
  }
  async updateDoctorById(
    id: string,
    updateDto: UpdateDoctorDTO,
  ): Promise<User> {
    try {
      const user = await this.getDoctorById(id);
      if (!user) {
        const errRes = new ErrorResponseResult({
          success: false,
          message: `Doctor with ID ${id} not found.`,
          error: 'An error occurred',
        });
        throw new NotFoundException(errRes);
      }
      const merge = this.usersRepository.merge(user, updateDto);
      return await this.usersRepository.save(merge);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'Update Doctor failed, Please check again!',
        error: error.message || 'An error occurred',
      });
      const errorCode = HttpStatus.BAD_REQUEST;
      this.logger.error(errRes);
      throw new HttpException(errRes, errorCode);
    }
  }
}
