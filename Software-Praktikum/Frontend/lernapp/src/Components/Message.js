function Message (senderID, MyMessage, text, room){
    this.senderID = senderID;
    //Prüfen ob es eine Nachricht vom aktuellen User ist
    MyMessage = senderID == user.getID;
    this.text = text;
    this.room = room;
}

//Textfeld zum senden von Daten ruft diese Funktion auf, Message wird in einen Array von dem Chatroom gepusht um später die chronologische Reihenfolge zu erhalten
//Texte würden nicht in Echtzeit erscheinen...
//in SQL Datenbank ist jede Nachricht in einer Datenbank: ID, Raum, Index vom RaumArray, SenderID, Text