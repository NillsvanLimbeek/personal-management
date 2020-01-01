import { SortDirection } from '@type/sort-direction';

export interface ITaskSection {
    id: string;
    taskIds: string[];
    title: string;
    isOpen?: boolean;
    sort?: SortDirection;
}
