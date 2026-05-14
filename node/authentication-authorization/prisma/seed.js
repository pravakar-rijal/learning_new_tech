import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

async function main(){
    await prisma.role.createMany({
        data:[
            {name: "member"},
            {name: "admin"}
        ]
    })
}

main().then(()=>{
    console.log("Seed Complete");
}).catch((error)=>{
    console.log("Seed Failed" + error.message);
    process.exit(1);
}).finally(async ()=>{
    await prisma.$disconnect();
});
