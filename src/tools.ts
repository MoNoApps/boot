import { log } from 'util'

export function hexId() {
  return '0'.repeat(64).replace(/0/g, () =>
    '0123456789abcdef'[Math.floor(Math.random() * (16))])
}

export function print(type, address = '', port = 0, status = '', message = '') {
  let line = `[${type}]`
  if (address) line = `${line},  Address: ${port ? address : `0x${address}`}`
  if (port) line = `${line},  Port: ${port}`
  if (status) line = `${line},  Status: ${status}`
  if (message) line = `${line},  Message: ${message}`
  log(line)
}
