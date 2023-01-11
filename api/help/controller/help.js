const Core = require("../../../core");
 const helpService=require("../services/help");
const helpController=Core.CoreController(helpService);
module.exports = helpController;