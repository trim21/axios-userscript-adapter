declare module "axios/lib/helpers/buildURL" {
  const buildURL: (url: string, params: any, options?: any) => string;
  export default buildURL;
}

declare module "axios/lib/core/buildFullPath" {
  const buildFullPath: (baseURL?: string, requestedURL?: string) => string;
  export default buildFullPath;
}
