import base from './base.json';
import paths from './paths.json';
import definitions from './definitions.json';

const config = {
  ...base,
  paths: { ...paths },
  definitions: { ...definitions }
}

export default config;