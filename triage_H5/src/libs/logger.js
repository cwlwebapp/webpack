const loggerDebug = false;
const logger = {};

logger.debug = function (str) {
  logger.log(str, "debug");
};

logger.info = function (str) {
  logger.log(str, "info");
};

logger.warn = function (str) {
  logger.log(str, "warn");
};

logger.error = function (str) {
  logger.log(str, "error");
};

logger.log = function (str, level) {
  if (loggerDebug) {
    let logNode = document.querySelector("#j-log");
    if (logNode == null) {
      logNode = document.createElement("div");
      logNode.id = "j-log";
      document.getElementsByTagName("body")[0].appendChild(logNode);
    }

    const pNode = document.createElement("p");
    if (level === "warn") {
      pNode.style.color = "#c7be47";
    } else if (level === "error") {
      pNode.style.color = "#ff0000";
    }

    console.log(str, typeof (str))
    pNode.innerText = typeof (str) === 'object' ? JSON.stringify(str) : String(str);
    logNode.appendChild(pNode);
  } else {
    console.log(str)
  }
};

module.exports = logger;
