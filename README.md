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
forge init SATPR
cd SATPR

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

### Generate the test using the subgraph
```
forge test --match-path test/Foo.t.sol -vvvv
```



## Limitations -> Future Work
- STAPER currently only works for contracts in Ethereum mainnet
- Only self-contained contracts are supported
- Invariants must be manually inserted in tests
- Automatic handling of reverted calls
