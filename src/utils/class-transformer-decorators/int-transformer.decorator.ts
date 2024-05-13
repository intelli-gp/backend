import { Transform } from 'class-transformer';

export function ToInteger() {
    return Transform(({ value }: { value: string }) => {
        return parseInt(value);
    });
}
