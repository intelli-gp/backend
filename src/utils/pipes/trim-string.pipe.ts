import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TrimStringsPipe implements PipeTransform {
    transform(value: any) {
        if (typeof value === 'object') {
            for (const key in value) {
                if (typeof value[key] === 'string') {
                    value[key] = value[key].trim();
                } else if (typeof value[key] === 'object') {
                    this.transform(value[key]);
                }
            }
        }
        return value;
    }
}
