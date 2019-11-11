const {google} = require("googleapis");
const googleConfig = require("../../config.json").google;


const googleUtils = {
  search : async function(message, query){
    try{
      const search = google.customsearch('v1');
      const result = await search.cse.list({
        auth  : googleConfig.search.apiKey,
        cx    : googleConfig.search.engineId,
        q     : query,
        num   : 5
      });
      return result.data.items;
    }catch(error){
      return {
        error: error.message
      }
    }
  }
}

module.exports = googleUtils;