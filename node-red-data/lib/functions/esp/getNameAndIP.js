// name: getNameAndIP
// outputs: 1
context.espList = context.espList || {};

var buffer = msg.payload;
var esp = {};
var ip;
var name;
ip = buffer[8].toString() +'.' + buffer[9].toString() + '.' + buffer[10].toString() +'.' + buffer[11].toString();
name = buffer.toString('utf8', 15, 39)
esp.ip = ip;
esp.name = name;
esp.lastDate = new Date();
context.espList[ip] = esp;

// msg.payload = name + ": " + ip;
msg.payload = context.espList;
return msg;