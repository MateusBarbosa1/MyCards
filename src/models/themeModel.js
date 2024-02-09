const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTheme(req){
    const created = await prisma.themes.create({
        data: {
            title: req.body.title
        }
    });
    return created;
}

module.exports = {createTheme};