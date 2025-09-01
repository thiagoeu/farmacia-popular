import { Provider } from '@nestjs/common';
import * as winston from 'winston';
import moment from 'moment-timezone'; // CORRIGIDO: moment-timezone, não só moment

export const WinstonLoggerProvider: Provider = {
  provide: 'winston',
  useFactory: () => {
    return winston.createLogger({
      transports: [
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
      ],
    });
  },
};
