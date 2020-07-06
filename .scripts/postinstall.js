const fs = require('fs');

const tokenRegistry = fs.readFileSync(__dirname + '/../contracts/token-registry.aes', 'utf-8');

fs.writeFileSync(__dirname + '/../TokenRegistry.aes.js', `module.exports = \`\n${tokenRegistry}\`;\n`, 'utf-8');
