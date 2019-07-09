import { BaseRepository } from "./BaseRepository";
import { Task } from "../models/task"
import { CosmosClient } from "@azure/cosmos";
import { cosmosDbConfig } from "../dbconfig";

export class TodoRepository extends BaseRepository<Task>{

}

const client = new CosmosClient({
    endpoint: cosmosDbConfig.host,
    auth: {
        masterKey: cosmosDbConfig.authKey
    }
});

let todoRepository = new TodoRepository(client, "todoList", "todos");
todoRepository.init();


export { todoRepository };