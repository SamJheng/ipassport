import { Action } from './../../models/action.enum';
export class AddRolerCommand {
  constructor(public readonly name: Action) {}
}
