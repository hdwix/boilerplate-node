import * as path from 'path';
import * as fs from 'fs';
import { parse } from 'yaml'

export default () => {
  const environment = process.env.NODE_ENV || 'local';
  const configPath = path.resolve(__dirname, `../../../config/${environment}.yaml`);
  if (fs.existsSync(configPath)) {
    const fileContent = fs.readFileSync(configPath, 'utf8');
    return parse(fileContent);
  } else {
    throw new Error(`Configuration file not found at path: ${configPath}`);
  }
};
