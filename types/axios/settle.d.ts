declare module "axios/lib/core/settle" {
  import { AxiosResponse } from "axios";
  const settle: (
    resolve: (value: AxiosResponse) => void,
    reject: () => void,
    res: AxiosResponse
  ) => void;
  export default settle;
}
