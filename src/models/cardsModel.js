const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getCards(name){
    const cards = await prisma.cards.findMany({ where: { theme: name } });
    return cards;
}
async function createCards(req){
    const cards_created = await prisma.cards.create({
        data: {
            theme: req.params.name.toLowerCase(),
            title: req.body.title,
            details: req.body.details
        }
    });
    return cards_created;
}
async function deleteCard(name, name_card){
    const deleted = await prisma.cards.deleteMany({ where: { theme: name, title: name_card } })
    return deleted;
}

module.exports = {
    getCards,
    createCards,
    deleteCard
};