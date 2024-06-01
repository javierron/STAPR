const fs = require('fs');
const minimist = require('minimist');
const { Module } = require('module');

// Parse command-line arguments
const args = minimist(process.argv.slice(2));



// Define the function to filter public and external functions
const filterPublicExternalFunctions = inputFile => {
    // Read the input JSON file
    const data = fs.readFileSync(inputFile, 'utf8')
    
    // Parse the JSON data
    let ast;
    try {
      ast = JSON.parse(data);
    } catch (jsonErr) {
      console.error('Error parsing JSON:', jsonErr);
      return;
    }

    // Filter for contract definitions
    const filteredContracts = ast.nodes.filter(node => 
        node.nodeType === 'ContractDefinition'
      );


    // Filter for functions with public or external visibility within each contract
    const filteredFunctions = [];
    filteredContracts.forEach(contract => {
    contract.nodes.forEach(node => {
        if (node.nodeType === 'FunctionDefinition' && 
            (node.visibility === 'public' || node.visibility === 'external') &&
            node.name!== '' && node.stateMutability !== "view" &&
            !filteredFunctions.some( i => i.name === node.name )) {
        filteredFunctions.push(node);
        }
    });
    });

    // Transform the filtered functions to the desired format
    const transformedFunctions = filteredFunctions.map(fn => {
        return {
          function_name: fn.name,
          parameters: fn.parameters.parameters.map(param => ({
            name: param.name,
            type: param.typeName.typeDescriptions.typeString
          }))
        };
      });


    return transformedFunctions
}
// Run the function with the specified input and output files
//
    //
module.exports = {filterPublicExternalFunctions}
