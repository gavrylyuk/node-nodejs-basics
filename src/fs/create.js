import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {

  const dirPath = path.join(__dirname, 'files');
  const filePath = path.join(dirPath, 'fresh.txt');

  try {

    await fs.access(dirPath);

    try {

      await fs.access(filePath);

      throw new Error('FS operation failed');

    } catch (err) {
      
      if (err.code === 'ENOENT') {
        await fs.writeFile(filePath, 'I am fresh and young', 'utf8');
      } else {
        throw new Error('FS operation failed');
      }
    }
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await create();
