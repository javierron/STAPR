set -x
set -e 

export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;

nvm use lts/iron
solc-select use 0.8.0

API_KEY=""
ADDRESS=$1
BLOCK=$2

JSON=`curl "https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${ADDRESS}&apikey=${API_KEY}"`
echo "$JSON" | jq -r .result[0].SourceCode > source.sol 
NAME=`echo $JSON | jq -r .result[0].ContractName`

solc --ast-compact-json source.sol | tail -n +5 > ast.json  

graph init ${NAME} ./contracts/${NAME} --from-contract=${ADDRESS} --network=mainnet --protocol=ethereum --contract-name=${NAME} --start-block=${BLOCK} --studio 

node main.js ${NAME}

pushd contracts/${NAME} 
graph codegen
graph build
