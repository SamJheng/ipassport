import { Access } from './../../users/models/Access.entity';

export function toScope(accessList: Access[]): string[] {
  try {
    const scopeList = accessList.map((access) => {
      const scope = `${access.role.name}:${access.object.name}`;
      return scope;
    });
    return scopeList;
  } catch (error) {
    return [];
  }
}
