import { logging } from '@angular-devkit/core';

import { Schema } from '../deploy/schema';

export async function run(
  dir: string,
  options: Schema,
  logger: logging.LoggerApi
) {
  try {
    /*  options.targetDir = options.targetDir || '/example-folder';

    if (!(await fse.pathExists(options.targetDir))) {
      throw new Error(`Target directory ${options.targetDir} does not exist!`);
    }

    await fse.copy(dir, options.targetDir); */

    logger.info('🚀 Successfully published image');
  } catch (error) {
    logger.error('❌ An error occurred!');
    throw error;
  }
}
