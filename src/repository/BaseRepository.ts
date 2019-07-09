import { IBaseRepository } from "./IBaseRepository";
import { CosmosClient, Database, Container } from "@azure/cosmos";
import { debug } from "console";


export abstract class BaseRepository<T> implements IBaseRepository<T> {
    client: CosmosClient;
    databaseId: string;
    collectionId: string;
    database: Database | undefined;
    container: Container | undefined;


    constructor(cosmosClient: CosmosClient, databaseId: string, containerId: string) {
        this.client = cosmosClient;
        this.databaseId = databaseId;
        this.collectionId = containerId
    }

    async init() {
        debug("Setting up the database...");
        const dbResponse = await this.client.databases.createIfNotExists({
            id: this.databaseId
        });
        this.database = dbResponse.database;
        debug("Setting up the database...done!");
        debug("Setting up the container...");
        const coResponse = await this.database.containers.createIfNotExists({
            id: this.collectionId
        });
        this.container = coResponse.container;
        debug("Setting up the container...done!");
    }

    findByField(field: string, value: string) {
        throw new Error("Method not implemented.");
    }

    async getItems(): Promise<T[]> {
        if (!this.container) {
            throw this.theError()
        }
        const body = await this.container.items.readAll().toArray();
        return Promise.resolve(body.result as T[]);
    }

    async getItem(itemId: string): Promise<T> {
        if (!this.container) {
            throw this.theError()
        }
        let item: T;
        const result = await this.container.item(itemId).read<T>();
        item = <T>result.body;
        return Promise.resolve(item)
    }

    async updateItem(itemId: string): Promise<boolean> {
        if (!this.container) {
            throw this.theError()
        }
        const doc = await this.container.item(itemId).read();
        if (!doc.body) {
            throw new Error(`Where is no document with Id = ${itemId}`);
        }
        doc.body.completed = true;

        const { body: replaced } = await this.container.item(itemId).replace(doc);
        return Promise.resolve(!!replaced)
    }

    async deleteItem(item: T): Promise<boolean> {
        if (!this.container) {
            throw this.theError()
        }
        const { body: doc } = await this.container.delete(item);
        return Promise.resolve(true);
    }

    async addItem(item: T): Promise<boolean> {
        if (!this.container) {
            throw this.theError()
        }
        const { body: doc } = await this.container.items.create(item);
        return Promise.resolve(true);
    }

    theError() {
        return new Error("Collection is not initialized.");
    }


}