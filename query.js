const { execute, GetCallDataDocument} = require('./.graphclient')
const fs = require('fs')

const query = async () => {
    const response = await execute(GetCallDataDocument, {})
    fs.writeFileSync('calls.json', JSON.stringify(response.data, null, 2))
}

query()

