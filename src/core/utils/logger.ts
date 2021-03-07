import winston, { loggers } from 'winston';

const Logger: winston.Logger = winston.createLogger({
    transports: [
        new winston.transports.File({filename: 'error.log',level: 'error'}),
        new winston.transports.File({filename:'combine.log'})
    ],
    format: winston.format.combine(
        winston.format.colorize({all: true}),
        winston.format.simple()
    ),
});

if(process.env.NODE_ENV !== 'production'){
    Logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

export default Logger;