function Message (senderID, text, room){
    this.senderID = senderID;
    //Prüfen ob es eine Nachricht vom aktuellen User ist
    this.myMessage = get_messageID == user.getID;
    this.text = text;
    this.room = room;
}

//message muss entsprechend von MyMessage gerendert werden