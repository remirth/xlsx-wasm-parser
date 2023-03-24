//! Test suite for Node
#![cfg(target_arch = "wasm32")]

#[path = "../src/utils.rs"]
mod utils;

#[path = "../src/lib.rs"]
mod lib;

extern crate wasm_bindgen_test;
use wasm_bindgen_test::*;

// wasm_bindgen_test_configure!(run_in_node);

#[wasm_bindgen_test]
fn datatype_string_to_rowvalue() {
    let str = "Hello World";
    let cell = calamine::DataType::String(str.to_string());
    let control_value = utils::RowValue::String(str.to_string());

    let row_value = utils::RowValue::from(&cell);
    assert_eq!(row_value, control_value);
}

#[wasm_bindgen_test]
fn datatype_float_to_rowvalue() {
    let float = 3.14;
    let cell = calamine::DataType::Float(float);
    let control_value = utils::RowValue::Number(float);

    let row_value = utils::RowValue::from(&cell);
    assert_eq!(row_value, control_value);
}

#[wasm_bindgen_test]
fn datatype_int_to_rowvalue() {
    let int: i64 = 3;
    let cell = calamine::DataType::Int(int);
    let control_value = utils::RowValue::Number(int as f64);

    let row_value = utils::RowValue::from(&cell);
    assert_eq!(row_value, control_value);
}

#[wasm_bindgen_test]
fn datatype_date_to_rowvalue() {
    let date_string = "1999-11-24T00:00:00Z";
    let date_code = 36488.0;
    let cell = calamine::DataType::DateTime(date_code);
    let control_value = utils::RowValue::String(date_string.to_string());

    let row_value = utils::RowValue::from(&cell);
    assert_eq!(row_value, control_value);
}

#[wasm_bindgen_test]
fn datatype_empty_to_rowvalue() {
    let cell = calamine::DataType::Empty;
    let control_value = utils::RowValue::Undefined;

    let row_value = utils::RowValue::from(&cell);
    assert_eq!(row_value, control_value);
}
