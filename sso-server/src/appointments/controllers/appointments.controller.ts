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
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from '../models/Appointment.dto';
import { Appointments } from '../models/Appointmets.entity';
import { CreateAppointmentCommand } from '../commands/create-appointment';
import { ResponseResult } from '../../models/respone';
import { UpdateAppointmentCommand } from '../commands/update-appointment';

@Controller('appointment')
export class AppointmentsController {
  constructor(private readonly commandBus: CommandBus) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    const c = await this.commandBus.execute(
      new CreateAppointmentCommand(createAppointmentDto),
    );
    const res = new ResponseResult({
      message: 'Appointment is success! Thank you for your appointment!',
    });
    return res;
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
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
