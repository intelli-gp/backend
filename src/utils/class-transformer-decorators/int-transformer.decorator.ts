import { Transform } from 'class-transformer';

export function ToInteger() {
  return Transform(({ value }: { value: string }) => {
    return Number(value);
  });
}
