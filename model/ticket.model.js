class Ticket
{
    constructor(id, visitorId, type, price, purchaseDate, validUntil)
    {
        this.id = id;
        this.visitorId = visitorId;
        this.type = type;
        this.price = price;
        this.purchaseDate = purchaseDate;
        this.validUntil = validUntil;

    }

}

 const ticketList = []

module.exports = { Ticket, ticketList };