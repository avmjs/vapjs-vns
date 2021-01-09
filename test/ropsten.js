const test = require('tape')
const HttpProvider = require('vapjs-provider-http')
const provider = new HttpProvider('https://ropsten.infura.io')
const notFound = 'ENS name not defined.'

const ENS = require('../')
const ens = new ENS({ provider, network: '3' })
test('not providing a network throws', function (t) {
  t.plan(1)
  t.throws(function() {
    const sample = new ENS({ provider })
  })
})

test('not providing a provider throws', function (t) {
  t.plan(1)
  t.throws(function() {
    const sample = new ENS({ network: '3' })
  })
})

test('getOwner for vitalik.vap', function (t) {
  t.plan(1)

  ens.getOwner('vitalik.vap')
  .then((address) => {
    const expected = '0x5f8f68a0d1cbc75f6ef764a44619277092c32df0'
    t.equal(address, expected)
  })
})

test('getOwner for nobodywantsthisdomain.vap', function (t) {
  t.plan(1)

  ens.getOwner('nobodywantsthisdomain.vap')
  .catch((reason) => {
    t.equal(reason.message, notFound)
  })
})

test('getOwner empty name', function (t) {
  t.plan(1)

  ens.getOwner('')
  .catch((reason) => {
    t.equal(reason.message, notFound)
  })
})

test('getResolver empty name', function (t) {
  t.plan(1)

  ens.getOwner('')
  .catch((reason) => {
    t.equal(reason.message, notFound)
  })
})

test('getResolver resistance.vap', function (t) {
  t.plan(1)

  const node = ens.namehash('resistance.vap')
  ens.getResolverAddressForNode(node)
  .then((address) => {
    const expected = '0x4c641fb9bad9b60ef180c31f56051ce826d21a9a'
    t.equal(address, expected)
  })
})

test('lookup resolver address for node', function (t) {
  t.plan(1)

  ens.getResolverAddressForNode('0xb14f00d09893a6ac3c1afa508fb7cd5ccfb7be4482df12738a0e93f95811c99c')
  .then((address) => {
    const expected = '0x71e122fc87aa184b966dfaaa81f9f37f45da9bae'
    t.equal(address, expected)
  })
  .catch((reason) => {
    console.log('reason was', reason)
    t.notOk(reason)
  })
})

test('#resolveAddressForNode on ropsten', function (t) {
  t.plan(1)

  const node = '0xb14f00d09893a6ac3c1afa508fb7cd5ccfb7be4482df12738a0e93f95811c99c'
  const expected = '0x7cb57b5a97eabe94205c07890be4c1ad31e486a8'

  ens.resolveAddressForNode(node)
  .then((address) => {
    t.equal(address, expected)
  })
})

test('lookup vap owner', function (t) {
  t.plan(1)

  ens.getOwner('vap')
  .then((address) => {
    const expected = '0xc19fd9004b5c9789391679de6d766b981db94610'
    t.equal(address, expected)
  })
})

test('lookup resistance.vap address', function (t) {
  t.plan(1)

  ens.lookup('resistance.vap')
  .then((address) => {
    const expected = '0x3d00aea89390613a7a5d874078cf9e82bf794b01'
    t.equal(address, expected)
  })
})

test('lookup vitalik.vap address should fail to owner', function (t) {
  t.plan(1)

  ens.lookup('vitalik.vap')
  .catch((reason) => {
    t.equal(reason.message, notFound)
  })
})

test('lookup nobodywantsthisdomain.vap address', function (t) {
  t.plan(1)

  ens.lookup('nobodywantsthisdomain.vap')
  .catch((reason) => {
    t.equal(reason.message, notFound)
  })
})

test('lookup bar.vap address', function (t) {
  t.plan(1)

  ens.lookup('bar.vap')
  .then((address) => {
    console.log('BAR VAP: ' + address)
    t.equal(address, '0xd0b85aad460f5835c2349fbdd065b2389c921ce1')
  })
  .catch((reason) => {
    console.log('VACATION RENTALS FAIL')
    t.equal(reason.message, notFound)
  })
})

test('lookup empty address', function (t) {
  t.plan(1)

  ens.lookup('')
  .catch((reason) => {
    t.equal(reason.message, notFound)
  })
})
