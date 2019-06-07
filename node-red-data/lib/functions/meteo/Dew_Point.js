// name: Dew_Point
// outputs: 1
context.temp = context.temp || 0.0;
context.humidity = context.humidity || 0.0;
var dewPoint = 0.00;

if (msg.topic === 'common/telldus live/Home/sensors/Jardin/data/temperature/value') {
    context.temp = msg.payload
} else if (msg.topic === 'common/telldus live/Home/sensors/Jardin/data/humidity/value') {
    context.humidity = msg.payload
}
dewPoint = context.temp - (100-context.humidity)/5

return {topic: 'dew_point', payload: dewPoint.toFixed(2)}
return msg;