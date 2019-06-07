// name: telldusSetOnOffDevices
// outputs: 1
// Node-RED function to
// a) list all Telldus devices (device = everything in Telldus Live except sensors)
//
// The code below relies on the following modules to be installed in the Node-RED environment, including being set up
// in the functionGlobalContext section of the Node-RED settings.js config file (see last section of http://nodered.org/docs/writing-functions.html page)
//
// a) Telldus-Live module (https://github.com/TheThingSystem/node-telldus-live)
//
//
// The function will fire one output message for each device it gets information about from Telldus Live.
// By default the device id and name is included in the messages, but this can be customised as needed.
//

// Define Telldus Live API credentials
var publicKey = flow.get('publicKey');
var privateKey = flow.get('privateKey') ;
var token = flow.get('token');
var tokenSecret = flow.get('tokenSecret');

var cloud  ;

var id = msg.payload.id;
var value = msg.payload.value;
var deviceName = msg.payload.name;

// var devices = flow.get('devices') || {};
// var device = devices.find(d => d.id === id);
// var device = devices.find(d => d.name === deviceName);
var device = flow.get(deviceName) || {};

f = function(offset, p, s) {
    return function(err, device) {
        var d, type, types;

        if (!!err) return console.log(s + ' id=' + p.id + ': ' + err.message);

        console.log('device #' + offset + ' ' + s + ': '); console.log(device);
        types = { 'selflearning-switch' : 'onoff', 'selflearning-dimmer' : 'dimmer', 'codeswitch'          : 'onoff' };

        type = null;
        d = device.model.split(':');
        type = types[d[0]];
        if (!type) return;

        console.log('/device/switch' + '/' + (d[d.length - 1] || 'telldus') + '/' + type);
        console.log('    uuid=teldus:' + device.id);
        console.log('    perform: off, on');
        console.log('    name: ' + device.name);
        console.log('last update: ' + device.lastUpdated*1000);
        console.log('    status: ' + (device.online === '0' ? 'absent' : device.status));
        console.log('    info:');
        if (type === 'dimmer') console.log('      dimmer: percentage');
        console.log('    values:');
        if (type === 'dimmer') console.log('      dimmer: ' + Math.round((1-(255 - device.statevalue)/255)*100) + '%');
        console.log('');

    };
};

// for (i = 0; i < devices.length; i++) {
//   if (devices[i].type === 'device')  f(i, devices[i], 'getDeviceInfo');
// }
    if (device.type === 'device') f(0, device, 'getDeviceInfo'); 


// Create and log into new TelldusAPI object
cloud = new context.global.telldusLive.TelldusAPI({ publicKey  : publicKey, privateKey : privateKey });

cloud.login(token, tokenSecret, function(err, user) {
  if (!!err) return console.log('login error: ' + err.message);
  cloud.onOffDevice(device, value, function(err, results) {
    if(!!err) return JSON.stringify(err.message); // console.log('login error: ' + err.message);
    msg.payload = JSON.stringify(results);
  });
 
}).on('error', function(err) {
  console.log('background error: ' + err.message);
});


return msg;