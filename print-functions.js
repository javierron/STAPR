const fs = require('fs')
const {filterPublicExternalFunctions} = require('./ast_parser')


const functions = filterPublicExternalFunctions('ast.json')
const str = JSON.stringify(functions, null, 2)
fs.writeFileSync('./functions.json', str)
