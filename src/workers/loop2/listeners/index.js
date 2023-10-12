const { messagingController } = require("../../utils");

const loop2Listener = (workers) => (data) => {
    console.log('loop2 has receive a new message =>', data)
    workers.loop2.performance.eventLoopUtilization();

    messagingController(workers, data);

    if (data.terminate) {
        // worker2.terminate();
    }
}

module.exports = loop2Listener;