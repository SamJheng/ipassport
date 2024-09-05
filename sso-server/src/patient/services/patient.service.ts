import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/models/User.entity';
import { Repository } from 'typeorm';
import { ErrorResponseResult } from '../../models/respone';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async getAll() {
    try {
      return await this.usersRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.access', 'access')
        .leftJoinAndSelect('user.profile', 'profile')
        .leftJoinAndSelect('user.patientInfo', 'patientInfo')
        .leftJoinAndSelect('access.role', 'role')
        .leftJoinAndSelect('access.object', 'object')
        .where('object.name = :objectName', { objectName: 'patient' })
        .andWhere('role.name = :roleName', { roleName: 'guest' })
        .getMany();
    } catch (error) {
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'An error occurred while fetching users.',
        error: error.message || 'An error occurred',
      });
      throw new InternalServerErrorException(errRes);
    }
  }
  async getPatientById(id: string) {
    try {
      return await this.usersRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.access', 'access')
        .leftJoinAndSelect('user.profile', 'profile')
        .leftJoinAndSelect('user.patientInfo', 'patientInfo')
        .leftJoinAndSelect('access.role', 'role')
        .leftJoinAndSelect('access.object', 'object')
        .where('user.id = :id', { id })
        .andWhere('object.name = :objectName', { objectName: 'patient' })
        .andWhere('role.name = :roleName', { roleName: 'guest' })
        .getOne();
    } catch (error) {
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'An error occurred while fetching users.',
        error: error.message || 'An error occurred',
      });
      throw new InternalServerErrorException(errRes);
    }
  }
}
