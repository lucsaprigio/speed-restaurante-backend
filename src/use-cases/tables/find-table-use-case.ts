import { TablesRepository } from "../../repositories/tables/ITablesRepository";

export class FindTableUseCase {
    constructor(
        private tablesRepository: TablesRepository
    ) { }

    async execute(id: string) {
        try {
            const table = await this.tablesRepository.find(id);

            if (!table[0]) {
                return Promise.reject('Mesa não encotrada.')
            }

            return table;
        } catch (err) {
            return Promise.reject(err);
        }
    }
}