// import { ApiProperty } from "@nestjs/swagger";

export class ResponseResult<T = any> {
  constructor(params: Partial<ResponseResult<T>>) {
    Object.assign(this, params);
  }
  // @ApiProperty()
  success = true;
  // @ApiProperty()
  meassge: string = '';
  // @ApiProperty()
  result: T | null= null;
}
export class ErrorResponseResult extends ResponseResult {
  constructor(params: Partial<ErrorResponseResult>) {
    super(params);
    Object.assign(this, params);
  }
  error!: string;
}
