interface DB_MOB_PEDIDO_CABE {
    CD_PEDIDO: number;
    CD_MESA: number;
    OBS: string;
    TOTAL: number;
    FECHADO: number;
}

interface DB_MOB_PEDIDO_LANCA {
    ITEN: number;
    CD_PRODUTO: number;
    DESCRICAO_PRODUTO: string
    UNIT_PRODUTO: number;
    DESCONTO_PRODUTO: number;
    QTD_PRODUTO:number;
    TOTAL_PRODUTO: number;
    OBS_PRODUTO: number
    CD_PEDIDO: number;
}