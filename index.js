const chalk = require('chalk')

const { red, yellow, grey, cyan } = chalk

function getMessageType(message) {
  if (message.fatal || message.severity === 2) {
    return red('[error]')
  }
  return yellow('[warning]')
}

function formatMessage(message, filePath) {
  return (
      `${filePath}:${message.line || 0}:${message.column || 0}\n` +
      `${getMessageType(message)} ${message.message}` +
      grey(` (${message.ruleId})`) +
      '\n'
  )
}

/**
 * Formats eslint results in a way that allows IDEA to highlight and navigate to problem location.
 * @param {Array<{messages:Array<{ruleId:string,message:string,line:number,column:string}>,filePath:string}>} results
 * @returns {string}
 */
module.exports = function formatEslintResults(results) {
  let output = ''
  let total = 0

  results.forEach(({messages, filePath}) => {
    total += messages.length
    output += messages.map(message => formatMessage(message, filePath)).join('\n')
  })

  if (total > 0) {
    output = `${cyan('eslint:')}\n\n${output}\n${red(`\u2716 ${total} problem${total !== 1 ? 's' : ''}`)}`
  } else {
    output += `${cyan('eslint: ')}${grey('No problems found')}`
  }

  return output + '\n'
}
