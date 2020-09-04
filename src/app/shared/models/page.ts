export interface Page<T> {
    content: Array<T>;
    number: number;
    first: boolean;
    last: boolean;
    size: number;
    totalPages: number;
    totalElements: number;
}
