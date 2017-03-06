export default class Message {

    constructor(id, message, senderName) {
        this.id = id;
        this.message = message;
        this.senderName = senderName || undefined;
    }
}
