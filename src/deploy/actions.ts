import { BuildTarget } from './../interfaces';
import {
  BuilderContext,
  targetFromTargetString,
} from '@angular-devkit/architect';
import { json, logging } from '@angular-devkit/core';

import { Schema } from './schema';

export default async function deploy(
  engine: {
    run: (options: Schema, logger: logging.LoggerApi) => Promise<void>;
  },
  context: BuilderContext,
  buildTarget: BuildTarget,
  options: Schema
) {
  // 1. BUILD
  if (options.noBuild) {
    context.logger.info(`📦 Skipping build`);
  } else {
    if (!context.target) {
      throw new Error('Cannot execute the build target');
    }

    const overrides = {
      ...(options.baseHref && { baseHref: options.baseHref }),
    };

    context.logger.info(`📦 Building "${context.target.project}"`);
    context.logger.info(`📦 Build target "${buildTarget.name}"`);

    const build = await context.scheduleTarget(
      targetFromTargetString(buildTarget.name),
      {
        ...buildTarget.options,
        ...overrides,
      }
    );
    const buildResult = await build.result;

    if (!buildResult.success) {
      throw new Error('Error while building the app.');
    }
  }

  // 2. DEPLOYMENT

  if (!options.imageName) {
    options.imageName = await context.target?.project;
  }

  await engine.run(options, (context.logger as unknown) as logging.LoggerApi);
}
