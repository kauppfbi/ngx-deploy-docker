# ngx-deploy-docker 🚀🐳

<span style="color:red">**This Project is work in progress.**</span>

[![The MIT License](https://img.shields.io/badge/license-MIT-orange.svg?color=blue&style=flat-square)](http://opensource.org/licenses/MIT)

... more badges to come

## Usage

Add `ngx-deploy-docker` to your project.

```bash
ng add ngx-deploy-docker
```

Deploy your project to your registry of choice.

```
ng deploy [options]
```

## Options

The following options should be available

#### --configuration

- **optional**
- Default: `production` (string)
- Example:
  - `ng deploy` – Angular project is build in production mode
  - `ng deploy --configuration=test` – Angular project is using the configuration `test` (this configuration must exist in the `angular.json` file)

A named build target, as specified in the `configurations` section of `angular.json`.
Each named target is accompanied by a configuration of option defaults for that target.
Same as `ng build --configuration=XXX`.
This command has no effect if the option `--no-build` option is active.

> **This is a proposal from [RFC #1](https://github.com/angular-schule/ngx-deploy-starter/issues/1).**

#### --no-build

- **optional**
- Default: `false` (string)
- Example:
  - `ng deploy` – Angular project is build in production mode before the deployment
  - `ng deploy --no-build` – Angular project is NOT build

Skip build process during deployment.
This can be used when you are sure that you haven't changed anything and want to deploy with the latest artifact.
This command causes the `--configuration` setting to have no effect.

> **This is a proposal from [RFC #1](https://github.com/angular-schule/ngx-deploy-starter/issues/1).**

#### --target-dir

- **optional**
- Default: `/example-folder` (string)
- Example:
  - `ng deploy` -- App is "deployed" to the example folder (if existing)
  - `ng deploy --target=/var/www/html` -- App is "deployed" to another folder

> **This is one of the options you can freely choose according to your needs.**

#### --base-href <a name="base-href"></a>

- **optional**
- Default: `undefined` (string)
- Example:
  - `ng deploy` -- `<base href="/">` remains unchanged in your `index.html`
  - `ng deploy --base-href=/the-repositoryname/` -- `<base href="/the-repositoryname/">` is added to your `index.html`

Specifies the base URL for the application being built.
Same as `ng build --base-href=/XXX/`

## License

Code released under the [MIT license](LICENSE).

# Attribution

## 🚀 Powered By [ngx-deploy-starter](https://github.com/angular-schule/ngx-deploy-starter)

## 🔥 Many things have been taken over from [transloco](https://github.com/ngneat/transloco)
