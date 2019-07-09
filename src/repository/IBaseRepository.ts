export interface IBaseRepository<T> {

    findByField(field: string, value: string): any;

    getItems(): Promise<T[]>;

    getItem(itemId: string): Promise<T>;

    updateItem(itemId: string): Promise<boolean>;

    deleteItem(item: T): Promise<boolean>;

    addItem(item: T): Promise<boolean>;

}