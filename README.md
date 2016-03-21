# Websheets Core

[![Build Status](https://travis-ci.org/WebSheets/websheets-core.svg?branch=master)](https://travis-ci.org/WebSheets/websheets-core)

An experimental spreadsheet engine in JS for the browser and Node.


## Features

- Formulas
    + Addition, subtraction, multiplication, division, exponents (with order of operations)
    + Ability to reference individual cells
    + Ability to pass ranges of cells (in two dimensions) as function arguments
    + Very large list of compatible Excel-style functions
    + Dynamically update as referenced values update
- Import parsed data (`loadData`)
- Supports Excel-style circular reference convergence
