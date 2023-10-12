const { messagingController } = require("../../utils");

const loopListener = (workers) => (data) => {
    console.log('loop has receive a new message =>', data)
    workers.loop.performance.eventLoopUtilization();

    messagingController(workers, data);

    if (data.terminate) {
        // worker.terminate();
    }
}

module.exports = loopListener;
