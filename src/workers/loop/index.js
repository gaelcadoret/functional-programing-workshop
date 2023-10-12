const { parentPort, isMainThread} = require('node:worker_threads');

const workerName = 'loop';

;(() => {
    console.log('isMainThread', isMainThread);

    parentPort.on('message', (data) => {
        console.log(`[${workerName}] data from parent`, data);

        parentPort.postMessage({
            origin: workerName,
            destination: 'loop2',
            message: 'message from worker 1',
            timestamp: new Date(Date.now()).toISOString(),
        })

        if (data.action === 'start') {
            let n = 1000;
            while (n--) Math.sin(n);

            parentPort.postMessage({
                n,
                success: true,
                origin: workerName,
                terminate: true,
                timestamp: new Date(Date.now()).toISOString()
            })
        }
    });

    parentPort.postMessage({
        success: true,
        origin: workerName,
        message: 'worker has been started.',
        timestamp: new Date(Date.now()).toISOString()
    })
})();