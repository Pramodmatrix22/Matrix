const chokidar = require("chokidar");
const BASE_DIR = process.cwd() + "/api";

const watcher = chokidar.watch(BASE_DIR, {
	ignored: /(^|[\/\\])\../, // ignore dotfiles
	persistent: true,
});

module.exports = watcher;
