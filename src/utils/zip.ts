import * as Admzip from 'adm-zip';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export const extractDirectory = (zipPath: string, destination: string) => {
  const zip = new Admzip(zipPath);
  const entries = zip.getEntries();

  entries.forEach((entry) => {
    if (entry.isDirectory) {
      mkdirSync(join(destination, entry.entryName), { recursive: true });
      return;
    }

    writeFileSync(join(destination, entry.entryName), entry.getData());
  });
};
