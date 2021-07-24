declare module "axios/lib/helpers/buildURL" {
  const buildURL: (
    url?: string,
    params?: any,
    serializer?: (params: any) => string,
  ) => string;
  export default buildURL;
}

declare module "axios/lib/core/buildFullPath" {
  const buildFullPath: (
    baseURL?: string,
    requestedURL?: string,
  ) => string;
  export default buildFullPath;
}
