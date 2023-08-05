import * as bcrypt from 'bcrypt';
export async function getSaltHashByPassWord(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
}
export async function isMatchPasswordByHash(
  password: string,
  hash: string,
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}
