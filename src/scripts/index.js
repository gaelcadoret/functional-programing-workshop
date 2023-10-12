const startResourceUsage = process.resourceUsage()
const startTime = process.hrtime();

/**
 * resourceUsage {
 *   userCPUTime: 43672,    // microseconds - process.cpuUsage().user
 *   systemCPUTime: 0,      // microseconds - process.cpuUsage().system
 *   maxRSS: 32844,         // maximum resident set size used in kilobytes
 *   sharedMemorySize: 0,
 *   unsharedDataSize: 0,
 *   unsharedStackSize: 0,
 *   minorPageFault: 2495,  // number of minor page faults for the process (https://en.wikipedia.org/wiki/Page_fault#Minor)
 *   majorPageFault: 0,
 *   swappedOut: 0,
 *   fsRead: 0,             // number of times the file system had to perform input
 *   fsWrite: 0,            // number of times the file system had to perform output
 *   ipcSent: 0,            // FIXME not supported by any platform
 *   ipcReceived: 0,        // FIXME not supported by any platform
 *   signalsCount: 0,       // FIXME not supported by any platform
 *   voluntaryContextSwitches: 14,
 *   involuntaryContextSwitches: 0
 * }
 * @type {number}
 */

const { Worker, isMainThread } = require('node:worker_threads');
const path = require("path");

const loopListener = require("../workers/loop/listeners");
const loop2Listener = require("../workers/loop2/listeners");

const _dirname = path.dirname(__dirname);

const workers = {
    loop: new Worker(`${_dirname}/workers/loop`),
    loop2: new Worker(`${_dirname}/workers/loop2`),
}

workers.loop.on('message', loopListener(workers));
workers.loop2.on('message', loop2Listener(workers));

setTimeout(() => {
    workers.loop.postMessage({
        action: 'start',
    });
}, 3000)

const time = process.hrtime(startTime); // nanosecondes
const resourceUsage = process.resourceUsage(startResourceUsage)
const cpuUsage = 100 * 1000 * (resourceUsage.userCPUTime + resourceUsage.systemCPUTime) / (time[0] * 1e9 + time[1]);

console.log('cpuUsage', cpuUsage)