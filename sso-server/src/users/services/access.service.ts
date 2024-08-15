import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Access } from '../models/Access.entity';
import { GrantingAccess } from '../models/User.dto';
import { Role } from '../models/Role.entity';

@Injectable()
export class AccessService {
  constructor(
    @InjectRepository(Access)
    private accessRepository: Repository<Access>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(accessData: GrantingAccess): Promise<Access> {
    try {
      const newAccess = this.accessRepository.create(accessData);
      const access = await this.accessRepository.save(newAccess);
      // return this.update(access.id, accessData);
      return access;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async addRole(name: string) {
    try {
      const newRole = this.roleRepository.create({
        name,
      });
      const role = await this.accessRepository.save(newRole);
      return role;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Access> {
    try {
      return await this.accessRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException('Access not found', HttpStatus.NOT_FOUND);
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
