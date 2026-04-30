import heicConvert from 'heic-convert';
import { readFile, writeFile, readdir } from 'fs/promises';
import { join, extname, basename } from 'path';

const dir = './3br';
const files = (await readdir(dir)).filter(f => f.toLowerCase().endsWith('.heic'));
console.log(`Converting ${files.length} HEIC files...`);

for (const file of files) {
  const inPath  = join(dir, file);
  const outPath = join(dir, basename(file, extname(file)) + '.jpeg');
  try {
    const input  = await readFile(inPath);
    const output = await heicConvert({ buffer: input, format: 'JPEG', quality: 0.88 });
    await writeFile(outPath, output);
    console.log(`✓ ${file}`);
  } catch (e) {
    console.error(`✗ ${file}: ${e.message}`);
  }
}
console.log('Done.');
