import { TablesRepository } from "../../repositories/tables/ITablesRepository";

export class SetBusyTableUseCase {
    constructor(
        private tableRepository: TablesRepository
    ) { }

    async execute(id: string) {
        try {
            await this.tableRepository.setBusy(id);
            
        } catch (err) {
            return Promise.reject(err)
        }
    }
}