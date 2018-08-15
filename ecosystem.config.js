const isProduction = process.env.NODE_ENV !== 'development'


module.exports = {
  "apps":[
    {
      name: "Authentication Micro Service",
      script:"./dist/server.prod.js",
      exec_mode: "cluster",
      instances: "max",
      kill_timeout: 1600,

      output: './logs/out.log',
      error: './logs/error.log',
      pid_file : "./logs/service.pid",
      merge_logs: true,
      node_args: ["--inspect"]
    }
  ]
}