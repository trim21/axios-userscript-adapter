declare module "axios/lib/helpers/parseHeaders" {
  const parseHeaders: (raw: string) => Record<string, string>;
  export default parseHeaders;
}
