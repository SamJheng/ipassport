import { Controller, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllPatientCommand } from '../commands/get-all-patient';
import { GetPatientCommand } from '../commands/get-patient';
import { ResponseResult } from '../../models/respone';

@Controller('patient')
export class PatientController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Get('list')
  async getAllPatient() {
    const list = await this.queryBus.execute(new GetAllPatientCommand());
    const res = new ResponseResult({
      message: 'Get all patient of list',
      result: list,
    });
    return res;
  }
  @Get(':id')
  async getPatientByid(@Param('id') id: string) {
    const patient = await this.queryBus.execute(new GetPatientCommand(id));
    const res = new ResponseResult({
      message: 'Get a patient of ' + id,
      result: patient,
    });
    return res;
  }
}
