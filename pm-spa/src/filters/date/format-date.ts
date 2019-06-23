import { format } from 'date-fns';

export default (input: Date, formatStr: string) => {
    return format(input, formatStr || 'DD-MM-YYYY');
};
