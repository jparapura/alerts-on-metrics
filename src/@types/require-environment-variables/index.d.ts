declare module 'require-environment-variables' {
  export = requireEnv;

  function requireEnv(variables: string[]): { [key: string]: string };
}
