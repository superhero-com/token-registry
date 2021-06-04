/*
 * ISC License (ISC)
 * Copyright (c) 2018 aeternity developers
 *
 *  Permission to use, copy, modify, and/or distribute this software for any
 *  purpose with or without fee is hereby granted, provided that the above
 *  copyright notice and this permission notice appear in all copies.
 *
 *  THE SOFTWARE IS PROVIDED 'AS IS' AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 *  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 *  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 *  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 *  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 *  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 *  PERFORMANCE OF THIS SOFTWARE.
 */

const fs = require('fs');
const assert = require('chai').assert

const { defaultWallets: wallets } = require('../config/wallets.json');

const {Universal, MemoryAccount, Node} = require('@aeternity/aepp-sdk');

const TOKEN_REGISTRY_CONTRACT = fs.readFileSync('./contracts/token-registry.aes', 'utf-8');
const TOKEN_REGISTRY_CONTRACT_INTERFACE = fs.readFileSync('./contracts/token-registry-interface.aes', 'utf-8');

const config = {
  url: 'http://localhost:3001/',
  internalUrl: 'http://localhost:3001/',
  compilerUrl: 'http://localhost:3080'
};

describe('AEX-9 Token Registry Contract', () => {
  let client, contract;

  before(async () => {
    client = await Universal({
      nodes: [{
        name: 'devnetNode',
        instance: await Node(config)
      }],
      accounts: [MemoryAccount({
        keypair: wallets[0]
      })],
      networkId: 'ae_devnet',
      compilerUrl: config.compilerUrl
    });
  });

  it('Deploying Token Registry Contract', async () => {
    contract = await client.getContractInstance(TOKEN_REGISTRY_CONTRACT);
    const init = await contract.methods.init();
    assert.equal(init.result.returnType, 'ok');
  });

  it('Token Registry Interface', async () => {
    const contractInterface = await client.getContractInstance(TOKEN_REGISTRY_CONTRACT_INTERFACE, {contractAddress: contract.deployInfo.address});
    const state = await contractInterface.methods.get_state();
    assert.equal(state.result.returnType, 'ok');
  });
});
