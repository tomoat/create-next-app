const execa = require('execa')
const Promise = require('promise')
const messages = require('../messages')
const output = require('./output')

module.exports = function install (opts) {
  const projectName = opts.projectName
  const projectPath = opts.projectPath
  const packages = opts.packages || []

  if (packages.length === 0) {
    console.log('Missing packages in `install`, try running again.')
    process.exit(1)
  }

  let installCmd = getInstallCmd()
  let installArgs = ['--save', '--save-exact']

  if (installCmd === 'npm') {
    installArgs.unshift('install')
  }

  packages.forEach(function (pkg) {
    installArgs.push(pkg)
  })

  installArgs.push('--verbose')

  console.log(messages.installing(packages))
  process.chdir(projectPath)

  return new Promise(function (resolve, reject) {
    const stopInstallSpinner = output.wait('Installing modules')

    execa(installCmd, installArgs).then(function () {
      stopInstallSpinner()
      output.success(`Installed dependencies for ${projectName}`)
      resolve()
    }).catch(function (err) {
      stopInstallSpinner()
      console.log(messages.installError(packages))
      return reject(new Error('NPM installation failed'))
    })
  })
}

function getInstallCmd () {
  return 'npm'
}
