import { BuilderContext } from '@angular-devkit/architect';
import { json, logging } from '@angular-devkit/core';

import { Schema } from './schema';

export default async function deploy(
  engine: {
    run: (options: Schema, logger: logging.LoggerApi) => Promise<void>;
  },
  context: BuilderContext,
  options: Schema
) {
  if (options.noBuild) {
    context.logger.info(`📦 Skipping build`);
  } else {
    if (!context.target) {
      throw new Error('Cannot execute the build target');
    }

    const configuration = options.configuration
      ? options.configuration
      : 'production';
    const overrides = {
      // this is an example how to override the workspace set of options
      ...(options.baseHref && { baseHref: options.baseHref })
    };

    context.logger.info(
      `📦 Building "${
        context.target.project
      }". Configuration: "${configuration}".${
        options.baseHref ? ' Your base-href: "' + options.baseHref + '"' : ''
      }`
    );

    if (!options.imageName) {
      options.imageName = context.target.project;
    }

    const build = await context.scheduleTarget(
      {
        target: 'build',
        project: context.target.project,
        configuration
      },
      overrides as json.JsonObject
    );
    await build.result;
  }

  await engine.run(options, (context.logger as unknown) as logging.LoggerApi);
}
