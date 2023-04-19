# Loggbok Examensprojekt
## Datum: 23-03-31
Enkel lofi i Figma (4 vyer för mobil) klar. Påbörjad Hifi för mobil (några komponenter, login, register och feed), färgtema någorlunda klart och namn är valt (Postr).
## Datum: 23-04-01
Hifi för mobil i princip färdig (13 vyer totalt).
## Datum: 23-04-13
Hifi för både mobil och desktop färdig. Figma: https://www.figma.com/file/2bFwNkc9SmbCAKPR8zetj3/Examensprojekt?node-id=0%3A1&t=zI7Cqtcc3oZGmcbd-1.
Mappstruktur och enkel början för både frontend (react) och backend (node och express).
## Datum: 23-04-17
Kommunikation mellan react och node verkar fungera. Jag har skapat två komponenter (Login och Register) som är stylade. I bägge komponenterna finns det en länk för att ta sig till den andra.
## Datum: 23-04-18
Jag har skapat en databas på mongodb som heter postr med ett table(user). Jag har skapat en .env fil i mitt projekt och gjort en koppling till databasen i UserModel.js.
## Datum: 23-04-19
Jag har kämpat med att posta formulärdata från react(register.jsx) till node, efter mycket error och access denied har jag installerat cors (middleware) som jag använder både i server.js och i register.jsx. Nu går det att lägga till användare men jag får problem med min redirect till login.jsx.
