import { Transform } from 'node:stream';

const transform = async () => {
  const transform = new Transform({
    transform(chunk, encoding, callback) {
      const reversed = chunk.toString().split('').reverse().join('');
      this.push(reversed);
      callback();
    }
  });

  console.log('Type something. Press Ctrl+Enter (on Windows) to finish.');

  process.stdin.pipe(transform).pipe(process.stdout);
};

await transform();
