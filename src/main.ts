#!/usr/bin/env node
import { Boot } from './Boot'
import { print } from './tools'

try {
  new Boot().run()
} catch (error) {
  print(`Boot`, '', 0, 'Error')
}
