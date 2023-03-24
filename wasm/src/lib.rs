mod utils;

use calamine::Reader;
use serde_wasm_bindgen::to_value;
use utils::{open_workbook_from_u8, set_panic_hook, RowValue, SheetResult};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(typescript_type = "(string | number | boolean | undefined)[][]")]
    pub type Sheet;
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
