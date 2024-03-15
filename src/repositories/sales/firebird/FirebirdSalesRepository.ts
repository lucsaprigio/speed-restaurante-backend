import { executeQuery } from "../../../firebird/firebird";
import { ISaleLaunch, ISalesRepository, SalesRepository } from "../ISalesRepository";

export class FirebirdSalesRepository implements SalesRepository {
    async find(id: string) {
        try {
            const sale = await executeQuery(`
            SELECT CD_PEDIDO, CD_MESA, OBS, FECHADO, TOTAL FROM DB_MOB_PEDIDO,
            INNER JOIN DB_MOB_PEDIDO_LANCA ON DB_MOB_PEDIDO_CABE.CD_PEDIDO = DB_MOB_PEDIDO_LANCA.CD_PEDIDO           
            `, []);
        } catch (err) {
            console.log(err)
            return Promise.reject(err);
        }
    }

    async createSale({ id, closed, obs, tableId, total }: ISalesRepository): Promise<void> {

    }

    async createSaleLaunch({ id, descount, obsProduct, price, productId, quantity, saleId, totalProduct }: ISaleLaunch) {

    }

    async updateSale({ id, closed, obs, tableId, total }: ISalesRepository) {
        try {

        } catch (err) {

        }
    }

    async updateSaleLaunch({ id, descount, obsProduct, price, productId, quantity, saleId, totalProduct }: ISaleLaunch) {
        try {

        } catch (err) {

        }
    }

    async deleteSale(id: string) {
        try {

        } catch (err) {

        }
    }

    async deleteSaleLaunch(id: string) {
        try {

        } catch (err) {

        }
    }
}