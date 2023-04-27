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
Jag har kämpat med att posta formulärdata från react (register.jsx) till node, efter mycket error och access denied har jag installerat cors (middleware) som jag använder både i server.js och i register.jsx. Nu går det att lägga till användare men jag får problem med min redirect till login.jsx.
## Datum: 23-04-20
Redirect har inte fungerat efter att jag har registrerat användare så jag har börjat bygga om min backend från grunden för att min backend ska bli mer logisk. Redirect ska jag istället bara köra i react då det inte ska bli problem som nu när jag har redirectat i min backend. I min nya backend använder jag mig av statuskoder som jag inte gjort innan.
## Datum: 23-04-21
Jag har följt en tutorial på youtube (netninja mern stack tutorial) som har gett mig mycket mer förståelse för hur allt kommunicerar. Jag har skapat en global context för posts och provat att göra requests via postman som har fungerat. för tillfället fungerar det inte att att skapa användare och min redirect fungerar fortfarande inte (från register till login).
## Datum: 23-04-24
Jag har fått ordning på både registrering och redirect. Jag använder mig av useNavigate för att göra en redirect till login. Jag löste registreringen då jag upptäckte att det saknades email i routes/users.js så jag fick felmeddelandet att email är required. Hashning av lösenord har jag också fått till. Jag har börjat koda frontenden för min navigation och header som man har tillgång till som inloggad (det finns ingen autentisering för tillfället).
## Datum: 23-04-25
Jag har börjat kolla på jwt (jsonwebtoken) och hur det fungerar i en mern stack app. Har försökt prova det i mitt projekt men oavsett vart jag lägger min JWT_SECRET så får jag att den är undefined. Har försökt ha den i min .env fil och hårdkodad i dom filer där den behövs men det fungerar inte.
## Datum: 23-04-26
Jag har fått jwt att fungera och det går bara att nå api/protected om man har fått en token när man loggar in. Jag försöker få med user id när man skapar en post men det fungerar inte just nu, jag får "jwt must be provided". Jag har lagt till en function ensureAuth i min post route för att man inte ska kunna komma åt det som icke inloggad, tyvärr fungerar det inte då redirect från backend bara blir 404 i min frontend. Jag har också försökt få till profilbildsuppladdning som även det bara krånglar.
## Datum: 23-04-27
Jag har följt netninjas tutorial för att få till jwt, authentication och redirect. Jag har skapat en authContext som kontrollerar om man är inloggad (det syns i localstorage om man är inloggad). Jag har skapat hooks för signup, login och logut som fungerar nästan som dom ska. Om man laddar om sidan så ska man fortsätta vara inloggad men react redirectar till login. Jag har haft svårt att greppa hur redirect fungerar mellan frontend och backend men det börjar falla på plats nu. När jag försöker skapa en ny post så får jag invalid token för tillfället.