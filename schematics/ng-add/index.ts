import {
  Rule,
  SchematicContext,
  Tree,
  SchematicsException,
  url,
  template,
  apply,
  mergeWith
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

import {
  addPackageToPackageJson,
  getLibraryVersion,
  getVersionFromPackageJson
} from '../utils';

import { Schema as NgAddOptions } from './schema';
import {
  experimental,
  JsonParseMode,
  parseJson,
  strings
} from '@angular-devkit/core';

function getWorkspace(
  host: Tree
): { path: string; workspace: experimental.workspace.WorkspaceSchema } {
  const possibleFiles = ['/angular.json', '/.angular.json', '/workspace.json'];
  const path = possibleFiles.filter(path => host.exists(path))[0];

  const configBuffer = host.read(path);
  if (configBuffer === null) {
    throw new SchematicsException(
      `Could not find angular.json or workspace.json`
    );
  }
  const content = configBuffer.toString();

  let workspace: experimental.workspace.WorkspaceSchema;
  try {
    workspace = (parseJson(
      content,
      JsonParseMode.Loose
    ) as {}) as experimental.workspace.WorkspaceSchema;
  } catch (e) {
    throw new SchematicsException(
      `Could not parse angular.json or workspace.json: ` + e.message
    );
  }

  return {
    path,
    workspace
  };
}

function addDeployBuilderToProject(tree: Tree, options: NgAddOptions) {
  const { path: workspacePath, workspace } = getWorkspace(tree);

  if (!options.project) {
    if (workspace.defaultProject) {
      options.project = workspace.defaultProject;
    } else {
      throw new SchematicsException(
        'No Angular project selected and no default project in the workspace'
      );
    }
  }

  const project = workspace.projects[options.project];
  if (!project) {
    throw new SchematicsException(
      'The specified Angular project is not defined in this workspace'
    );
  }

  if (project.projectType !== 'application') {
    throw new SchematicsException(
      `Deploy requires an Angular project type of "application" in angular.json`
    );
  }

  if (
    !project.architect ||
    !project.architect.build ||
    !project.architect.build.options ||
    !project.architect.build.options.outputPath
  ) {
    throw new SchematicsException(
      `Cannot read the output path (architect.build.options.outputPath) of the Angular project "${options.project}" in angular.json`
    );
  }

  project.architect['deploy'] = {
    builder: 'ngx-deploy-docker:deploy',
    options: {
      account: options.account
    }
  };

  tree.overwrite(workspacePath, JSON.stringify(workspace, null, 2));
}

function prepareDockerFiles(
  host: Tree,
  context: SchematicContext,
  options: NgAddOptions
) {
  const sourceTemplates = url('./files');

  const version = getVersionFromPackageJson(host);

  const sourceParametrizedTemplates = apply(sourceTemplates, [
    template({
      ...options,
      ...strings,
      version
    })
  ]);

  return mergeWith(sourceParametrizedTemplates)(host, context);
}

export default function(options: NgAddOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const version = getLibraryVersion();
    addPackageToPackageJson(host, 'ngx-deploy-docker', `^${version}`);
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

    addDeployBuilderToProject(host, options);
    context.logger.log('info', `🚀  Deploy Builder added to your project`);

    context.logger.log('info', 'Preparing some 🐳 files...');
    return prepareDockerFiles(host, context, options);
  };
}
