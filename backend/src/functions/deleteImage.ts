import * as fsPromises from 'fs/promises';

const deleteImage = async (filename: string) => {
  try {
    await fsPromises.unlink('./uploads/' + filename);
  } catch (_err) {}
};

export default deleteImage;
