import {
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Access } from '../models/Access.entity';
import { GrantingAccess } from '../models/User.dto';
import { Role } from '../models/Role.entity';
import { ObjectAccess } from '../../models/ObjectAccess.entity';
import { ErrorResponseResult } from '../../models/respone';
@Injectable()
export class AccessService {
  private readonly logger = new Logger(AccessService.name);
  constructor(
    @InjectRepository(Access)
    private accessRepository: Repository<Access>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(ObjectAccess)
    private objectAccessRepository: Repository<ObjectAccess>,
  ) {}

  async create(accessData: GrantingAccess): Promise<Access> {
    try {
      const newAccess = this.accessRepository.create(accessData);
      const access = await this.accessRepository.save(newAccess);
      // return this.update(access.id, accessData);
      return access;
    } catch (error) {
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'Create access is fail, Please check again!',
        error: error.message || 'An error occurred',
      });
      const errorCode = HttpStatus.BAD_REQUEST;
      this.logger.error(errRes);
      throw new HttpException(errRes, errorCode);
    }
  }
  async getObjects(): Promise<ObjectAccess[]> {
    try {
      const objects = await this.objectAccessRepository.find();
      return objects;
    } catch (error) {
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'An error occurred while fetching the objects.',
        error: error.message || 'An error occurred',
      });
      // Handle unexpected errors
      throw new InternalServerErrorException(errRes);
    }
  }
  async addObjectAccess(name: string) {
    try {
      const newObjectAccess = this.objectAccessRepository.create({
        name,
      });
      const objectAccess = await this.objectAccessRepository.save(
        newObjectAccess,
      );
      return objectAccess;
    } catch (error) {
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'Add object access is fail, Please check again!',
        error: error.message || 'An error occurred',
      });
      const errorCode = HttpStatus.BAD_REQUEST;
      this.logger.error(errRes);
      throw new HttpException(errRes, errorCode);
    }
  }
  async updateObjectAccess(id: string, name: string) {
    try {
      const objectAccess = await this.objectAccessRepository.findOne({
        where: {
          id,
        },
      });
      objectAccess.name = name;
      return await this.objectAccessRepository.save(objectAccess);
    } catch (error) {
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'update object access  is fail, Please check again!',
        error: error.message || 'An error occurred',
      });
      const errorCode = HttpStatus.BAD_REQUEST;
      this.logger.error(errRes);
      throw new HttpException(errRes, errorCode);
    }
  }
  async deleteObjectAccess(id: string) {
    try {
      const objectAccess = await this.objectAccessRepository.findOne({
        where: {
          id,
        },
      });
      await this.objectAccessRepository.remove(objectAccess);
    } catch (error) {
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'delect object access is fail, Please check again!',
        error: error.message || 'An error occurred',
      });
      const errorCode = HttpStatus.BAD_REQUEST;
      this.logger.error(errRes);
      throw new HttpException(errRes, errorCode);
    }
  }
  async addRole(name: string) {
    try {
      const newRole = this.roleRepository.create({
        name,
      });
      const role = await this.roleRepository.save(newRole);
      return role;
    } catch (error) {
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'Add role is fail, Please check again!',
        error: error.message || 'An error occurred',
      });
      const errorCode = HttpStatus.BAD_REQUEST;
      this.logger.error(errRes);
      throw new HttpException(errRes, errorCode);
    }
  }
  async getAllRole(): Promise<Role[]> {
    try {
      const allRole = await this.roleRepository.find();
      return allRole;
    } catch (error) {
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'Get roles is fail, Please check again!',
        error: error.message || 'An error occurred',
      });
      const errorCode = HttpStatus.INTERNAL_SERVER_ERROR;
      this.logger.error(errRes);
      throw new HttpException(errRes, errorCode);
    }
  }
  async getAllAccess(): Promise<Access[]> {
    try {
      const allAccess = await this.accessRepository.find({
        relations: ['role', 'object'],
      });
      return allAccess;
    } catch (error) {
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'An error occurred while fetching the access.',
        error: error.message || 'An error occurred',
      });
      // Handle unexpected errors
      throw new InternalServerErrorException(errRes);
    }
  }
  async getAccessByUserId(userId: string): Promise<Access[]> {
    try {
      const access = await this.accessRepository.find({
        where: { user: { id: userId } },
        relations: ['role', 'object'],
      });

      return access;
    } catch (error) {
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'An error occurred while fetching access.',
        error: error.message || 'An error occurred',
      });
      throw new InternalServerErrorException(errRes);
    }
  }
  async findOne(id: string): Promise<Access> {
    try {
      const access = await this.accessRepository.findOne({
        where: { id },
      });

      if (!access) {
        const errRes = new ErrorResponseResult({
          success: false,
          message: `Access with ID ${id} not found.`,
          error: 'An error occurred',
        });
        throw new NotFoundException(errRes);
      }

      return access;
    } catch (error) {
      // Differentiating between not found and other potential errors
      if (error instanceof NotFoundException) {
        throw error;
      }
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'An error occurred while fetching access.',
        error: error.message || 'An error occurred',
      });
      throw new InternalServerErrorException(errRes);
    }
  }
  async findByRoleAndObject(roleid: string, objid: string, userid: string) {
    try {
      return await this.accessRepository.findOne({
        where: {
          role: { id: roleid },
          object: { id: objid },
          user: { id: userid },
        },
        // relations: ['role', 'object'],
      });
    } catch (error) {
      throw new HttpException('Access not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, accessData: GrantingAccess): Promise<Access> {
    try {
      const access = await this.findOne(id);
      this.accessRepository.merge(access, accessData);
      return await this.accessRepository.save(access);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const access = await this.findOne(id);
      await this.accessRepository.remove(access);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
