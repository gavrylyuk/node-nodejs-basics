const parseArgs = () => {
  const args = process.argv.slice(2);

  const output = args.reduce((acc, curr, index, array) => {
    if (curr.startsWith('--')) {
      const key = curr.slice(2);
      const value = array[index + 1];
      acc.push(`${key} is ${value}`);
    }
    return acc;
  }, []);

  console.log(output.join(', '));
};

parseArgs();
