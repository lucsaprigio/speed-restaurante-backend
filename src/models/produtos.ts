interface DB_MOB_REST_PROD {
    CD_PRODUTO: number;
    DESCRICAO_PRODUTO: string;
    SUBDESCRICAO_PRODUTO: string;
    VR_UNITARIO: number;
    CD_CATEGORIA: number;
}

/* 
CREATE TABLE DB_MOB_REST_PROD (
    CD_PRODUTO INTEGER NOT NULL,
    DESCRICAO_PRODUTO VARCHAR(50),
    SUBDESCRICAO_PRODUTO VARCHAR(50),
    VR_UNITARIO NUMERIC(15,2),
    CD_CATEGORIA INTEGER);

ALTER TABLE DB_MOB_REST_PROD
ADD CONSTRAINT PK_DB_MOB_REST_PROD
PRIMARY KEY (CD_PRODUTO);

CREATE SEQUENCE DB_MOB_REST_PROD;
*/