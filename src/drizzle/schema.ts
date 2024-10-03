import { pgTable,serial,text,varchar,integer}from "drizzle-orm/pg-core";
//userTable
export const UserTable = pgTable("users",{
    id: serial("id").primaryKey(),
    fullname:text("full_name"),
    phone:varchar("phone", {length:100}),
    address:varchar("address", {length:100 }),
    score: integer("score")
})
//profileTable
export const ProfileTable = pgTable("profiles",{
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => UserTable.id,{onDelete: "cascade"}),
    bio: text("bio"),
    image: varchar("image", {length:1000}),
    skills: text("skills")
})