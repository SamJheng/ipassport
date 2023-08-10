export enum ExceptionName {
  UserExistsException = 'UserExistsException',
  FileTypeNotSupportException = 'FileTypeNotSupportException',
}
export class UserExistsException extends Error {
  constructor(message) {
    super(message);
    this.name = ExceptionName.UserExistsException;
  }
}
export class FileTypeNotSupportException extends Error {
  constructor(message) {
    super(message);
    this.name = ExceptionName.FileTypeNotSupportException;
  }
}

export function ErrorToMessage(error: Error) {
  const err = error?.message ? error?.message : JSON.stringify(error);
  return err;
}
