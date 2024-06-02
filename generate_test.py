import json
from collections import defaultdict
from eth_utils import to_checksum_address

import argparse

# Function to parse the JSON file and convert it to a dictionary
def convert_json_to_dict(file_path):
    # Read the JSON file
    with open(file_path, 'r') as file:
        functions_list = json.load(file)
    
    # Initialize a defaultdict with list as the default factory
    functions_dict = defaultdict(list)
    
    # Populate the dictionary
    for func in functions_list:
        function_name = func.get('function_name')
        parameters = func.get('parameters')
        p=[]
        for param in parameters:
            p.append(param['type'])
        functions_dict[function_name]=p
    
    # Convert defaultdict to a regular dictionary
    functions_dict = dict(functions_dict)
    
    return functions_dict






def prepare_function_calls(subgraph_path,function_glosary,node_before_attack, revert_nodes):
    print(revert_nodes)
    # Read the JSON file
    with open(subgraph_path, 'r') as file:
        data = json.load(file)
    
    # Extract the callDatas
    call_datas = data.get('callDatas', [])
    string_builder=''
    attacker_call=''
    # Print out each callData
    for call in call_datas:
        call_id = call.get('id')
        function_name = call.get('functionName')
        params = call.get('params', [])
        function_line=''
        if call_id in revert_nodes:
            function_line+= f'        vm.expectRevert(bytes("ERC20: transfer amount exceeds balance"));\n'
        if params == []:
            function_line+= f'        cont.{function_name}();\n'
        else:
            function_line+=f'        cont.{function_name}('
            name_inputs=function_glosary.get(function_name)
            #for p,t in params,name_inputs:
            for i in range(0,len(params)):
                if "address" in name_inputs[i]:
                    function_line+= toAddress(params[i])
                else:
                    function_line+=params[i]
                i+=1
                if i<len(params):
                    function_line+=","                
            function_line+=");\n"
        if int(call_id) > node_before_attack:
            pass
        if int(call_id) == node_before_attack:
            attacker_call= '        vm.prank(address(0));\n'
            attacker_call+='        vm.expectRevert(bytes("Only owner can mint"));'
            attacker_call+=function_line
            return string_builder,attacker_call
        else:
            string_builder+=function_line
      
    return string_builder
    #attack_call=
        
def toAddress(address):
    checksummed_address = to_checksum_address(address)
    return f'address({checksummed_address})'        
        


def fill_template(template_path, output_path, placeholders):
    # Read the template file
    with open(template_path, 'r') as file:
        template = file.read()

    # Replace placeholders in the template
    for placeholder, value in placeholders.items():
        template = template.replace(placeholder, value)

    # Write the filled template to the output file
    with open(output_path, 'w') as file:
        file.write(template)





# Fill the template and create the output file


#print(f'Generated Solidity file at {output_path}')
import os

def main():
    print("RECEIVING ARGUMENTS")
    parser = argparse.ArgumentParser(description="Process some Solidity parameters.")
    def list_of_strings(arg):
        return arg.split(',')
    # Define the arguments
    parser.add_argument('--node_before_attack', type=int, required=True, help="The node of the attack")
    parser.add_argument('--sol_version', type=str, required=True, help="The Solidity version")
    parser.add_argument('--contract', type=str, required=True, help="The contract file name")
    parser.add_argument('--real', type=str, required=True, help="The real value to compare")
    parser.add_argument('--expected', type=str, required=True, help="The expected value for comparison")
    parser.add_argument('--revert_nodes',type=list_of_strings, required=True, help="The list of nodes that are expected to revert")

    # Parse the arguments
    args = parser.parse_args()

    # Process the arguments
    
    node_before_attack=args.node_before_attack
    sol_version=args.sol_version
    contract=args.contract
    contract_name = contract[:-4]  # Remove the '.sol' extension
    real=args.real
    expected=args.expected
    revert_nodes=args.revert_nodes


    function_glosary=convert_json_to_dict("functions.json")
    print(function_glosary)
    functions, attack =prepare_function_calls("calls.json",function_glosary,node_before_attack,revert_nodes)

    # Define placeholders and their values
    placeholders = {
        '<SOL_VERSION>': sol_version,
        '<CONTRACT>': contract_name,
        '<CONTRACT_FILE>': contract,
        '<FUNCTION_CALLS>': functions,
        '<ATTACKER_CALLS>': attack,
        '<REAL>': real,
        '<EXPECTED>': expected
    }
    # Path to the template file
    template_path = 'test-template.txt'
    # Path to the output file
    output_path = f'STAPR/test/{contract_name}.t.sol'
    fill_template(template_path,output_path,placeholders)


        

if __name__ == '__main__':
    main()