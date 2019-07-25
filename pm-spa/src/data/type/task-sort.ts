import { SortType } from './sort-type';
import { SortDirection } from './sort-direction';

export interface TaskSort {
    id: string;
    sort: SortDirection;
    type: SortType;
}
