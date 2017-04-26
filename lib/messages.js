const chalk = require('chalk')
const output = require('./utils/output')

const program = {
  name: 'create-next-app'
}

exports.help = function () {
  return `
    Only ${chalk.green('<project-directory>')} is required.

    If you have any problems, do not hesitate to file an issue:
      ${chalk.cyan('https://github.com/segmentio/create-next-app/issues/new')}
  `
}

exports.exampleHelp = function () {
  return `Example from https://github.com/zeit/next.js/tree/master/examples/ ${output.param('example-path')}`
}

exports.missingProjectName = function () {
  return `
Please specify the project directory:

  ${chalk.cyan(program.name)} ${chalk.green('<project-directory>')}

For example:

  ${chalk.cyan(program.name)} ${chalk.green('my-next-app')}
  ${chalk.cyan(program.name)} ${chalk.cyan('--example custom-server')} ${chalk.green('custom-server-app')}

Run ${chalk.cyan(`${program.name} --help`)} to see all options.
`
}

exports.alreadyExists = function (projectName) {
  return `
Uh oh! Looks like there's already a directory called ${chalk.red(projectName)}. Please try a different name or delete that folder.`
}

exports.installing = function (packages) {
  const pkgText = packages.map(function (pkg) {
    return `    ${chalk.cyan(chalk.bold(pkg))}`
  }).join('\n')

  return `
  Installing npm modules:
${pkgText}
`
}

exports.installError = function (packages) {
  const pkgText = packages.map(function (pkg) {
    return `${chalk.cyan(chalk.bold(pkg))}`
  }).join(', ')

  output.error(`Failed to install ${pkgText}, try again.`)
}

exports.copying = function (projectName) {
  return `
Creating ${chalk.bold(chalk.green(projectName))}...
`
}

exports.start = function (projectName) {
  return `
  ${chalk.green('Awesome!')} You're now ready to start coding.

  We already ran ${output.cmd('npm install')} for you, so your next steps are:

  $ ${output.cmd(`cd ${projectName}`)}

  To build a version for production:

  $ ${output.cmd(`npm run build`)}

  To run the server in production:

  $ ${output.cmd(`npm run start`)}

  To start a local server for development:

  $ ${output.cmd(`npm run dev`)}

  Questions? Feedback? Please let us know!

  ${chalk.green('https://github.com/segmentio/create-next-app/issues')}
`
}
