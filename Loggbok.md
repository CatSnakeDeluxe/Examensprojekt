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
## Datum: 23-05-08
Tillslut fungerar min authentication efter att ha bytt ut en rad i authcontext. Jag har ännu en gång försökt få upp det på Linode men har inte fått till det än. Jag har fått till så jag kan hämta posts för den inloggade användaren på userPage, jag har också skapat en ny komponent (PostPreview) för att visa endast bilden. Tanken är att man får upp all info, samt edit och delete knapp när man klickar på en bild.
## Datum: 23-05-09
Efter många försök att få min userPage att använda sig av PostPreview komponenten har jag bytt till att bara använda mig av Post komponenten. Det kraschade när man försökte gå i mellan och det blev även problem med id, då de bara är för utseendets skull så väntar jag med att få till det. Jag har fått till så det kommer upp knappar vid varje post på userPage, en för edit och en för delete. Jag har fått delete funktionen att fungera som den ska. Johannes har hjälpt mig med Linode och jag borde inte vara långt bort nu. i pm2 logs får jag - Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.
2|frontend |  - options.allowedHosts[0] should be a non-empty string. och i webbläsaren får jag - 502 Bad Gateway.
## Datum: 23-05-10
Jag har fått till det på Linode tillslut - problemet var att jag använde mig av en proxy i package.json i min frontend mapp. Jag bytte ut den mot en fil som heter url.js där jag bestämmer vilken url som requests ska göras till.
## Datum: 23-05-11
Jag har skapat en EditForm komponent som hämtar information om en post och visar det i formuläret.
## Datum: 23-05-15
Jag har kämpat vidare med min editfunktion som inte alls vill fungera, jag tror att det kanske kan vara context som krånglar då jag är osäker på hur koden ska se ut där för just EDIT_POST.
## Datum: 23-05-16
Jag har hittat ett fel i min editfunktion, formdata uppdateras inte i min handlesubmit.
## Datum: 23-05-17
Jag hade glömt upload single file i min post route och så var det fel i postcontext men nu fungerar editfunktionen ish. Man kan ändra description och hashtags men inte byta bild. Det var ett fel i controllern där file skulle vara filename, nu fungerar editfunktionen som den ska. Jag har fått till komprimering av bilder med hjälp av multer sharp men filnamnet blir inte unikt längre.
## Datum: 23-05-18
Jag har jobbat på min likes funktion och kan nu med en inloggad användare ge en post oändligt med likes.
## Datum: 23-05-19
Jag har jobbat vidare med likes, det blev problem när varje like sparades som ett object i databasen men nu sparas endast användarens id som en sträng. En användare kan endast gilla en gång, klickar man igen så avgillar man posten. Likes fungerar som jag har tänkt men komponenten uppdateras inte så man måste ladda om sidan för att se förändringarna.
## Datum: 23-05-20
Jag har tagit en liten paus från likes och har istället fått till så post/likes visas dynamiskt på userPage. Jag har kämpat med att få till en SelectedUser komponent men det blir att den komponenten visar både den valda användaren och den inloggade och jag vet inte varför. Jag har fått ordning på likes genom att mellanlanda i en funktion i Post.jsx som uppdaterar state.
## Datum: 23-05-21
Jag försöker få till notifications har fått alla error man kan få känns det som. Jag använder mig av socket io och har haft mycket problem med cors, 404 och liknande. 
## Datum: 23-05-22
Efter att ha försökt i 6 timmar idag att få till socket io så har jag gjort så notifications har ett eget schema istället och när man går in på notifications så görs en gammal hederlig fetch. Jag ville gärna ha en socketlösning men det finns för mycket annat att lösa innan redovisningen så det prioriteras bort för tillfället.
## Datum: 23-05-23
Jag har fått till en fungerande search funktion som visar posts med matchande hashtag som sökningen. Jag har fått till så man får en preview av bilden vid skapande och editerande av post. Det krånglade mycket vid edit då det inte är en blob utan endast ett filnamn som finns i formuläret när man först klickar på edit. Jag har upptäckt att om man inte byter bild när man editerar en post så kraschar servern på grund av att filnamnet är undefined.
## Datum: 23-05-24
Jag har fått till så filnamnen blir unika med uuid genom att göra det i frontenden innan det skickas till min backend genom formdata. Jag har försökt få ordning på min edit hur länge som helst och får snart en psykos. Hur jag än gör så måste jag byta bild för att annars blir den undefined. provade att ta bort file helt från update funktionen i controllern och skickade aldrig med den i frontenden men då blev description och hashtags undefined. Efter mycket om och men är den nu fungerande igen förutom att man måste nyta bild.Jag provade att logga in på servern men får bara failed to fetch och connection refused. *panik*
## Datum: 23-05-25
Jag såg i terminalen att det behövdes en reboot av servern, sen såg jag också att det saknades sharp-multer i backenden så jag installerade det. Jag startade upp allt med pm2 igen och nu verkar det fungera.
