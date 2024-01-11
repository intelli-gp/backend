import { genSalt, hash, compare as bcryptCompare } from 'bcryptjs';

export async function hashS10(value: string) {
  const salt = await genSalt(10);
  return await hash(value, salt);
}

export async function compare(
  original: string,
  hash: string,
): Promise<boolean> {
  return await bcryptCompare(original, hash);
}
