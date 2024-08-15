import { Action } from './../../models/action.enum';
export class AddObjectCommand {
  constructor(public readonly name: string) {}
}
