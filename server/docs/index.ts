import base from './base';
import paths from './paths';
import definitions from './definitions';

const config = {
  ...base,
  paths: { ...paths },
  definitions: { ...definitions },
};

export default config;
