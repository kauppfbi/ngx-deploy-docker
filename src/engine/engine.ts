import { logging } from '@angular-devkit/core';

import { Schema } from '../deploy/schema';

import * as child_process from 'child_process';

async function buildDockerImage(options: Schema, logger: logging.LoggerApi) {
  // context.reportStatus(`Executing "docker build"...`);
  const child = child_process.spawn(
    'docker',
    ['build', '-t', 'kauppfbi/test', '.'],
    {
      stdio: 'pipe'
    }
  );

  child.stdout.on('data', data => {
    logger.info(data.toString());
  });
  child.stderr.on('data', data => {
    logger.error(data.toString());
  });

  return new Promise(resolve => {
    // context.reportStatus(`Done.`);
    child.on('close', code => {
      resolve();
    });
  });
}

async function publishDockerImage(options: Schema, logger: logging.LoggerApi) {
  const child = child_process.spawn(
    'docker',
    ['push', 'kauppfbi/test:latest'],
    {
      stdio: 'pipe'
    }
  );

  child.stdout.on('data', data => {
    logger.info(data.toString());
  });
  child.stderr.on('data', data => {
    logger.error(data.toString());
  });

  return new Promise(resolve => {
    // context.reportStatus(`Done.`);
    child.on('close', code => {
      resolve();
    });
  });
}

export async function run(options: Schema, logger: logging.LoggerApi) {
  try {
    logger.info('🚧 Executing Docker Build...');
    await buildDockerImage(options, logger);
    logger.info('✔️ Docker Build was successfully');

    logger.info('🚀 Publishing image to registry');
    await publishDockerImage(options, logger);
    logger.info('🎊 Successfully published image. Have a nice day.');
  } catch (error) {
    logger.error('❌ An error occurred!');
    throw error;
  }
}
