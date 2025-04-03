const ra = '2123689'
const host = 'https://todo-server-spa-748269297649.southamerica-east1.run.app/api' 

export { ra, host };

export interface TodoItem {
    id: number;
    description: string;
    tags?: string[];
    deadline?: string;
}

interface TodoServiceDTO {
    items?: TodoItem[];
    status: "ok" | "failure";
    message?: string;
    debug?: string;
    item?: TodoItem
}

class TodoRepository {
    async list(): Promise<TodoItem[]> {
        const response = await fetch(`${host}/${ra}`);

        if (response.ok) {
            const data: TodoServiceDTO = await response.json();

            if (data.status === "ok") {
                return data.items ?? [];
            }
        }
        throw new Error(`Server-side error. Failed to list: ${await response.json()}`);
    }

    async insert(item: TodoItem): Promise<void> {
        const response = await fetch(`${host}/${ra}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        });

        if (!response.ok) {
            throw new Error(`Server-side error. Failed to insert: ${await response.text()}`);
        }
    }

    async update(item: TodoItem): Promise<void> {
        const response = await fetch(`${host}/${ra}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        });
        if (!response.ok) {
            throw new Error(`Server-side error. Failed to update: ${await response.text()}`);
        }
    }

    async removeById(id: string): Promise<void> {
        const response = await fetch(`${host}/${ra}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Server-side error. Failed to remove: ${await response.text()}`);
        }
    }

    async findById(id: string): Promise<TodoItem> {
        const response = await fetch(`${host}/${ra}/${id}`);

        if (!response.ok) {
            throw new Error(`Server-side error. Status: ${await response.text()}`);
        }
        
        const data: TodoServiceDTO = await response.json();

        if (!data.item) {
            throw new Error(`No item with the given id was found`);
        }

        return data.item;
    }
}

const todoRepository = new TodoRepository();

export {todoRepository};