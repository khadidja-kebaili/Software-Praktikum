# Installationsanleitung

## Der Client 
besteht aus einem React-Frontend. Dieser wurde durch die create-react-app gebootstrapt.
Der bearbeitete Quellcode des Frontends liegt in /Frontend.
Benötigte Installationen:
- [Node.js](https://nodejs.org/ )      
- Packages die durch den npm install installiert werden:
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [Material-UI](https://material-ui.com)
- [Google firebase authentication](https://firebase.google.com/docs/web/setup)
 

### Starten des Development Server
Der Development Server wird durch einen Terminal Befehl gestartet. Der Befehl lautet: 'npm start'. Nach dem erfolgreichen Start ist die React-App unter dem http://localhost:3000 verfügbar.

### Das Deployment auf dem flask-Server
Wenn die App auf einen Server veröffentlicht/deployed wird im Terminal mit dem Kommando 'npm run' build eine Produktionsreife und performanzoptimierte App im Verzeichnis '/frontend/build erstellt'. Außerdem muss der der Inhalt des Ordners '/frontend build/' in den '/src/static/reactclient' rein kopiert werden. Diese Verzeichnisse sind beide in der Datei '.gitignore' enthalten. 

### Backend/Server
Der Python Server auf Python, 'Flask', 'RestX' auf.
Was wird vorab benötigt?
-        'Aktuelle Python-Installation'
-        'Flask'
-        'flask-restx'
-        'flask-cors'
-        'google-auth'
-        'requests'
Die Einfachste Lösung wäre, wenn man Pycharm installiert, ein Virtual Environment anlegt und mit dem 'pip install' Befehl die Packages, 'flask', 'flask-restx' und 'flask-cors' installiert.
 
### Server starten
Wenn das Environment mit allen Packages installiert wurde, kann der Server über die Datei 'main.py' gestartet werden. In PyCharm reicht schon ein Rechtsklick auf die Datei und die Auswahl von 'Run main'.

### Das Deployment auf Google Cloud
Zunächst muss das Programm 'gcloud' installiert werden. Dieses Programm ist Bestandteil des Google Cloud Software Development Kit. Als erstes muss eine Datenbank in der Cloud angelegt und befüllt werden.

#### Zusammenfassung:
Die Dateien 'app.yaml', 'requirements.text' und '.gcloudignore' müssen selbst erstellt werden. Sie sind erforderlich, um die App deployen zu können.
Die Dateien, die nicht in die Cloud transportiert werden sollen, gibt man mit '.gcloudignore' an.
In der Datei requirements.text werden alle Packages angegeben, die man in der Cloud neben unserem Code noch benötigt, um die App ordnungsgemäß starten zu können. In unserem Fall haben wir die Packages 'Flask', 'Flask.RestX', 'Clask-Cors' in diese Datei gepackt. Durch die 'requirements.text' wird also nur angegeben, welche Packages installiert werden muss, weil wir die Packages nicht selbst in die Cloud hochladen.
Mit dem 'app.yaml' kann man zahlreiche Eigenschaften der App konfigurieren.
Hier kann man sich noch genauer mit diesem Thema befassen:
https://cloud.google.com/appengine/docs/standard/python/config/
