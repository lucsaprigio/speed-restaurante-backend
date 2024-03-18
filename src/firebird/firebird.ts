import firebird from 'node-firebird';

import ini from 'ini';
import fs from 'fs';

/* 
const dirConfig = './src/Config.ini';

const config = fs.readFileSync(dirConfig, 'utf-8');
const dir = __dirname;

const parsedConfig = ini.parse(config); */

export var dbOptions = {
    host: '192.168.0.61',
    port: 3050,
    database: '/database/dadosgc/mobile/teste.fdb',
    user: 'sysdba',
    password: 'masterkey',
};

async function executeTransaction(ssql: string, params: any) {
    return new Promise((resolve, reject) => {
        firebird.attach(dbOptions, (err, db) => {
            if (err) {
                console.log(err);
                return reject(err);
            }

            db.transaction(firebird.ISOLATION_READ_COMMITTED, async (err, transaction) => {
                if (err) {
                    db.detach();
                    return reject(err);
                }

                transaction.query(ssql, params, (err, result) => {
                    if (err) {
                        transaction.rollback(() => {
                            db.detach();
                            return reject(err);
                        });
                    } else {
                        transaction.commit(() => {
                            db.detach();
                            return resolve(result);
                        })
                    }
                })
            })
        })
    })
}

async function executeQuery(query: string, params: any[]): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
        firebird.attachOrCreate(dbOptions, (err, db) => {
            if (err) {
                return reject(err)
            }

            db.query(query, params, (err, result: any[]) => {
                if (err) {
                    return reject(err)
                }
                return resolve(result)
            })
        })
    })
}

export { executeTransaction, executeQuery, firebird };