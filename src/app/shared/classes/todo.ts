export class Todo {
    constructor(item: string, id?: string, completed?: boolean, createdAt?: Date, updatedAt?: Date){
        this.id = id ? id : '';
        this.item = item;        
        this.completed = completed ? completed: false;
        this.createdAt = createdAt ? createdAt: new Date();
        this.updatedAt = updatedAt ? updatedAt: new Date();
    }
    
    id: string;
    item: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}
