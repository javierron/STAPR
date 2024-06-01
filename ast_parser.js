const { Console } = require('console');
const fs = require('fs');
const minimist = require('minimist');

// Parse command-line arguments
const args = minimist(process.argv.slice(2));
const inputFilePath = args.input || 'input.json'; // Default value if not provided
const outputFilePath = args.output || 'output.json'; // Default value if not provided



// Define the function to filter public and external functions
function filterPublicExternalFunctions(inputFile, outputFile) {
  // Read the input JSON file
  fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the input file:', err);
      return;
    }

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
  
    console.log('Filtered Contracts:', filteredContracts);

    // Filter for functions with public or external visibility within each contract
    const filteredFunctions = [];
    filteredContracts.forEach(contract => {
    contract.nodes.forEach(node => {
        if (node.nodeType === 'FunctionDefinition' && 
            (node.visibility === 'public' || node.visibility === 'external') &&
            node.name!== '') {
        filteredFunctions.push(node);
        }
    });
    });
    console.log(filteredFunctions)

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
  
      console.log('Transformed Functions:', transformedFunctions);
  
      // Write the transformed results to the new JSON file
      fs.writeFile(outputFilePath, JSON.stringify(transformedFunctions, null, 2), 'utf8', writeErr => {
        if (writeErr) {
          console.error('Error writing the transformed output file:', writeErr);
        } else {
          console.log('Transformed functions have been written to:', outputFilePath);
        }
      });
    });
  }
// Run the function with the specified input and output files
filterPublicExternalFunctions(inputFilePath, outputFilePath);
