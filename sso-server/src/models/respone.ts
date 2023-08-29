// import { ApiProperty } from "@nestjs/swagger";

export class ResponseResult {
  constructor(params: Partial<ResponseResult>) {
    Object.assign(this, params);
  }
  // @ApiProperty()
  success = true;
  // @ApiProperty()
  meassge: string;
  // @ApiProperty()
  result: any;
}
