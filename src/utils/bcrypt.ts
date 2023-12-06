import * as bcrypt from 'bcrypt';

export async function hashS10(value: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(value, salt);
}
