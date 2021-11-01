declare module "axios/lib/utils" {
  const utils: {
    isFormData(a: any): boolean;
    forEach(data: any, handler: (val: any, key: string) => void): void;
  };
  export default utils;
}
