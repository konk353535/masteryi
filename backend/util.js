const getPlatformID = function (serverID){
  if(serverID.toLowerCase() === 'oce') return 'OC1'
  if(serverID.toLowerCase() === 'na') return 'NA1'
  if(serverID.toLowerCase() === 'euw') return 'EUW1'
  if(serverID.toLowerCase() === 'eune') return 'EUN1'
}

const toSingleObject = function (arr, key){
  var newObject = {};
  for (var i = 0; i < arr.length; i++){
    var item = arr[i];
    var itemKey = item[key];
    newObject[itemKey] = item;
  }

  return newObject
}

module.exports = {
  getPlatformID: getPlatformID,
  toSingleObject: toSingleObject
}
