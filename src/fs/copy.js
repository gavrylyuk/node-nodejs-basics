import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
  const srcDir = path.join(__dirname, 'files');
  const destDir = path.join(__dirname, 'files_copy');

  try {

    await fs.access(srcDir);

    try {

      await fs.access(destDir);

      throw new Error('FS operation failed');

    } catch (err) {

      if (err.code !== 'ENOENT') {
        throw new Error('FS operation failed');
      }
    }

    await fs.cp(srcDir, destDir, { recursive: true });

  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await copy();
