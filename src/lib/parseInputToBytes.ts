/**
 * @description Parses the input to a Uint8Array. If the input is already a Uint8Array, it is returned as is.
 * If the input is an ArrayBuffer, it is converted to a Uint8Array.
 * @param bytes The input to parse
 * @returns The parsed input
 */
export function parseInputToBytes(bytes: Uint8Array | ArrayBuffer): Uint8Array {
  if (bytes instanceof Uint8Array) {
    return bytes;
  }
  return new Uint8Array(bytes);
}
