import { Controller, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllPatientCommand } from '../commands/get-all-patient';

@Controller('patient')
export class PatientController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Get('list')
  async getAllPatient() {
    const list = await this.queryBus.execute(new GetAllPatientCommand());
    return list;
  }
}
