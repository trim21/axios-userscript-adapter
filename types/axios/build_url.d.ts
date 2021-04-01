
declare module "axios/lib/helpers/buildURL" {
  const buildURL: (
    url?: string,
    params?: any,
    serializer?: (params: any) => string
  ) => string;
  export default buildURL;
}
