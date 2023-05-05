import multer from 'multer';
import path from 'path';

const uploads = multer({
  dest: `${path.resolve(__dirname, '../..')}/uploads`,
});

export default uploads;
