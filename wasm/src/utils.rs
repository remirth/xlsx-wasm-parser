use std::{collections::HashMap, io::Cursor};

use calamine::{open_workbook_from_rs, DataType, Xlsx};
use chrono::Utc;
use serde::{ser::SerializeSeq, Deserialize, Serialize, Serializer};
use wasm_bindgen::JsError;

pub fn set_panic_hook() {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function at least once during initialization, and then
    // we will get better error messages if our code ever panics.
    //
    // For more details see
    // https://github.com/rustwasm/console_error_panic_hook#readme
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}

pub fn open_workbook_from_u8(bytes: &[u8]) -> Result<Xlsx<Cursor<&[u8]>>, JsError> {
    Ok(open_workbook_from_rs(Cursor::new(bytes))?)
}

fn convert_to_date(cell: &DataType) -> String {
    let option = cell
        .as_datetime()
        .and_then(|dt| dt.and_local_timezone(Utc).earliest())
        .map(|dt| dt.to_rfc3339_opts(chrono::SecondsFormat::Secs, true));

    match option {
        Some(date) => date,
        None => String::from(""),
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(untagged)]
pub enum RowValue {
    String(String),
    Number(f64),
    Boolean(bool),
    Undefined,
}

impl From<&DataType> for RowValue {
    fn from(cell: &DataType) -> Self {
        match cell {
            DataType::String(s) => RowValue::String(s.clone()),
            DataType::Float(f) => RowValue::Number(*f),
            DataType::Int(i) => RowValue::Number(*i as f64),
            DataType::Bool(b) => RowValue::Boolean(*b),
            DataType::DateTime(_) => RowValue::String(convert_to_date(cell)),
            _ => RowValue::Undefined,
        }
    }
}

pub struct ParsedRowResult {
    rows: Vec<HashMap<String, RowValue>>,
}

impl Serialize for ParsedRowResult {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut seq = serializer.serialize_seq(Some(self.rows.len()))?;

        for row in &self.rows {
            seq.serialize_element(row)?;
        }

        seq.end()
    }
}

pub struct SheetResult {
    pub rows: Vec<Vec<RowValue>>,
}

impl Serialize for SheetResult {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut seq = serializer.serialize_seq(Some(self.rows.len()))?;

        for row in &self.rows {
            seq.serialize_element(row)?;
        }

        seq.end()
    }
}
