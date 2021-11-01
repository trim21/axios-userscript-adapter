declare module "axios/lib/core/createError" {
  import { AxiosRequestConfig } from "axios";

  const createError: (s: string, c: AxiosRequestConfig, reason?: string) => Error;
  export default createError;
}
