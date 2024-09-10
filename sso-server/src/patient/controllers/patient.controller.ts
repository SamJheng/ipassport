import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllPatientCommand } from '../commands/get-all-patient';
import { GetPatientCommand } from '../commands/get-patient';
import { ResponseResult } from '../../models/respone';
import { DeletePatientCommand } from '../commands/delete-patient';
import { UpdatePatientCommand } from '../commands/update-patient';
import { UpdatePatientDTO } from '../models/Patient.dto';
import { HasAccess } from '../../auth/access.guard';

@Controller('patient')
export class PatientController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Get('')
  @HasAccess({
    role: 'reader',
    object: 'patient',
  })
  async getAllPatient() {
    const list = await this.queryBus.execute(new GetAllPatientCommand());
    const res = new ResponseResult({
      message: 'Get all patient of list',
      result: list,
    });
    return res;
  }
  @Get(':id')
  @HasAccess({
    role: 'guest',
    object: 'patient',
  })
  async getPatientByid(@Param('id') id: string) {
    const patient = await this.queryBus.execute(new GetPatientCommand(id));
    const res = new ResponseResult({
      message: 'Get a patient of ' + id,
      result: patient,
    });
    return res;
  }
  @Delete(':id')
  @HasAccess({
    role: 'editor',
    object: 'patient',
  })
  async deletePatientByid(@Param('id') id: string) {
    await this.commandBus.execute(new DeletePatientCommand(id));
    const res = new ResponseResult({
      message: 'Delete a patient ' + id + 'success!',
    });
    return res;
  }
  @Put(':id')
  @HasAccess({
    role: 'editor',
    object: 'patient',
  })
  async updatePatientById(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDTO,
  ) {
    await this.commandBus.execute(
      new UpdatePatientCommand(id, updatePatientDto),
    );
    const res = new ResponseResult({
      message: `Successfully updated patient with ID ${id}!`,
      success: true,
    });
    return res;
  }
}
