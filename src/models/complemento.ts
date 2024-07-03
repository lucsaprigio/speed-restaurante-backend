interface DB_MOB_REST_PROD_COMPLEMENTO {
    CD_PRODUTO: string;
    DESCRICAO_COMPLEMENTO: string;
    ADICIONAL: 'S' | 'N';
    QTD_COMPLEMENTO: number;
    VR_UNIT: number;
}

/* 
CREATE TABLE DB_MOB_REST_PROD_COMPLEMENTO (
    ITEN INTEGER NOT NULL,
    CD_PRODUTO INTEGER,
    DESCRICAO_COMPLEMENTO VARCHAR(30),
    ADICIONAL VARCHAR(1),
    VR_UNIT NUMERIC(15,2));

ALTER TABLE DB_MOB_REST_PROD_COMPLEMENTO
ADD CONSTRAINT PK_DB_MOB_REST_PROD_COMPLEMENTO
PRIMARY KEY (ITEN);

CREATE SEQUENCE DB_MOB_REST_PROD_COMPLEMENTO;


*/