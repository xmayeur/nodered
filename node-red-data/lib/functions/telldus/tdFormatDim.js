// name: tdFormatDim
// outputs: 1
var device = {"name": "", "value": 0};
var s = msg.topic.split('/');
device.name = s[4] ;
device.value = msg.payload ; 
msg.payload = device;
return msg;