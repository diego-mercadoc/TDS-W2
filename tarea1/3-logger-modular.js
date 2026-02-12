"use strict";

const fs = require("fs");

const Logger = (function () {
  const LEVEL_PRIORITY = {
    info: 1,
    warn: 2,
    error: 3,
  };

  let settings = {
    level: "info", // info | warn | error
    output: "console", // console | file
    filePath: "./tarea1/logger.log",
  };

  function shouldLog(level) {
    return LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[settings.level];
  }

  function format(level, message) {
    const time = new Date().toISOString();
    return `[${time}] [${level.toUpperCase()}] ${message}`;
  }

  function write(level, message) {
    if (!shouldLog(level)) return;

    const line = format(level, message);

    if (settings.output === "file") {
      fs.appendFileSync(settings.filePath, line + "\n", "utf8");
      return;
    }

    if (level === "error") console.error(line);
    else if (level === "warn") console.warn(line);
    else console.log(line);
  }

  return {
    setSettings(newSettings = {}) {
      settings = { ...settings, ...newSettings };
    },
    getSettings() {
      return { ...settings };
    },
    info(message) {
      write("info", message);
    },
    warn(message) {
      write("warn", message);
    },
    error(message) {
      write("error", message);
    },
  };
})();

console.log("Demo logger -> output consola, level warn");
Logger.setSettings({ level: "warn", output: "console" });
Logger.info("Este mensaje NO sale");
Logger.warn("Este warning si sale");
Logger.error("Este error si sale");

console.log("\nDemo logger -> output archivo, level info");
Logger.setSettings({ level: "info", output: "file", filePath: "./tarea1/logger.log" });
Logger.info("Info guardado en archivo");
Logger.warn("Warn guardado en archivo");
Logger.error("Error guardado en archivo");
console.log("Logs escritos en ./tarea1/logger.log");

module.exports = { Logger };
