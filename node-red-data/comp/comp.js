module.exports = function(RED) {
    function CompNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		var this.threshold = context.threshold ;
		var this.hyst = context.hysteresis ;
		
        node.on('input', function(msg) {
			var n = msg.payload ;

			var oldOutput = this.context().get('oldOutput') || false;
			if (isNaN(n)) {
				n = parseInt(n)
			}
			if (n > node.threshold + node.hyst/2) {
					msg.payload = true;
			} else if (n < node.threshold - node.hyst/2){
					msg.payload = false;
			} else {
				msg.payload = oldOutput ;
			}
            this.context().set('oldOutput', msg.payload)
            node.send(msg);
        });
    }
    RED.nodes.registerType("comp",CompNode);
}