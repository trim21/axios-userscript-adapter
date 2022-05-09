declare namespace GM {
  interface Request {
    /** Decode the response as specified type **/
    responseType: "" | "arraybuffer" | "blob" | "document" | "json" | "text" | "stream" | undefined;
  }
}
