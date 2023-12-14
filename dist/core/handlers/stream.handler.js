"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamHandler = void 0;
class StreamHandler {
    constructor(logger) {
        this.logger = logger;
    }
    // проксируем изначальный стрим в произвольный логгер, блтко к паттерну Proxy
    processOutput(stream) {
        stream.stdout.on('data', (data) => {
            this.logger.log(data.toString);
        });
        stream.stderr.on('data', (data) => {
            this.logger.error(data.toString);
        });
        stream.on('close', () => {
            this.logger.end();
        });
    }
}
exports.StreamHandler = StreamHandler;
