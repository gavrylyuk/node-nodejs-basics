import { Worker } from 'node:worker_threads';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
  const numCores = os.cpus().length;
  const startNumber = 10;

  const workerPromises = [];

  for (let i = 0; i < numCores; i++) {
    const n = startNumber + i;

    const promise = new Promise((resolve) => {
      const worker = new Worker(path.join(__dirname, 'worker.js'));

      worker.on('message', (result) => {
        resolve({ status: 'resolved', data: result });
      });

      worker.on('error', () => {
        resolve({ status: 'error', data: null });
      });

      worker.on('exit', (code) => {
        if (code !== 0) resolve({ status: 'error', data: null });
      });

      worker.postMessage(n);
    });

    workerPromises.push(promise);
  }

  const results = await Promise.all(workerPromises);
  console.log(results);
};

await performCalculations();
