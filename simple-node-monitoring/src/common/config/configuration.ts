import * as fs from 'fs';
import * as yaml from 'js-yaml';

const env = process.env.NODE_ENV || 'local';
const config = yaml.load(fs.readFileSync(`${__dirname}/../../../${env}.yaml`, 'utf8')) as Record<string, any>;

export default () => config;
