import "dotenv/config";

import {drizzle} from "drizzle-orm/node-postgres";
import {Client} from "pg";

import * as schema from "./schema"

export const client =new Client ({
    connectionString :process.env.Database_URL as string // get the database from the environment
})

const main = async ()=>{
    await client.connect(); // connect to dfatabase
}
main();

const db = drizzle(client,{schema,logger:true})  // create drizlle instance.

export default db;