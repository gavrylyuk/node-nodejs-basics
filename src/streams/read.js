import { createReadStream } from 'node:fs';
import { access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

  try {
    await access(filePath);

    const stream = createReadStream(filePath, 'utf8');

    stream.on('error', () => {
      throw new Error('FS operation failed');
    });

    stream.on('data', chunk => {
      process.stdout.write(chunk);
    });

    stream.on('end', () => {
      process.stdout.write('\n');
    });

  } catch (err) {
    throw new Error('FS operation failed');
  }
};


await read();
