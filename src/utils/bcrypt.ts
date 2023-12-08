import * as bcrypt from 'bcrypt';

export async function hashS10(value: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(value, salt);
}

export async function encode(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  return hash;
}

export async function compare(
  password: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
