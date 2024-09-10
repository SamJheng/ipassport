import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/models/User.entity';
import { Repository } from 'typeorm';
import { ErrorResponseResult } from '../../models/respone';
import { UpdatePatientDTO } from '../models/Patient.dto';

@Injectable()
export class PatientService {
  private readonly logger = new Logger(PatientService.name);
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async getAll() {
    try {
      const patients = await this.usersRepository.find({
        relations: ['profile', 'profile.roleType'],
        where: {
          profile: {
            roleType: {
              name: 'patient',
            },
          },
        },
      });
      return patients;
    } catch (error) {
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'An error occurred while fetching patient.',
        error: error.message || 'An error occurred',
      });
      throw new InternalServerErrorException(errRes);
    }
  }
  async getPatientById(id: string) {
    try {
      const patient = await this.usersRepository.findOne({
        relations: ['profile', 'profile.roleType'],
        where: {
          id,
          profile: {
            roleType: {
              name: 'patient',
            },
          },
        },
      });
      if (!patient) {
        const errRes = new ErrorResponseResult({
          success: false,
          message: `Patient with ID ${id} not found.`,
          error: 'An error occurred',
        });
        throw new NotFoundException(errRes);
      }
      return patient;
    } catch (error) {
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'An error occurred while fetching patient.',
        error: error.message || 'An error occurred',
      });
      throw new InternalServerErrorException(errRes);
    }
  }
  async removePatientById(id: string) {
    try {
      const patient = await this.getPatientById(id);
      if (!patient) {
        const errRes = new ErrorResponseResult({
          success: false,
          message: `Patient with ID ${id} not found.`,
          error: 'An error occurred',
        });
        throw new NotFoundException(errRes);
      }
      patient.isDelete = true;
      return await this.usersRepository.save(patient);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'Delete Patient is fail, Please check again!',
        error: error.message || 'An error occurred',
      });
      const errorCode = HttpStatus.BAD_REQUEST;
      this.logger.error(errRes);
      throw new HttpException(errRes, errorCode);
    }
  }
  async updatePatientById(id: string, updatePatientDto: UpdatePatientDTO) {
    try {
      const patient = await this.getPatientById(id);
      if (!patient) {
        const errRes = new ErrorResponseResult({
          success: false,
          message: `Patient with ID ${id} not found.`,
          error: 'An error occurred',
        });
        throw new NotFoundException(errRes);
      }

      // Update patient fields with the values from updatePatientDto
      // Object.assign(patient, updatePatientDto);
      const merge = this.usersRepository.merge(patient, updatePatientDto);
      return await this.usersRepository.save(merge);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'Update Patient failed, Please check again!',
        error: error.message || 'An error occurred',
      });
      const errorCode = HttpStatus.BAD_REQUEST;
      this.logger.error(errRes);
      throw new HttpException(errRes, errorCode);
    }
  }
}
