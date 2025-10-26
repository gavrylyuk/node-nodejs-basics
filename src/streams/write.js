import { createWriteStream } from 'node:fs';
import { access, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
  const dirPath = path.join(__dirname, 'files');
  const filePath = path.join(dirPath, 'fileToWrite.txt');

  try {
    await mkdir(dirPath, { recursive: true });

    const writeStream = createWriteStream(filePath, { encoding: 'utf8' });

    writeStream.on('error', () => {
      throw new Error('FS operation failed');
    });

    console.log('Start typing in console. Press Ctrl+C (on Windows) to finish.');

    process.stdin.pipe(writeStream);

    writeStream.on('finish', () => console.log(`Data successfully written to ${filePath}`));

  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await write();
