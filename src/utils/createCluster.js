import cluster from "cluster";

const createCluster = (count = 1, cb) => {
  if (cluster.isMaster) {
    for (let i = 0; i < count; i++) {
      cluster.fork();
    }
  } else {
    cb();
  }
};

export default createCluster;
