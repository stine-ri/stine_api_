import "dotenv/config";

import { migrate } from "drizzle-orm/node-postgres/migrator";

import db, {client} from "./db"

async function migration(){
    console.log("=====Migrations started=====")
   await migrate(db,{migrationsFolder : __dirname + "/migrations"})
   await client.end()
   console.log("=====Migrations ended=====")
   process.exit(0)
   
}
migration ().catch((err)=>{
    console.log(err)
    process.exit(0)
})