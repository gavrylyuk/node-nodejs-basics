import { createReadStream, createWriteStream } from 'node:fs';
import { access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import { createGunzip } from 'node:zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
  const dirPath = path.join(__dirname, 'files');
  const inputPath = path.join(dirPath, 'archive.gz');
  const outputPath = path.join(dirPath, 'fileToCompress.txt');

  try {
    await access(inputPath);

    const gunzip = createGunzip();
    const source = createReadStream(inputPath);
    const destination = createWriteStream(outputPath);

    await pipeline(source, gunzip, destination);

  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await decompress();
