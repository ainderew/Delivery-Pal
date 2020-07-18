cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-facebook4.FacebookConnectPlugin",
      "file": "plugins/cordova-plugin-facebook4/www/facebook-native.js",
      "pluginId": "cordova-plugin-facebook4",
      "clobbers": [
        "facebookConnectPlugin"
      ]
    },
    {
      "id": "cordova-plugin-fetch.FetchPlugin",
      "file": "plugins/cordova-plugin-fetch/www/fetch.js",
      "pluginId": "cordova-plugin-fetch",
      "clobbers": [
        "cordovaFetch"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-facebook4": "6.4.0",
    "cordova-plugin-fetch": "0.1.0",
    "cordova-plugin-whitelist": "1.3.4"
  };
});