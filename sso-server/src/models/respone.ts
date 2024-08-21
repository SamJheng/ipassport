// import { ApiProperty } from "@nestjs/swagger";

export class ResponseResult<T = any> {
  constructor(params: Partial<ResponseResult<T>>) {
    Object.assign(this, params);
  }
  // @ApiProperty()
  success = true;
  // @ApiProperty()
  meassge = '';
  // @ApiProperty()
  result: T | null = null;
}
