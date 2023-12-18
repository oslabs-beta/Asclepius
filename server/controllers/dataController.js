const { spawn, spawnSync } = require("child_process");
const dataController = {
  getName: (req, res, next) => {
    console.log("getting name");
    const name = spawnSync("kubectl config current-context", {
      stdio: "inherit",
      shell: true,
    });
    console.log("name:", name.stdout);
    res.locals.cluster = name;
    return next();
  },
};

module.exports = dataController;
