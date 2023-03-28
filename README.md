<div align="center">

  <h1><code>XLSX-Wasm-Parser</code></h1>

<strong>A WebAssembly wrapper over the Rust <a href="https://lib.rs/crates/calamine">Calamine</a> crate, bringing Blazingly Fast (🔥) XLSX deserialization to the browser and Node.</strong>

  <p>
    <a href="https://www.codefactor.io/repository/github/exsjabe/xlsx-wasm-parser">
      <img src="https://www.codefactor.io/repository/github/exsjabe/xlsx-wasm-parser/badge" alt="CodeFactor" />
    </a>
    <img alt="GitHub" src="https://img.shields.io/github/license/exsjabe/xlsx-wasm-parser"/>
    <img alt="AppVeyor tests" src="https://img.shields.io/appveyor/tests/exsjabe/xlsx-wasm-parser">
  </p>

</div>

## About

This project is designed for deserializing XLSX files in the browser and Node. It takes the bytes of a file and returns either a 2D array of cells, or a list of objects based on a passed schema, which can be validated through built-in integration with <a href="https://github.com/colinhacks/zod">Zod</a>.

#### Can I use this in production?

This project is still in it's early stages, and only implements the bare essentials for deserializing XLSX files. If all you need is to either get all rows from a file, or getting rows based on a schema, you can use this library as I won't be making breaking changes to the current public interface. However if you need full support for all XLSX features today, please consider using <a href="https://www.npmjs.com/package/read-excel-file">read-excel-file</a> instead. If you have any feature requests, please open an issue. If you would like to contribute, please open a PR.

## 🚴 Usage

### 🐑 Install via NPM

```bash
npm install xlsx-wasm-parser
```

### ⚡ Set-up with Vite

Vite requires the <a href="https://github.com/Menci/vite-plugin-wasm">vite-plugin-wasm</a> to run WebAssembly, which in turn requires the <a href="https://github.com/Menci/vite-plugin-top-level-await">vite-plugin-top-level-await</a> plugin. To use this library with Vite, you must install both of these plugins and add them to your Vite config.

```bash
npm i -D vite-plugin-wasm vite-plugin-top-level-await
```

```ts
// vite.config.ts
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  plugins: [wasm(), topLevelAwait()],
});
```

### 🌐 Usage in the browser

#### Getting all rows

```ts
import { getAllRows } from "xlsx-wasm-parser";

const input = document.getElementById("input");
input.addEventListener("change", () => {
  // Currently only supports sync operations and therefore requires inputs to be of type ArrayBuffer or a Uint8Array
  input.files?.[0]?
    .arrayBuffer()
    .then(getAllRows)
    .then((rows) => {
      // Rows is a 2d array of cells
    });
});

// Fetch response
fetch("https://example.com/file.xlsx")
  .then((response) => response.arrayBuffer())
  .then(getAllRows)
  .then((rows) => {
    // Rows is a 2d array of cells
  });
```

#### Getting rows based on a schema

```ts
import { getParsedRows } from "xlsx-wasm-parser";

const xlsxSchema = [
  [0, "name"],
  [1, "age"],
  [2, "address"]
] as [number, string][];

const input = document.getElementById("input");
input.addEventListener("change", () => {
  // Currently only supports sync operations and therefore requires inputs to be of type ArrayBuffer or a Uint8Array
  input.files?.[0]?
    .arrayBuffer()
    .then((buffer) => getRows(buffer, xlsxSchema))
    .then((rows) => {
      // Rows is a list of objects based on the schema
    });
});
```

To use the validation feature, import the `getParsedRowsWithZodSchema` function from the `validation` entry point.

#### With Zod Validation

```ts
import { getParsedRowsWithZodSchema} from "xlsx-wasm-parser/validation";
import z from "zod";

const xlsxSchema = [
  [0, "name"],
  [1, "age"],
  [2, "address"]
] as [number, string][];
const zodSchema = z.object({
  name: z.string(),
  age: z.number(),
  address: z.string(),
});

const input = document.getElementById("input");
input.addEventListener("change", () => {
  // Currently only supports sync operations and therefore requires inputs to be of type ArrayBuffer or a Uint8Array
  input.files?.[0]?
    .arrayBuffer()
    .then((buffer) => getRowsWithZodSchema(buffer, xlsxSchema, zodSchema))
    .then((rows) => {
      // Rows is a list of the objects that passed validation
    });
});
```

### 📦 Usage in Node

To use the Node version of this package, import it from the Node entry point.

#### Getting all rows

```ts
import { getAllRows } from "xlsx-wasm-parser/node";
import fs from "fs";

const rows = getAllRows(fs.readFileSync("file.xlsx"));
// Rows is a 2d array of cells
```

#### Getting rows based on a schema

```ts
import { getParsedRows } from "xlsx-wasm-parser/node";
import fs from "fs";

const xlsxSchema = [
  [0, "name"],
  [1, "age"],
  [2, "address"],
] as [number, string][];
const rows = getParsedRows(fs.readFileSync("file.xlsx"), xlsxSchema);
// Rows is a list of objects based on the schema
```

To use the validation feature for Node, import the `getParsedRowsWithZodSchema` function from the `node/validation` entry point.

#### With Zod Validation

```ts
import { getParsedRowsWithZodSchema } from "xlsx-wasm-parser/node/validation";
import fs from "fs";

const xlsxSchema = [
  [0, "name"],
  [1, "age"],
  [2, "address"],
] as [number, string][];

const zodSchema = z.object({
  name: z.string(),
  age: z.number(),
  address: z.string(),
});

const rows = getParsedRowsWithZodSchema(
  fs.readFileSync("file.xlsx"),
  xlsxSchema,
  zodSchema
);

// Rows is a list of the objects that passed validation
```

### Benchmarks

Coming soon! I need to write fair implementations of the other libraries first. However from what I've been able to measure so far I can tell you it's fast.

### Contributing

Currently there is a lot to do so all contributions are appreciated!

- [ ] Add support for more XLSX features, such as formatting, formulas, VBA, etc.
- [ ] Allow for async operations
- [ ] Allow for input of Blob, File, etc.
- [ ] Allow to pass an object of options to the parser for things like sheet name, etc.
- [ ] Add options for dates, currently all dates are assumed to be UTC and are returned as an ISO-8601 string
- [ ] Add CI/CD
- [ ] Add integration with more validation libraries
- [ ] Add benchmarks
- [ ] Allow users to pass in a list of objects instead of a list of tuples for the xlsx-schema
