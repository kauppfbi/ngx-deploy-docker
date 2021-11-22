import {
  Rule,
  SchematicContext,
  Tree,
  SchematicsException,
  url,
  chain,
  apply,
  mergeWith,
  template,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

import {
  addPackageToPackageJson,
  createHost,
  getLibraryVersion,
  getVersionFromPackageJson,
} from '../utils';

import { Schema as NgAddOptions } from './schema';
import { workspaces } from '@angular-devkit/core';
import {
  WorkspaceDefinition,
  WorkspaceHost,
} from '@angular-devkit/core/src/workspace';

function addDeployBuilderToProject(
  tree: Tree,
  host: WorkspaceHost,
  workspace: WorkspaceDefinition,
  options: NgAddOptions
) {
  if (!options.project) {
    if (workspace.extensions.defaultProject) {
      options.project = workspace.extensions.defaultProject as string;
    } else {
      throw new SchematicsException(
        'No Angular project selected and no default project in the workspace'
      );
    }
  }

  const project = workspace.projects.get(options.project);
  if (!project) {
    throw new SchematicsException(
      'The specified Angular project is not defined in this workspace'
    );
  }

  if (project.extensions.projectType !== 'application') {
    throw new SchematicsException(
      `Deploy requires an Angular project type of "application" in angular.json`
    );
  }

  if (!project.targets.get('build')?.options?.outputPath) {
    throw new SchematicsException(
      `Cannot read the output path (architect.build.options.outputPath) of the Angular project "${options.project}" in angular.json`
    );
  }

  project.targets.add({
    name: 'deploy',
    builder: 'ngx-deploy-docker:deploy',
    options: {
      account: options.account,
    },
  });

  workspaces.writeWorkspace(workspace, host);
  return tree;
}

function prepareDockerFiles(
  tree: Tree,
  workspace: WorkspaceDefinition,
  options: NgAddOptions
): Rule {
  const sourceTemplates = url('./files');

  const outputPath =
    workspace.projects.get(options.project)?.targets.get('build')?.options
      ?.outputPath || '';
  const version = getVersionFromPackageJson(tree);
  const sourceParametrizedTemplates = apply(sourceTemplates, [
    template({
      outputPath,
      version,
    }),
  ]);

  return mergeWith(sourceParametrizedTemplates);
}

export const ngAdd = (options: NgAddOptions) => async (
  tree: Tree,
  context: SchematicContext
) => {
  const host = createHost(tree);
  const { workspace } = await workspaces.readWorkspace('/', host);

  const version = getLibraryVersion();
  addPackageToPackageJson(tree, 'ngx-deploy-docker', `^${version}`);
  context.logger.log(
    'info',
    `🐳  Added "ngx-deploy-docker@^${version}" into devDependencies`
  );

  if (options.skipInstall) {
    context.logger.log(
      'warn',
      `❗️  The "--skip-install" flag was present, don't forget to install package manually`
    );
  } else {
    context.logger.log('info', `📦  Installing added packages...`);
    context.addTask(new NodePackageInstallTask());
  }

  addDeployBuilderToProject(tree, host, workspace, options);
  context.logger.log('info', `🚀  Deploy Builder added to your project`);

  context.logger.log('info', 'Preparing some 🐳 files...');
  return chain([prepareDockerFiles(tree, workspace, options)]);
};
