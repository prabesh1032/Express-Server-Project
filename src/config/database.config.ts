import mongoose from "mongoose"

export const connectDatabase = (DB_URL:string)=>{
mongoose.connect(DB_URL, {
    dbName: "project",
}).then(() => {
    console.log("database connected");
}).catch((error) => {
    console.log("-------database connection error------");
    console.log(error);
});
}