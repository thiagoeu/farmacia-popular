import { Provider } from '@nestjs/common';
import * as winston from 'winston';
import moment from 'moment-timezone';

export const WinstonLoggerProvider: Provider = {
  provide: 'winston',
  useFactory: () => {
    return winston.createLogger({
      transports: [
        // Console (terminal)
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({
              format: () =>
                moment()
                  .tz('America/Sao_Paulo')
                  .format('YYYY-MM-DD HH:mm:ss.SSS Z'),
            }),
            winston.format.colorize(),
            winston.format.printf(({ timestamp, level, message }) => {
              return `[${timestamp}] ${level}: ${message}`;
            }),
          ),
        }),

        // Arquivo de log
        new winston.transports.File({
          filename: 'logs/app.log', // caminho do arquivo de logs
          format: winston.format.combine(
            winston.format.timestamp({
              format: () =>
                moment()
                  .tz('America/Sao_Paulo')
                  .format('YYYY-MM-DD HH:mm:ss.SSS Z'),
            }),
            winston.format.printf(({ timestamp, level, message }) => {
              return `[${timestamp}] ${level}: ${message}`;
            }),
          ),
          level: 'info', // grava logs info e acima (warn, error...)
        }),
      ],
    });
  },
};
