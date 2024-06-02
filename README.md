# STAPR

### Smart Contract Testing for Automatic Program Repair

In Automated Program Repair (APR), testing of patched code is always difficult.

Usually, evaluation of APR tools is done via test suites; however, these are not perfect oracles.

When dealing with APR of smart contracts, we have one advantage: The whole history of calls
for all contracts is stored on-chain.

This means that we can extract all call data for any given contract, and replay it on a patched version.

This serves two purposes: (1) we can make sure that the patched version of the contract does not break the
correct logic of the original contract, and (2) we can observe if the patch acually fixes a given fault observed at
a given block.

-------------------------------------------------------

STAPR is a tool that automates collects the call history of a smart contracts using TheGraph.

It does so in the following steps:
- Given a smart contract address and creation block
- It fetches the contract's source code
- It parses the source code an retrieves all callable functions
- It creates a subgraph skeleton via `graph init`
- It modifies the subgraphs yaml definition, adding automatically one CallHandler per callable function
- It generates the handler functions that store the call data as entities
- It rebuilds the modified subgraph via `graph codegen` and `graph build`

Deployment of the subgraph is done manually via `graph deploy` after creating the subgraph in the subgraph studio.


STAPR is also able to replay the call history for patched contracts:
- It fetches the call history of the original contract by using `graphclient`
- It deploys the patched contract in a local test network using Foundry/Forge
- It inserts all the call history in a test scenario
- It runs the test and validates the invariants: the patched contract's behavior does not diverge from the original, and the fault which is the fix target does not occur.

## Requirements
    node.js (nvm)
    python
    graphprotocol/graph-cli
    graphprotocol/client-cli
    solc
    solc-select
    curl
    forge

## Usage
### Setting the subgraph with the call history
To create the subgraph locally:

```
./create-subgraph.sh <CONTRACT_ADRRESS> <CONTRACT_CREATION_BLOCK>
```

To deploy the subgraph, login to subgraph studio and create a subgraph instance. Then:


```
graph auth --studio <AUTH_TOKEN>
graph deploy --studio <SUBGRAPH_NAME>
```

To query the call history:

Modify `.graphclientrc.yml` and specify the subgraphs endpoint. Then

```
graphclient build --fileType json
node query.js
```

### Setting test platform 

To install foundry
```
curl -L https://foundry.paradigm.xyz | bash
```

To set up foundry & forge:
```
foundryup --branch master
forge install
forge init STAPR
cd STAPR

forge init --template PaulRBerg/foundry-template

```

If having problems with running forge try:
```
echo forge-std/=lib/forge-std/ > remappings.txt
```

Check forge is running by using the command:
```
forge test --match-path test/Foo.t.sol -vvvv
```

### Generate the test from the subgraph data
Now we want to automatically generate the test 
For that we created a template test and a script that need some detail data and will generate a Test file with 2 tests:
1. testLogic(): runs all transactions before the attack. Proof for logic
2. testAttack(): runs the attack block

To generate your test you have to run generate_test.py with the commands that relate to your case.
```
python3 generate_test.py --help
```
An example
```

python3 generate_test.py  --node_before_attack 15767899 --sol_version 'pragma solidity ^0.8.0;' --contract 'Token.sol' --real 'cont.totalSupply()' --expected '100000000000000000' --revert_nodes 14702874,15588293,15589794,15767838
```

Executing the last command will generate Token.t.sol on STAPR/test

Now make sure your patch or file to test is locate under the same name (without the .t) in STAPR/src. In the example is Token.sol.

And now you can run your test:
```
forge test --match-path test/Token.t.sol -vvvv
```


## Limitations -> Future Work
- STAPR currently only works for contracts in Ethereum mainnet
- Only self-contained contracts are supported
- Invariants must be manually inserted in tests
- Automatic handling of reverted calls
