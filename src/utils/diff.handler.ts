export function getObjectDiff(obj1: any, obj2: any): any {
    const diff: object = {};

    for (const key in obj1) {
        if (Object.prototype.hasOwnProperty.call(obj1, key)) {
            if (obj2.hasOwnProperty(key) && obj1[key] !== obj2[key]) {
                diff[key] = [obj1[key], obj2[key]];
            } else if (typeof obj1[key] === 'object') {
                const nestedDiff = getObjectDiff(obj1[key], obj2[key]);
                if (Object.keys(nestedDiff).length > 0) {
                    diff[key] = nestedDiff;
                }
            }
        }
    }

    return diff;
}
