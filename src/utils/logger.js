const winston = require('winston');
const path = require('path');

// Define log file paths
const infoLogPath = path.join(__dirname, '../../logs/info.log');
const errorLogPath = path.join(__dirname, '../../logs/error.log');

// Create logger instance
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(info => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
        })
    ),
    transports: [
        new winston.transports.File({ filename: infoLogPath, level: 'info' }),
        new winston.transports.File({ filename: errorLogPath, level: 'error' }),
    ]
});

// If we're not in production then log to the `console` with the format:
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

module.exports = logger;