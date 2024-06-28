export type ICategoriesRepository = {
    CD_CATEGORIA: string;
    DESCRICAO_CATEGORIA: string;
}

export type CategoriesRepository = {
    list: () => Promise<ICategoriesRepository[] | null>;
}

/* 
CREATE TABLE DB_MOB_CATEGORIA (
    CD_CATEGORIA INTEGER NOT NULL,
    DESCRICAO_CATEGORIA VARCHAR(40));

ALTER TABLE DB_MOB_CATEGORIA
ADD CONSTRAINT PK_DB_MOB_CATEGORIA
PRIMARY KEY (CD_CATEGORIA);
*/