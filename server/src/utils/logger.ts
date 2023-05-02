import logger from 'pino';
import { formatInTimeZone } from 'date-fns-tz';

export const formatDate = (date: string | Date | number, fmt: string) => formatInTimeZone(date, 'UTC', fmt);

export default logger({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${formatDate(new Date(), 'hh:mm:ss')}"`,
});
