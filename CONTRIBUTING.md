# Contributing to ngx-deploy-docker

🙏 We would ❤️ for you to contribute to `ngx-deploy-docker` and help make it better!

## Getting started

### 1. Angular CLI

1. Install the next version of the Angular CLI.

   ```sh
   npm install -g @angular/cli
   ```

2. Run `ng version`, make sure you have installed Angular CLI v8.3.0 or greater.

3. Update your existing project using the command:

   ```sh
   ng update @angular/cli @angular/core
   ```

### 2. npm link

Use the following instructions to make `ngx-deploy-docker` available locally via `npm link`.

1. Clone the project

   ```sh
   git clone https://github.com/kauppfbi/ngx-deploy-docker.git
   cd ngx-deploy-docker
   ```

2. Install the dependencies

   ```sh
   npm install
   ```

3. Build the project:

   ```sh
   npm run build
   ```

4. Create a local npm link:

   ```sh
   cd dist
   npm link
   ```

Read more about the `link` feature in the [official NPM documentation](https://docs.npmjs.com/cli/link).

### 3. Adding to an Angular project -- ng add

Once you have completed the previous steps to `npm link` the local copy of `ngx-deploy-docker`, follow these steps to use it in a local Angular project.

1. Enter the project directory

   ```sh
   cd your-angular-project
   ```

2. Add the local version of `ngx-deploy-docker`.

   ```sh
   npm link ngx-deploy-docker
   ```

3. Now execute the `ng-add` schematic.

   ```sh
   ng add ngx-deploy-docker
   ```

4. You can now deploy your angular app to a Docker Registry.

   ```sh
   ng deploy
   ```

5. You can remove the link later by running `npm unlink`

### 4. Testing

Testing is done with [Jest](https://jestjs.io/).
To run the tests:

```sh
npm test
```

## Contribute

### <a name="rules"></a> Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

- All features or bug fixes **must be tested** by one or more specs (unit-tests).
- All public API methods **must be documented**.

### <a name="commit"></a> Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to **more
readable messages** that are easy to follow when looking through the **project history**. But also,
we use the git commit messages to **generate the changelog**.

#### Commit Message Format

The format of commit messages must align with the rules provided by [@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional)
