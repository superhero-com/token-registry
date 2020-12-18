const fs = require('fs');

const tokenRegistry = fs.readFileSync(__dirname + '/../contracts/token-registry.aes', 'utf-8');
fs.writeFileSync(__dirname + '/../TokenRegistry.aes.js', `module.exports = \`\n${tokenRegistry}\`;\n`, 'utf-8');

const tokenRegistryInterface = fs.readFileSync(__dirname + '/../contracts/token-registry-interface.aes', 'utf-8');
fs.writeFileSync(__dirname + '/../TokenRegistryInterface.aes.js', `module.exports = \`\n${tokenRegistryInterface}\`;\n`, 'utf-8');
