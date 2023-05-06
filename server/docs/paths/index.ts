import auth from './auth';
import blog from './blog';
import files from './files';

const paths = {
  ...auth,
  ...blog,
  ...files,
};

export default paths;
