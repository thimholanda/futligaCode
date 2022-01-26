import {format, parseISO} from 'date-fns';

export class Convert {
  static toDate = (date: Date) => {
    return (
      date.getUTCFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getDay() +
      'T00:00:00'
    );
  };

  static stringTodate = (date: any, sformat: string = 'yyyy-MM-dd'): string => {
    let dateFinal = '';
    dateFinal = date.replace('Z', '');
    return format(parseISO(dateFinal), sformat);
  };

  static stringTodateShort = (date: any, sformat: string = 'dd/MM'): string => {
    let dateFinal = '';
    dateFinal = date.replace('Z', '');
    return format(parseISO(dateFinal), sformat);
  };

  static stringToTimeShort = (date: any, sformat: string = 'hh:mm'): string => {
    let dateFinal = '';
    dateFinal = date.replace('Z', '');
    return format(parseISO(dateFinal), sformat);
  };

  static zeroPad = (nr: number, base: string) => {
    var len = String(base).length - String(nr).length + 1;
    return len > 0 ? new Array(len).join('0') + nr : nr;
  };
}
