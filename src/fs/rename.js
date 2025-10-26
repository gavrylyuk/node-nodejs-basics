import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
  const dirPath = path.join(__dirname, 'files');
  const oldPath = path.join(dirPath, 'wrongFilename.txt');
  const newPath = path.join(dirPath, 'properFilename.md');

  try {
    await fs.access(oldPath);

    try {
      await fs.access(newPath);
      throw new Error('FS operation failed');
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw new Error('FS operation failed');
      }
    }

    await fs.rename(oldPath, newPath);
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await rename();
