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
## Datum: 23-04-28
Jag har försökt få ordning på file upload vid registrering men trots många försök så får jag bara fileName: null i databasen. Efter att ha ändrat om en hel del i koden så kraschar det när man försöker lägga till en användare. Felet verkar vara min const { fileName } = req.file. När jag har googlat så står det att man ska använda sig av req.file mend det fungerar inte alls för mig, kör jag med req.body kraschar det inte men jag får istället undefined. 
## Datum: 23-05-02
Filuppladdningen fungerar, problemet var att jag gjorde om det till json när det inte behövdes. Uppladdning av bild fungerar både vid registrering och när man skapar en post. Jag har börjat styla post och userPage. Jag har också problemet att jag "loggas ut" när jag laddar om sidan, jag lägger till hela user i localstorage som finns kvar när jag laddar om sidan men react redirectar till ändå till login. Jag får ut profilbild och username på userPage om man klickar sig till profilen i navbaren, alltså endast sin egna profil.
## Datum: 23-05-03
Jag har löst problemet så sidan inte redirectar till login när man laddar om sidan. I app.js kollar jag om det finns en användare i localstorage istället för att använda mig av useAuthContext. Jag har hittat en funktion som löser mitt problem med hur länge sedan något var postat, det är en funktion som tar in en timestamp och avgör hur lång tid det är från den timestampen. Jag försöker hämta användaruppgifter i Post.jsx för att visa användarnamn och profilbild för vem som har postat. Min funktion userController.getSingleUser fungerar så något är fel i min fetch i Post.jsx. Jag har fått ordning på Post.jsx, jag behövde använda mig av useEffect och useState.
## Datum: 23-05-04
Jag har försökt få upp mitt examensprojekt på Linode men det har inte fungerat alls trots att jag följt olika tutorials. Jag har också provat att få upp det på render.com men även där går det inte bra även om det går bättre än på Linode. På render fick jag igång både backend och frontend men det blir error när jag försöker logga in som verkar vara relaterat till json i min useLogin.js.
## Datum: 23-05-05
Jag har försökt få ordning på authentication (i App.js), med Martins sätt (const user = localStorage.getItem('user')) så fungerar inte min login och på mitt sätt (const { user } = useAuthContext()) kan man inte ladda om sidan utan att visas som utloggad trots att hela användaren ligger kvar i localstorage. Jag har följt Martins tutorial för att få upp det på Linode men jag kan inte göra en request med postman. Error: connect ECONNREFUSED 139.144.176.62:80