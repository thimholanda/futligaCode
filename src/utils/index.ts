import {format, parseISO} from 'date-fns';

export class Convert {
  static stringTodate = (
    date: string,
    sformat: string = 'yyyy-MM-dd',
  ): string => {
    date = date.replace('Z', '');
    return format(parseISO(date), sformat);
  };
}
