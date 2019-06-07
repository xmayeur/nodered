// name: check dim state
// outputs: 1
context.status = context.status || 'undefined';
context.statevalue = context.statevalue || 0;

if (msg.topic === 'common/telldus live/54242/devices/PlafonnierSalleManger/state value') {
    context.statevalue = msg.payload;    
} 
else if (msg.topic === 'common/telldus live/54242/devices/PlafonnierSalleManger/status') {
    context.status = msg.payload;
}

if (context.status === 'on' && context.statevalue === 'undefined') {
    msg.payload = 255;
} 
else if (context.status === 'off') {
    msg.payload = 0;
} else {
    msg.payload = context.statevalue
}

return msg;