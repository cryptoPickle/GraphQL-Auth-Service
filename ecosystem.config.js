const isProduction = process.env.NODE_ENV !== 'development'


module.exports = {
  "apps":[
    {
      name: "Authentication Micro Service",
      script:"./dist/server.prod.js",
      exec_mode: "cluster",
      instances: isProduction ? "max" : 2,
      kill_timeout: 1600,

      output: './logs/out.log',
      error: './logs/error.log',
      merge_logs: true,
      watch:  ".",
      node_args: ["--inspect"]
    }
  ]
}