'use strict'

const url = require('url')
const http = require('http')
const https = require('https')

const SchemaCache = require('./lib/schema-cache')
const decodeFunction = require('./lib/decode-function')
const encodeFunction = require('./lib/encode-function')

function schemas(registryUrl) {
  const parsed = url.parse(registryUrl)
  const registry = {
    cache: new SchemaCache(),
    protocol: parsed.protocol.startsWith('https') ? https : http,
    host: parsed.hostname,
    port: parsed.port,
    path: parsed.path
  }

  if (parsed.auth) {
    registry.auth = parsed.auth
  }

  const decode = decodeFunction(registry)
  const encodeKey = encodeFunction.bySchema('key', registry)
  const encodeMessage = encodeFunction.bySchema('value', registry)
  const encodeById = encodeFunction.byId(registry)

  return {
    registry,
    decode,
    decodeMessage: decode,
    encodeById,
    encodeKey,
    encodeMessage,
    encodeFunction
  }
}

module.exports = schemas
