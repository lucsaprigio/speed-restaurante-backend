import { TablesRepository } from "../../repositories/tables/ITablesRepository";

export class ListTableUseCase {
    constructor(
        private tablesRepository: TablesRepository
    ) { }

    async execute() {
        try {
            const tables = await this.tablesRepository.list();

            return tables;
        } catch (err) {
            return Promise.reject(err)
        }
    }
}