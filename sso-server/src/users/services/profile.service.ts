import { Profile } from './../models/Profile.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  // async create(profileData: Partial<Profile>): Promise<Profile> {
  //   try {
  //     const newProfile = this.profileRepository.create(profileData);
  //     return await this.profileRepository.save(newProfile);
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  // }

  // async findOne(id: string): Promise<Profile> {
  //   try {
  //     return await this.profileRepository.findOne({
  //       where: {
  //         user: { id },
  //       },
  //     });
  //   } catch (error) {
  //     return null;
  //   }
  // }

  // async update(id: string, profileData: Partial<Profile>): Promise<Profile> {
  //   try {
  //     const profile = await this.findOne(id);
  //     this.profileRepository.merge(profile, profileData);
  //     return await this.profileRepository.save(profile);
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  // }

  // async remove(id: string): Promise<void> {
  //   try {
  //     const profile = await this.findOne(id);
  //     await this.profileRepository.remove(profile);
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  // }
}
