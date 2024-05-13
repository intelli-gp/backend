import { Transform } from 'class-transformer';

export function ToLowerCase() {
    return Transform(({ value }: { value: string }) => {
        return value.toLowerCase();
    });
}
