const YAML = require('yaml')
const path = require('path')
const fs = require('fs')
const gql  = require('graphql')

const project = 'uerii'
const functions = [
    {
        name: "fn_1",
        params: [
            {name: "param1", type: "int32"},
            {name: "param2", type: "string"}
        ]
    },
    {
        name: "fn_2",
        params: [
            {name: "param1", type: "int32"},
            {name: "param2", type: "string"}
        ]
    }

]

const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// const filerFunctions = () => {
//    
//    const newFns = functions.filter(f => f.name === "fn_1" )
//
//    console.log(newFns)
//
//}

const processYAML = () => {

    const sg_yaml = fs.readFileSync(path.join(project, 'subgraph.yaml'), 'utf8')
    const sg = YAML.parse(sg_yaml)

    console.log(sg.dataSources[0].mapping)
    delete sg.dataSources[0].mapping.eventHandlers
    sg.dataSources[0].mapping.callHandlers = []
    
    
    functions.forEach( fn => {

        const paramTypes = fn.params.map(p => p.type)

        paramTypes.join(',')
        
        const ch = {
            function: `${fn.name}(${paramTypes})`,
            handler: `handle${capitalize(fn.name)}`
        }
        sg.dataSources[0].mapping.callHandlers.push(ch)
    })
    console.log(YAML.stringify(sg))
}

const processGraphQLSchema = () => {
    
    const gql_schema = fs.readFileSync(path.join(project, 'schema.graphql'), 'utf8')

    const newType = `
        type NewType {
        id: ID!
        name: String!
        description: String
        }
    `
    const graph =  gql.parse(gql_schema + newType)



    const remove = "ExampleEntity"

    const newSchema = gql.visit(graph, {
        enter(node) {
            if (node.kind === 'ObjectTypeDefinition' && node.name.value === remove) {
                return null
            }
            return undefined
        }
    })
    console.log(gql.print(newSchema))
}

processGraphQLSchema()
