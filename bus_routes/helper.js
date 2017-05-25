'use strict';
var rp = require('request-promise');
var _ = require('lodash');
var ENDPOINT = 'https://mcb-api.herokuapp.com/get_routes_by_bus_num?bus_num='
// var rp = require('request-promise');


module.change_code = 1;



function DataHelper() {}

// DataHelper.prototype.requestAirportStatus = function(routes) {
//   return this.getBusStatus(routes).then(
//     function(response) {
//       console.log('success - received route info for ');  
//       var data = response.body.data.route
//       // console.log(data)
//     }
//     );
// };
      


DataHelper.prototype.requestAirportStatus = function(bus_num) {
  var options = {
    method: 'GET',
    uri: ENDPOINT+bus_num ,
    resolveWithFullResponse: true,
    json: true
  };
  
  return rp(options).then(function(response){
  	return response
  	console.log(response)
  });
};

module.exports = DataHelper;