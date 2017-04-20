module.exports = {
  apps: [{
    name: 'Staging',
    script: './server.js',
    watch: true,
    env: {
      'NODE_ENV': 'staging',
      'PORT': 3456
    }
  }, {
    name: 'Production',
    script: './server_dummy.js',
    watch: true,
    env: {
      'NODE_ENV': 'production',
      'PORT': 3000
    }
  }]
}
