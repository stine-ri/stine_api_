import { pgTable,serial,text,varchar,integer,primaryKey}from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm"

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

//relation between users and profiles which is one to one
 export const usersRelations = relations(UserTable,({one, many})=>({
    profile: one(ProfileTable, {
        fields: [UserTable.id],
        references: [ProfileTable.userId]
     }),
     posts: many(PostTable)  //one user can do many posts.
 }))
 //post table
 export const PostTable = pgTable("posts",{
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => UserTable.id,{onDelete: "cascade"}),
    title: varchar("title", {length:100}),
    content: text("content")
})

//relation between users and posts which is one to one
 export const usersPostsRelation = relations(PostTable,({one, many})=>({
    user: one(UserTable, {
        fields: [PostTable.userId],
        references: [UserTable.id]
     }),
     PostsOnCategories: many(PostsOnCategoriesTable)
 }))
 //category table
 export const CategoryTable = pgTable("categories",{
    id: serial("id").primaryKey(),
    name: varchar("name", {length:100})
});
//join table for posts and categories

export const PostsOnCategoriesTable =pgTable("posts_on_categories",{
    postId: integer("post_id").notNull().references(() => PostTable.id,{onDelete: "cascade"}),
    categoryId: integer("category_id").notNull().references(() => CategoryTable.id,{onDelete: "cascade"})
}, (table)=>{
    return {
        compositeKey: primaryKey(table.postId, table.categoryId)// composite key ..for joinig two primary keys.
    }
})

//category table relation post to post on category table many to many
 export const categoryRelations = relations(CategoryTable, ({many})=>({
    postsCategories:many(PostsOnCategoriesTable)
 }))
//PostOnCategories table relation postonCategories one to one Post&PostOnCategories one to one categories
 export const postsOnCategoriesRelations = relations(PostsOnCategoriesTable, ({one})=>({
    post: one(PostTable,{
        fields:[PostsOnCategoriesTable.postId],
        references: [PostTable.id]
    }),
   category:one(CategoryTable,{
    fields:[PostsOnCategoriesTable.categoryId],
    references: [CategoryTable.id]
   })
 }))
 

export type TIUser = typeof  UserTable.$inferInsert;
export type TSUser = typeof  UserTable.$inferSelect;
export type TIProfile = typeof  ProfileTable.$inferInsert;
export type TSProfile = typeof  ProfileTable.$inferSelect;
export type TIPost = typeof  PostTable.$inferInsert;
export type TSPost = typeof  PostTable.$inferSelect;