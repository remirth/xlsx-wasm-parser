mod utils;

use std::collections::HashMap;

use calamine::Reader;
use serde::Serialize;
use serde_wasm_bindgen::{from_value, to_value};
use utils::{open_workbook_from_u8, set_panic_hook, ParsedSheetResult, RowValue, SheetResult};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(typescript_type = "(string | number | boolean | undefined)[][]")]
    pub type Sheet;

    #[wasm_bindgen(typescript_type = "Record<string, string | number | boolean | undefined>[]")]
    pub type ParsedSheet;

    #[wasm_bindgen(typescript_type = "[number, string][]")]
    pub type JsRowSchema;

}

#[wasm_bindgen(catch)]
pub fn get_all_rows(bytes: &[u8]) -> Result<Sheet, JsError> {
    set_panic_hook();
    let mut workbook = open_workbook_from_u8(bytes)?;
    let mut result: SheetResult = SheetResult { rows: vec![] };
    let mut current_row: Vec<RowValue>;

    for worksheet in workbook.worksheets() {
        for row in worksheet.1.rows() {
            current_row = row.iter().map(RowValue::from).collect::<Vec<RowValue>>();
            result.rows.push(current_row);
        }
    }

    Ok(to_value(&result)?.unchecked_into::<Sheet>())
}

#[wasm_bindgen(catch)]
pub fn get_parsed_rows(bytes: &[u8], schema: JsRowSchema) -> Result<ParsedSheet, JsError> {
    set_panic_hook();
    let row_schema = from_value::<HashMap<usize, String>>(schema.into())?;
    let mut map: HashMap<String, RowValue> = HashMap::new();
    let mut result = ParsedSheetResult { rows: Vec::new() };
    let serializer = serde_wasm_bindgen::Serializer::new().serialize_maps_as_objects(true);
    let mut is_empty;
    let mut workbook = open_workbook_from_u8(bytes)?;

    for worksheet in workbook.worksheets() {
        for row in worksheet.1.rows() {
            is_empty = true;
            map.clear();
            for (i, col) in row.iter().enumerate() {
                let key = row_schema.get(&i);
                match key {
                    None => continue,
                    Some(key) => {
                        if !col.is_empty() {
                            is_empty = false;
                        }
                        map.insert(key.clone(), col.into());
                    }
                }
            }

            if !is_empty {
                result.rows.push(map.clone());
            }
        }
    }

    Ok(result
        .serialize(&serializer)?
        .unchecked_into::<ParsedSheet>())
}
