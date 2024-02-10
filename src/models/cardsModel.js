const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getCards(name){
    const cards = await prisma.cards.findMany({ where: { theme: name } });
    return cards;
}
async function createCards(req) {
    const date = new Date();
    // Ajuste para adicionar 1 ao mês, pois o mês começa em 0
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    const cards_created = await prisma.cards.create({
        data: {
            theme: req.params.name.toLowerCase(),
            title: req.body.title,
            // Formatando a data no formato "YYYY-MM-DD"
            createdAt: `${year}-${month}-${day}`,
            details: req.body.details
        }
    });
    return cards_created;
}
async function deleteCard(name, name_card){
    const deleted = await prisma.cards.deleteMany({ where: { theme: name, title: name_card } })
    return deleted;
}
async function updateCard(req, name, index) {
    const cards = await getCards(name);
    for (let i = 0; i < cards.length; i++) {
        if (i === index) {
            const updated = await prisma.cards.updateMany({
                where: { theme: name, id_cards: cards[i].id_cards },
                data: {
                    title: req.body.title,
                    details: req.body.details
                }
            });
            return updated;
        }
    }
}


module.exports = {
    getCards,
    createCards,
    deleteCard,
    updateCard
};