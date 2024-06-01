const YAML = require('yaml')
const path = require('path')
const fs = require('fs')
const {filterPublicExternalFunctions} = require('./ast_parser')


const functions = filterPublicExternalFunctions('ast.json') 

let abi = ""
var project = process.argv[2]

const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const processYAML = () => {
    
    const subgraph_path = path.join('contracts', project, 'subgraph.yaml')
    console.log("reading subgraph yaml from", subgraph_path)
    const sg_yaml = fs.readFileSync(subgraph_path, 'utf8')
    const sg = YAML.parse(sg_yaml)

    delete sg.dataSources[0].mapping.eventHandlers
    sg.dataSources[0].mapping.callHandlers = []
    
    abi = sg.dataSources[0].mapping.abis[0].name

    functions.forEach( fn => {

        const paramTypes = fn.parameters.map(p => p.type)

        const types = paramTypes.join(',')
        
        const ch = {
            function: `${fn.function_name}(${types})`,
            handler: `handle${capitalize(fn.function_name)}`
        }
        sg.dataSources[0].mapping.callHandlers.push(ch)
    })
    
    fs.writeFileSync(subgraph_path, YAML.stringify(sg))
}


const template = "export function handle<FN_NAME_UC> (call: <FN_NAME_UC>Call): void {paramHandler(call, \"<FN_NAME_LC>\")}"

function applyTemplate(){
    
    const templateFile = fs.readFileSync('template.ts', 'utf8')
    
    const appliedTemplates = functions.map(fn => {

        const function_name_uppercase = `${capitalize(fn.function_name)}`  
        const function_name_lowercase = `${fn.function_name}`

        const replaced = template
            .replaceAll("<FN_NAME_LC>", function_name_lowercase)
            .replaceAll("<FN_NAME_UC>", function_name_uppercase)

        return replaced
    })

    const callObjects = functions.map(fn => {
        return `${capitalize(fn.function_name)}Call`
    })

    const joinedCallObjects = callObjects.join(',\n')

    const joinedTemplates = appliedTemplates.join('\n')

    const newFile = templateFile
        .replaceAll("<ABI>", abi)
        .replaceAll("<HANDLERS>", joinedTemplates)
        .replaceAll("<CALL_OBJECTS>", joinedCallObjects)

//    console.log(newFile)
    fs.writeFileSync(path.join('contracts', project, `src/${project.toLowerCase()}.ts`), newFile)

}

function copyTSTemplate(){
   fs.copyFileSync('./schema.graphql', path.join('contracts', project, 'schema.graphql')) 
}

processYAML()
copyTSTemplate()
applyTemplate()
