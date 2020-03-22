# ngx-deploy-docker 🚀🐳

**This Project is still work in progress.**

![CI Pipeline](https://github.com/kauppfbi/ngx-deploy-docker/workflows/CI%20Pipeline/badge.svg)
[![NPM version][npm-image]][npm-url]
[![The MIT License](https://img.shields.io/badge/license-MIT-orange.svg?color=blue&style=flat-square)](http://opensource.org/licenses/MIT)

**Dockerize your Angular application with ease and deploy your image right from the Angular CLI to a registry 🚀**

**Table of contents:**

1. [📖 Changelog](#changelog)
2. [🚀 Quick Start (local development)](#quickstart-local)
3. [🚀 Continuous Delivery](#continuous-delivery)
4. [📦 Options](#options)
   - [--base-href](#base-href)
   - [--configuration](#configuration)
   - [--no-build](#no-build)
   - [--image-name](#image-name)
   - [--account](#account)
   - [--tag](#tag)
5. [📁 Configuration File](#configuration-file)
6. [🏁 Next milestones](#milestones)

<hr>

## 📖 Changelog <a name="changelog"></a>

A detailed changelog is available [here](https://github.com/kauppfbi/ngx-deploy-docker/blob/master/CHANGELOG.md).

## 🚀 Quick Start (local development) <a name="quickstart-local"></a>

This quick start assumes that you are starting from scratch.
If you already have an existing Angular project, skip step 1.

1. Install the latest version of the **`Angular CLI` (v8.3.0 or greater) globally**
   and create a new Angular project. Make sure you have a suitable version of `nodeJs` installed.

   ```sh
   npm install -g @angular/cli
   ng new your-angular-project --defaults
   cd your-angular-project
   ```

2. Add `ngx-deploy-docker` to your project.

   ```sh
   ng add ngx-deploy-docker
   ```

3. Make sure, Docker works properly on your client and you are authenticated at the repository of your choice.

   ```sh
   docker login
   ```

4. Deploy your newly built image to the registry with all default settings.
   Your project will be automatically built in production mode.

   ```sh
   ng deploy
   ```

   Which is the same as:

   ```sh
   ng deploy your-angular-project
   ```

## 🚀 Continuous Delivery <a name="continuous-delivery"></a>

...more to come

## 📦 Options <a name="options"></a>

#### --base-href <a name="base-href"></a>

- **optional**
- Default: `undefined` (string)
- Example:
  - `ng deploy` – The tag `<base href="/">` remains unchanged in your `index.html`
  - `ng deploy --base-href=/XXX/` – The tag `<base href="/XXX/">` is added to your `index.html`

Specifies the base URL for the application being built.
Same as `ng build --base-href=/XXX/`

#### --configuration <a name="configuration"></a>

- **optional**
- Alias: `-c`
- Default: `production` (string)
- Example:
  - `ng deploy` – Angular project is build in production mode
  - `ng deploy --configuration=test` – Angular project is using the configuration `test` (this configuration must exist in the `angular.json` file)

A named build target, as specified in the `configurations` section of `angular.json`.
Each named target is accompanied by a configuration of option defaults for that target.
Same as `ng build --configuration=XXX`.
This command has no effect if the option `--no-build` option is active.

#### --no-build <a name="no-build"></a>

- **optional**
- Default: `false` (boolean)
- Example:
  - `ng deploy` – Angular project is build in production mode before the deployment
  - `ng deploy --no-build` – Angular project is NOT build

Skip build process during deployment.
This can be used when you are sure that you haven't changed anything and want to deploy with the latest artifact.
This command causes the `--configuration` setting to have no effect.

#### --image-name <a name="image-name"></a>

- **optional**
- Example:
  - `ng deploy` – Docker Image is build with the name of the project as image name
  - `ng deploy --image-name=your-special-name` – Docker Image is built with the name provided.

#### --account <a name="account"></a>

- **optional**
- Alias: `-a`
- Default: `` (string)
- Example:
  - `ng deploy` – Docker Image name is **not** prefixed.
  - `ng deploy --account=test` – Docker image name is prefixed with the provided account, like `aacount/image-name`.

> This option may be neccessary, depending on your write-rights within the repository, you want to push to.

#### --tag <a name="tag"></a>

- **optional**
- Alias: `-t`
- Default: `latest` (string)
- Example:
  - `ng deploy` – Docker Image is build with the tag `latest`, e.g.`account/image-name:latest`
  - `ng deploy --tag=v1.0.0` – Docker Image is build with the tag `v1.0.0`

## 📁 Configuration File <a name="configuration-file"></a>

To avoid all these command-line cmd options, you can write down your configuration in the `angular.json` file in the `options` attribute of your deploy project's architect. Just change the kebab-case to lower camel case. This is the notation of all options in lower camel case:

- baseHref
- configuration
- noBuild
- imageName
- account
- tag

A list of all avaiable options is also available [here](https://github.com/kauppfbi/ngx-deploy-docker/blob/master/src/deploy/schema.json).

Example:

```sh
ng deploy --configuration=dev --tag=next
```

becomes

```json
"deploy": {
  "builder": "ngx-deploy-docker:deploy",
  "options": {
    "configuration": "dev",
    "tag": "next"
  }
}
```

And just run `ng deploy` 😄.

## 🏁 Next milestones <a name="milestones"></a>

- Setup of CI/CD Pipeline for the project
- Code Restructuring:
  - Modularization of Schematics and Builders
  - Use what you need
- Testing, Testing, Testing:
  - Manual tests on different clients with different OS
  - Unit and Integration Tests
- Add more options to the deploy builder, what do you need?
- Integration in NxWorkspace
- 💅 Kubernetes deployment right from the CLI
- preparing examples of `how to use the package in CI environment with different Providers for private registires`
- your feature that's not on the list yet?

We look forward to any help. PRs are welcome! 😃

## License

Code released under the [MIT license](LICENSE).

<hr>

# Attribution

## 🚀 Powered By [ngx-deploy-starter](https://github.com/angular-schule/ngx-deploy-starter)

## 🔥 Many things have been taken over from [transloco](https://github.com/ngneat/transloco)

[npm-url]: https://www.npmjs.com/package/ngx-deploy-docker
[npm-image]: https://badge.fury.io/js/ngx-deploy-docker.svg
