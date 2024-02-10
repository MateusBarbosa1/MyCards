const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getCards(name){
    const cards = await prisma.cards.findMany({ where: { theme: name } });
    return cards;
}
async function createCards(req){
    const date = new Date();
    const cards_created = await prisma.cards.create({
        data: {
            theme: req.params.name.toLowerCase(),
            title: req.body.title,
            createdAt: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
            details: req.body.details
        }
    });
    return cards_created;
}
async function deleteCard(name, name_card){
    const deleted = await prisma.cards.deleteMany({ where: { theme: name, title: name_card } })
    return deleted;
}
async function updateCard(req, name, index){
    var cards = getCards(name);
    for(let i = 0;i < (await cards).length;i++) {
        if(i == index) {
            cards.then(async (value)=>{
                const updated = await prisma.cards.updateMany({
                    where: { theme: name, id_cards: value[i].id_cards},
                    data: {
                        title: req.body.title,
                        details: req.body.details
                    }
                });
                return updated;

            });
        }
    }
}

module.exports = {
    getCards,
    createCards,
    deleteCard,
    updateCard
};