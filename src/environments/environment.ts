// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  // apiAuthUrl: `http://localhost:50659`,
  // apiUrl: `http://localhost:50663`,  

  apiAuthUrl: `http://dev-jet-api-auth.azurewebsites.net`,
  apiUrl: `http://dev-jet-api-resource.azurewebsites.net`
};
