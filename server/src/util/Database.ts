import DatabaseConstructor, { Database } from 'better-sqlite3';
import path from "path";

class DB {

    db: Database;

    constructor() {
        this.db = new DatabaseConstructor(path.join('data', 'brutusforce.db'));
    }

    select(query: string, _options: string[] | {} = []): any {
        return this.db.prepare(query).all(_options)
    }

    close(): void {
        this.db.close();
    }

}

export default DB;