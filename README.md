# Examensprojekt
## Starta upp projektet
### Steg 1
Klona ner repot
### Steg 2
Konfigurera en .env fil på rotnivå i backend mappen.
Det finns en .env-example med instruktioner
### Steg 3
* Öppna en terminal (för backend)
* kör: cd backend (för att ta dig till rätt mapp för att sedan köra kommandot i terminalen)
* kör: npm i (för att installera alla dependencies som krävs)
* kör: npm run dev
### Steg 4
* Öppna en terminal (för frontend)
* kör: cd frontend (för att ta dig till rätt mapp för att sedan köra kommandot i terminalen)
* kör: npm i (för att installera alla dependencies som krävs)
* kör: npm start
## Översiktlig beskrivning
Jag tänkte skapa ett socialt nätverk likt instagram med nodejs/express som backend och react som frontend. Tanken är att man ska kunna registrera användare, logga in, skapa inlägg med bilder och bildtext.
## Tekniker och programspråk
* Html
* Css
* Javascript
* Nodejs
* Express
* MongoDB
* Mongoose
* React
## Kravspecifikation
### Design
* Mobile first
* Lofi i Figma
* Hifi i Figma
* Logga
* Färger
* Responsiv
### Kod
* Registrera användare
* Inloggning/Session
* Hashning av lösenord
* Inloggad användare ska kunna se sina egna poster på en profilsida
* Inloggad användare ska kunna få notiser om någon gillar/kommenterar på en post
* Inloggad användare ska kunna lägga till/editera/ta bort poster
* Inloggad användare ska kunna gilla andras poster
* Inloggad användare ska kunna kommentera på poster
* Applikationen ska vara hostad

### Kod extra
* Inloggad användare ska kunna gilla kommentarer på poster
* Editera kontouppgifter/radera konto samt alla poster användaren skapat
* Hashtags för att användare ska kunna söka efter poster
* Funktionalitet för att följa användare och se deras poster i flödet
* Funktionalitet för att använda filter på sina bilder
* Funktionalitet för att återställa glömt lösenord
* Chatt funktionalitet

