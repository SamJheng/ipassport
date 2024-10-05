import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateAppointmentDTO,
  UpdateAppointmentDTO,
} from '../models/Appointment.dto';
import { Appointments } from '../models/Appointmets.entity';
import { CreateAppointmentCommand } from '../commands/create-appointment';
import { ResponseResult } from '../../models/respone';
import { UpdateAppointmentCommand } from '../commands/update-appointment';
import { HasAccess } from '../../auth/access.guard';

@Controller('appointment')
export class AppointmentsController {
  constructor(private readonly commandBus: CommandBus) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @HasAccess({
    role: 'editor',
    object: 'appointments',
  })
  async create(@Body() createAppointmentDto: CreateAppointmentDTO) {
    const c = await this.commandBus.execute(
      new CreateAppointmentCommand(createAppointmentDto),
    );
    const res = new ResponseResult({
      message: 'Appointment is success! Thank you for your appointment!',
    });
    return res;
  }
  @Put(':id')
  @HasAccess({
    role: 'editor',
    object: 'appointments',
  })
  async update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDTO,
  ) {
    const update = await this.commandBus.execute(
      new UpdateAppointmentCommand(id, updateAppointmentDto),
    );
    const res = new ResponseResult({
      message: 'Update appointment data is success!',
      result: update,
    });
    return res;
  }
}
