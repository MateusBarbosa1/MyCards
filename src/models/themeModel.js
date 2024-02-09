const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTheme(req){
    const title = req.body.title;
    const created = await prisma.themes.create({
        data: {
            title: title.toLowerCase()
        }
    });
    return created;
}
async function getThemes(){
    const themes = await prisma.themes.findMany();
    return themes;
}
async function deleteTheme(name){
    const deleted = await prisma.themes.deleteMany({ where: { title: name } });
    await prisma.cards.deleteMany({ where: { theme: name } })
    return deleted;
}

module.exports = {
    createTheme,
    getThemes,
    deleteTheme
};