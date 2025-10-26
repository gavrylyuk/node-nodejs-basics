import { createReadStream, createWriteStream } from 'node:fs';
import { access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
  const dirPath = path.join(__dirname, 'files');
  const inputPath = path.join(dirPath, 'fileToCompress.txt');
  const outputPath = path.join(dirPath, 'archive.gz');

  try {
    await access(inputPath);

    const gzip = createGzip();
    const source = createReadStream(inputPath);
    const destination = createWriteStream(outputPath);

    await pipeline(source, gzip, destination);

  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await compress();
