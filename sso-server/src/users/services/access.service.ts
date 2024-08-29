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
import { GrantingAccess, UpdateAccess } from '../models/Access.dto';
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

  async grantingAccess(accessData: GrantingAccess): Promise<Access> {
    try {
      const userAccess = await this.getAccessByUserId(accessData.user.id);
      if (userAccess.find((i) => i.object.id === accessData.object.id)) {
        const errRes = new ErrorResponseResult({
          success: false,
          message: `Access object ${accessData.object.id} has be exist. Please update your Access object`,
          error: 'An error occurred',
        });
        throw new NotFoundException(errRes);
      }
      const newAccess = this.accessRepository.create(accessData);
      const access = await this.accessRepository.save(newAccess);
      // return this.update(access.id, accessData);
      return access;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'Create access is fail, Please check again!',
        error: error.message || 'An error occurred',
      });
      this.logger.error(errRes);
      throw new HttpException(errRes, HttpStatus.BAD_REQUEST);
    }
  }
  async updateAccess(accessData: UpdateAccess) {
    try {
      const access = await this.findAccess(accessData.id);
      if (!access) {
        const errRes = new ErrorResponseResult({
          success: false,
          message: `Access with ID ${accessData.id} not found.`,
          error: 'An error occurred',
        });
        throw new NotFoundException(errRes);
      }
      // const merge = await this.accessRepository.merge(access, accessData);
      access.object = accessData.object as ObjectAccess;
      access.role = accessData.role as Role;
      const r = await this.accessRepository.save(access);
      return r;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'Update access is fail, Please check again!',
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
  async findAccess(id: string): Promise<Access> {
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

  async deleteAccess(id: string): Promise<void> {
    try {
      const access = await this.findAccess(id);
      await this.accessRepository.remove(access);
    } catch (error) {
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'An error occurred while delete access.',
        error: error.message || 'An error occurred',
      });
      throw new InternalServerErrorException(errRes);
    }
  }
  async getObjectAccessById(id: string) {
    try {
      const object = await this.objectAccessRepository.findOne({
        where: { id },
      });
      if (!object) {
        const errRes = new ErrorResponseResult({
          success: false,
          message: `Object with ID ${id} not found.`,
          error: 'An error occurred',
        });
        throw new NotFoundException(errRes);
      }
      return object;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'An error occurred while get object access by id.',
        error: error.message || 'An error occurred',
      });
      throw new InternalServerErrorException(errRes);
    }
  }
  getRoleById(id: string) {
    try {
      const role = this.roleRepository.findOne({
        where: { id },
      });
      if (!role) {
        const errRes = new ErrorResponseResult({
          success: false,
          message: `Role with ID ${id} not found.`,
          error: 'An error occurred',
        });
        throw new NotFoundException(errRes);
      }
      return role;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      const errRes = new ErrorResponseResult({
        success: false,
        message: 'An error occurred while get role by id.',
        error: error.message || 'An error occurred',
      });
      throw new InternalServerErrorException(errRes);
    }
  }
}
