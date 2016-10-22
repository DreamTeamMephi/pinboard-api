import crypto from 'crypto'

/**
 * Set of utilities to work with users passwords
 */

let password = {}

password.hashIterations = 1000
password.hashLength = 256
password.saltLength = 64

password.generateRandom = function (length) {
  length = length || password.saltLength

  return new Promise(function (resolve, reject) {
    crypto.randomBytes(length, function (err, buf) {
      if (err) return reject(err)
      resolve(buf.toString('hex'))
    })
  })
}

password.generateHash = function (p, salt, iterations, length) {
  iterations = iterations || password.hashIterations
  length = length || password.hashLength

  return new Promise(function (resolve, reject) {
    crypto.pbkdf2(p, salt, iterations, length, function (err, hash) {
      if (err) return reject(err)
      resolve(new Buffer(hash, 'binary').toString('hex'))
    })
  })
}

password.getLocal = function (pass) {
  var toReturn = {
    salt: undefined,
    hash: undefined,
    iterations: password.hashIterations
  }
  return new Promise(async function (resolve, reject) {
    try {
      toReturn.salt = await password.generateRandom()
      toReturn.hash = await password.generateHash(pass, toReturn.salt)
    } catch (e) {
      return reject(e)
    }
    resolve(toReturn)
  })
}

password.verifyPassword = function (local, p) {
  return new Promise(async function (resolve, reject) {
    var hash = await password.generateHash(p, local.salt, local.iterations)
    return hash === local.hash ? resolve(true) : reject(false)
  })
}

module.exports = password
