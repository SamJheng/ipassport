import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { HasAccess } from '../../auth/access.guard';
import { ResponseResult } from '../../models/respone';
import { GetAllDoctorCommand } from '../commands/get-all-doctor';
import { GetDoctorCommand } from '../commands/get-doctor';
import { DeleteDoctorCommand } from '../commands/delete-doctor';
import { UpdateDoctorCommand } from '../commands/update-doctor';
import { UpdateDoctorDTO } from '../models/Doctor.dto';
import { RemoveScheduleCommand } from '../commands/remove-schedule';

@Controller('doctor')
export class DoctorController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Get('')
  @HasAccess({
    role: 'reader',
    object: 'doctor',
  })
  async getAllDoctor() {
    const list = await this.queryBus.execute(new GetAllDoctorCommand());
    const res = new ResponseResult({
      message: 'Get all doctor of list',
      result: list,
    });
    return res;
  }
  @Get(':id')
  @HasAccess({
    role: 'guest',
    object: 'doctor',
  })
  async getDoctorByid(@Param('id') id: string) {
    const patient = await this.queryBus.execute(new GetDoctorCommand(id));
    const res = new ResponseResult({
      message: 'Get a doctor of ' + id,
      result: patient,
    });
    return res;
  }
  @Delete(':id')
  @HasAccess({
    role: 'editor',
    object: 'doctor',
  })
  async deleteDoctorByid(@Param('id') id: string) {
    await this.commandBus.execute(new DeleteDoctorCommand(id));
    const res = new ResponseResult({
      message: 'Delete a doctor ' + id + 'success!',
    });
    return res;
  }
  @Put(':id')
  @HasAccess({
    role: 'editor',
    object: 'doctor',
  })
  async updatePatientById(
    @Param('id') id: string,
    @Body() updateBodyDto: UpdateDoctorDTO,
  ) {
    await this.commandBus.execute(new UpdateDoctorCommand(id, updateBodyDto));
    const res = new ResponseResult({
      message: `Successfully updated doctor with ID ${id}!`,
      success: true,
    });
    return res;
  }
  @Delete('schedule/:id')
  @HasAccess({
    role: 'editor',
    object: 'doctor',
  })
  async removeDoctorSchedule(@Param('id') id: string) {
    await this.commandBus.execute(new RemoveScheduleCommand(id));
    const res = new ResponseResult({
      message: `Successfully delete doctor schedule with ID ${id}!`,
      success: true,
    });
    return res;
  }
}
