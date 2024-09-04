import { Controller, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetPatientCommand } from '../commands/get-patient';

@Controller('patient')
export class PatientController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Get()
  async getAllPatient() {
    const list = await this.queryBus.execute(new GetPatientCommand());
    return list;
  }
}
