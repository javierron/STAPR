import {ethereum } from "@graphprotocol/graph-ts"
import {
  CallData,
} from "../generated/schema"
import {
    <CALL_OBJECTS>
} from "../generated/<ABI>/<ABI>"

<HANDLERS>


function paramHandler(call: ethereum.Call, name: string): void {
    
    let cd = new CallData(call.block.number.toString())
    let params: string[] = []

    for (var i = 0; i < call.inputValues.length; i++ ){
        switch(call.inputValues[i].value.kind){
            case ethereum.ValueKind.ADDRESS: 
                params.push(call.inputValues[i].value.toAddress().toHexString())
                break
            
            case ethereum.ValueKind.INT:
            case ethereum.ValueKind.UINT:
                params.push(call.inputValues[i].value.toBigInt().toString())
                break
            
            case ethereum.ValueKind.BOOL:
                params.push(call.inputValues[i].value.toBoolean().toString())
                break

            case ethereum.ValueKind.STRING:
                params.push(call.inputValues[i].value.toString())
                break
            case ethereum.ValueKind.ARRAY:
                params.push(call.inputValues[i].value.toArray().toString()) // does it work??
                break
            case ethereum.ValueKind.BYTES:
                params.push(call.inputValues[i].value.toBytes().toHex()) // does it work??
                break

        }
    }
    cd.functionName = name
    cd.params = params
    cd.save()
}  
