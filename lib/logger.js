const winston = require('winston');
require('winston-daily-rotate-file');
require('date-utils');

const logger = {
    login: winston.createLogger({
        level: 'info',
        transports: [
            new winston.transports.DailyRotateFile({
                filename: 'log/early_%DATE%_login.log',
                zippedArchive: false,
                format: winston.format.printf(
                    info => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${info.level.toUpperCase()}] - ${info.message}`)
            }),
            new winston.transports.Console({
                format: winston.format.printf(
                    info => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${info.level.toUpperCase()}] - ${info.message}`)
            })
        ]
    }),
    download: winston.createLogger({
        level: 'info',
        transports: [
            new winston.transports.DailyRotateFile({
                filename: 'log/early_%DATE%_download.log',
                zippedArchive: false,
                format: winston.format.printf(
                    info => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${info.level.toUpperCase()}] - ${info.message}`)
            }),
            new winston.transports.Console({
                format: winston.format.printf(
                    info => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${info.level.toUpperCase()}] - ${info.message}`)
            })
        ]
    }),
    flag_submit: winston.createLogger({
        level: 'info',
        transports: [
            new winston.transports.DailyRotateFile({
                filename: 'log/early_%DATE%_flag-submit.log',
                zippedArchive: false,
                format: winston.format.printf(
                    info => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${info.level.toUpperCase()}] - ${info.message}`)
            }),
            new winston.transports.Console({
                format: winston.format.printf(
                    info => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${info.level.toUpperCase()}] - ${info.message}`)
            })
        ]
    }),
    handler: winston.createLogger({
        level: 'error',
        transports: [
            new winston.transports.DailyRotateFile({
                filename: 'log/early_%DATE%_err.log',
                zippedArchive: false,
                format: winston.format.printf(
                    error => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${error.level.toUpperCase()}] - ${error.message}`)
            }),
            new winston.transports.Console({
                format: winston.format.printf(
                    error => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${error.level.toUpperCase()}] - ${error.message}`)
            })
        ]
    })
};

const logger_login = (req, data) => {
    const currentURL = req.protocol+'://' + req.get('host') + req.originalUrl;
    logger.login.info(req.connection.remoteAddress.toString() + ' ' + req.headers["user-agent"] + ' referer: ' + req.headers["referer"] + ' url: ' + currentURL + data);
}

const logger_download = (req, data) => {
    const currentURL = req.protocol+'://' + req.get('host') + req.originalUrl;
    logger.download.info(req.connection.remoteAddress.toString() + ' ' + req.headers["user-agent"] + ' referer: ' + req.headers["referer"] + ' url: ' + currentURL + data);
}

const logger_flag = (req, data) => {
    const currentURL = req.protocol+'://' + req.get('host') + req.originalUrl;
    logger.flag_submit.info(req.connection.remoteAddress.toString() + ' ' + req.headers["user-agent"] + ' referer: ' + req.headers["referer"] + ' url: ' + currentURL + data);
}

const logger_error = (req, data) => {
    const currentURL = req.protocol+'://' + req.get('host') + req.originalUrl;
    logger.handler.error(req.connection.remoteAddress.toString() + ' ' + req.headers["user-agent"] + ' referer: ' + req.headers["referer"] + ' url: ' + currentURL + data);
}

module.exports = {
    logger_login,
    logger_download,
    logger_flag,
    logger_error,
};