import db from "./drizzle/db"

const getUsers = async () =>{
    return await db.query.UserTable.findMany();
}

async function main (){
    console.log (await getUsers())
}
main ();