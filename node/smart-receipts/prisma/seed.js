const { PrismaClient } = require("../generated/prisma/index.js");
const prisma = new PrismaClient();

async function main(){
    await prisma.role.createMany({
        data:[
            {
                id: "699f6835-8dd6-4292-9dad-a54a406f0316",
                name: "member"},
            {
                id: "3c07b74f-e293-458d-9af5-44075229e803",
                name: "admin"}
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
