import {IStreamLogger} from "./stream-logger";
import {ChildProcessWithoutNullStreams} from "child_process";

export class StreamHandler {
    constructor(private logger: IStreamLogger) {}

    // проксируем изначальный стрим в произвольный логгер, блтко к паттерну Proxy
    processOutput(stream: ChildProcessWithoutNullStreams) {
        stream.stdout.on('data', (data: any) => {
            this.logger.log(data)
        })

        stream.stderr.on('data', (data: any) => {
            this.logger.error(data)
        })

        stream.on('close', () => {
            this.logger.end()
        })
    }
}