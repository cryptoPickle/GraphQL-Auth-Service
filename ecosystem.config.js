module.exports = {
  "apps":[
    {
      "name": "Authentication Micro Service",
      "script": "./dist/server.prod.js",
      "exec_mode": "cluster",
      "instances": 4
    }
  ]
}