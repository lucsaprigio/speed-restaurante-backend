import firebird from 'node-firebird';

/* 
const dirConfig = './src/Config.ini';

const config = fs.readFileSync(dirConfig, 'utf-8');
const dir = __dirname;

const parsedConfig = ini.parse(config); */

export var dbOptions = {
    host: 'localhost',
    port: 3050,
    database: 'c:\\gc\\gc.gdb',
    user: 'sysdba',
    password: 'masterkey',
};

async function executeTransaction(ssql: string, params: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
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
                            console.log(ssql);
                            return reject(err);
                        });
                    } else {
                        transaction.commit(() => {
                            db.detach();
                            console.log(ssql);
                            return resolve(result);
                        })
                    }
                })
            })
        })
    })
}

// Execução
async function executeQuery(query: string, params: any[]): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
        firebird.attachOrCreate(dbOptions, (err, db) => {
            if (err) {
                console.log(query)
                return reject(err)
            }

            db.query(query, params, (err, result: any[]) => {
                if (err) {
                    return reject(err)
                }
                console.log(query)
                return resolve(result)
            })
        })
    })
}

export { executeTransaction, executeQuery, firebird };