import fs from 'fs';
import path from 'path';
import { Tree } from '@angular-devkit/schematics';

export function getLibraryVersion() {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf8')
  ).version;
}

export function getVersionFromPackageJson(host: Tree): string {
  const sourceText = host.read('package.json')!.toString('utf-8');
  const json = JSON.parse(sourceText);

  return json.version || '';
}

export function addPackageToPackageJson(
  host: Tree,
  pkg: string,
  version: string
): Tree {
  if (host.exists('package.json')) {
    const sourceText = host.read('package.json')!.toString('utf-8');
    const json = JSON.parse(sourceText);

    if (!json.devDependencies) {
      json.devDependencies = {};
    }

    if (!json.devDependencies[pkg]) {
      json.devDependencies[pkg] = version;
      json.devDependencies = sortObjectByKeys(json.devDependencies);
    }

    host.overwrite('package.json', JSON.stringify(json, null, 2));
  }

  return host;
}

function sortObjectByKeys(obj: any) {
  return Object.keys(obj)
    .sort()
    .reduce((result: any, key) => {
      result[key] = obj[key];
      return result;
    }, {});
}
