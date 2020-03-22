/**
 * Deployment of Angular CLI applications to the file system
 */
export interface Schema {
  /**
   * Base url for the application being built. Same as `ng build --base-href=/XXX/`.
   */
  baseHref?: string;
  /**
   * A named build target, as specified in the `configurations` section of angular.json. Each named target is accompanied by a configuration of option defaults for that target. Same as `ng build --configuration=XXX`.
   */
  configuration?: string;
  /**
   * Skip build process during deployment.
   */
  noBuild?: boolean;

  /**
   * The Name of the Docker Image you want to deploy. If not present, the project name will be taken.
   */
  imageName?: string;

  /**
   * The Account you want to publish the image too. Default is your docker username.
   */
  account?: string;

  /**
   * The Tag you want to publish the image with.
   */
  tag?: string;
}
