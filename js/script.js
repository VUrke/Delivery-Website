
function login() {
    username = document.getElementById("username").value
    password = document.getElementById("password").value

    if (username == "" || password == "") {
        document.getElementById("greska").innerHTML = "Pogresni kredencijali"
    }
    else
    {
        var xhttps = new XMLHttpRequest()
        xhttps.onreadystatechange = function () 
        {
            if (this.readyState == 4 && this.status == 200)
            {
                response = JSON.parse(this.responseText);
                if(response)
                {
                    const date = new Date();
                    date.setTime(date.getTime() + 86400000);
                    // brisanje starih cookies-a
                    cookies_array = document.cookie.split(";");
                    for(i=0;i<cookies_array.length;i++)
                    {
                        document.cookie = cookies_array[i] + "=; expires="+ new Date(0).toUTCString();
                    }
                    document.cookie = `email=${response['email']}; expires=${date.toUTCString()};`;
                    document.cookie = `sesid=${response['sesid']}; expires=${date.toUTCString()};`;
                    document.cookie = `ime=${response['ime']}; expires=${date.toUTCString()};`;
                    document.cookie = `prezime=${response['prezime']}; expires=${date.toUTCString()};`;
                    document.cookie = `racun=${response['racun']}; expires=${date.toUTCString()};`;
                    window.location = 'http://localhost:8000/cgi-bin/prodavnica.py';
                }
                else
                {
                    document.getElementById("greska").innerHTML = "Ne postoji korisnik"
                }

            }
        }
    }
    xhttps.open("GET", `../cgi-bin/ajax.py?login=1&username=${username}&password=${password}`, true);
    xhttps.send()
}

function regexEmail(email)
{
    var flag = new RegExp(/^[A-Za-z0-9]{5,}\@[a-z]{2,5}\.[a-z]{1,3}$/);
	if(flag.test(email))
		return true;
	return false;
}

function regexPassword(password)
{
	var flag = new RegExp(/^[A-Za-z0-9]{3,15}$/);
	if(flag.test(password))
		return true;
	return false;
}

function registracija()
{
    email = document.getElementById("email").value
    ime = document.getElementById("ime").value
    prezime = document.getElementById("prezime").value
    fist_password = document.getElementById("password1").value
    second_password = document.getElementById("password2").value

    prosao_verifikaciju = true

    if(ime.length == 0 || prezime.length == 0){
        document.getElementById("greska-registracija").innerHTML += "Sva polja moraju biti popunjena."
        prosao_verifikaciju = false
    }
    
    if(!regexEmail(email)){
        document.getElementById("greska-registracija").innerHTML += "Neispravan email."
        prosao_verifikaciju = false
    }
    
    if(!regexPassword(fist_password)){
        document.getElementById("greska-registracija").innerHTML += "Neispravna sifra."
        prosao_verifikaciju = false
    }

    if(!regexPassword(fist_password)){
        document.getElementById("greska-registracija").innerHTML += "Neispravna sifra."
        prosao_verifikaciju = false
    }

    if(prosao_verifikaciju)
    {
        dictionary = {}
        dictionary['email'] = email
        dictionary['ime'] = ime
        dictionary['prezime'] = prezime
        dictionary['sifra'] = fist_password
        dictionary['racun'] = 0

        //pogodna za slanje podataka na server
        podaci_o_korisniku = JSON.stringify(dictionary)

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                response = JSON.parse(this.responseText);
                if(response['flag'] == "True")
                {
                    const date = new Date();
                    date.setTime(date.getTime() + 86000);
                    // Delete old cookie
                    cookies_array = document.cookie.split(";");
                    for(i=0;i<cookies_array.length;i++)
                    {
                        document.cookie = cookies_array[i] + "=; expires="+ new Date(0).toUTCString();
                    }


                    document.cookie = `sesid=${response['sesid']}; expires=${date.toUTCString()};`;
                    document.cookie = `email=${dictionary['email']}; expires=${date.toUTCString()};`;
                    document.cookie = `ime=${dictionary['ime']}; expires=${date.toUTCString()};`;
                    document.cookie = `prezime=${dictionary['prezime']}; expires=${date.toUTCString()};`;
                    document.cookie = `racun=${dictionary['racun']}; expires=${date.toUTCString()};`;
                    window.location = 'http://localhost:8000/cgi-bin/prodavnica.py';
                }
                else
                {
                    document.getElementById("greska-registracija").innerHTML = "Taj mejl je zauzet!"
                }
           
            }
        }
        xmlhttp.open("GET",`../cgi-bin/ajax.py?registracija=1&podaci=${podaci_o_korisniku}`,true);
        xmlhttp.send();

    }
}

function odjaviSe()
{
	document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
	document.cookie = "prezime=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
	document.cookie = "ime=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "racun=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.cookie = "sesid=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            window.location = 'http://localhost:8000/cgi-bin/prijava.py';
        }
    };
    xmlhttp.open("GET", `http://localhost:8000/cgi-bin/prodavnica.py`, true);
    xmlhttp.send();
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

function proveraPrijave(){
    if(!getCookie('sesid')){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                window.location = 'http://localhost:8000/cgi-bin/prijava.py';
            }
        };
        xmlhttp.open("GET", `http://localhost:8000/cgi-bin/prodavnica.py`, true);
        xmlhttp.send();
    }
}

function dajProizvode(kategorija) {
    proveraPrijave()

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            proizvodi = JSON.parse(this.responseText);
            prikaziProizvode(proizvodi,kategorija);
        }
    };
    xmlhttp.open("GET", `../cgi-bin/ajax.py?daj_proizvode=1&kategorija=${kategorija}`, true);
    xmlhttp.send();
}

function prikaziProizvode(proizvodi,kategorija)
{   
    container = document.getElementById('kategorija-'+kategorija);
    container.innerHTML="";
    if(proizvodi != null && proizvodi.length>0){
        proizvodi.forEach(function (proizvod) {
            container.innerHTML += `<div class="proizvod">
                                        <img src="../images/${proizvod['slika']}" alt="Proces">
                                        <div class="opis-proizvoda">
                                            <p>${proizvod['ime']}</p>
                                            <p>${proizvod['cena']}.00din</p>
                                            <input type="number" class="quantity" id="quantity-${proizvod['id']}" value="1" min="1" max="10">
                                            <button class="add-button" id="dodaj-dugme-${proizvod['id']}" onclick="dodajUKorpu('${proizvod['id']}')">Dodaj u korpu</button>
                                        </div>
                                    </div>`;
        });
    }
    else
        container.innerHTML="";
}

function dodajUKorpu(id) {
    
    email_value = getCookie("email")
    kolicina  = document.getElementById('quantity-'+id).value
    document.getElementById("dodaj-dugme-" + id).innerHTML = "Dodato";
    document.getElementById("dodaj-dugme-" + id).style.cursor = "not-allowed";
    document.getElementById("dodaj-dugme-" + id).disabled = true;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // dajProizvode(kategorija)
        }
    };
    xmlhttp.open("GET", `../cgi-bin/ajax.py?dodaj=1&id=${id}&email=${email_value}&kolicina=${kolicina}`, true);
    xmlhttp.send();
}

function idiNaKorpu(){
    window.location.href = 'korpa.py';
}

function otvoriInfo(){
    window.location.href = 'info.py';
}

function ucitajKorpu() {
    email_value = getCookie("email")

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            proizvodi_korpe = JSON.parse(this.responseText);
            prikaziProizvodeKorpe(proizvodi_korpe);
        }
    };
    xmlhttp.open("GET", `../cgi-bin/ajax.py?daj_proizvode_korpe=1&email=${email_value}`, true);
    xmlhttp.send();
}

function prikaziProizvodeKorpe(proizvodi)
{   
    container = document.getElementById('korpa-container');
    container.innerHTML="";
    if(proizvodi != null && proizvodi.length>0){
        ukupna_cena = 0

        container.innerHTML +=
        `
        <div class="proizvod-info">
            <p id='levi-razmak'>Naziv proizvoda</p>
            <p>Cena</p>
            <p id='desni-razmak'>Količina</p>
        </div>
        `

        proizvodi.forEach(function (proizvod) {
            ukupna_cena += proizvod['cena'] * proizvod['kolicina']
            container.innerHTML += `<div class="korpa-proizvod">
                                        <img src="../images/${proizvod['slika']}" alt="Proces">
                                        <p>${proizvod['ime']}</p>
                                        <p>${proizvod['cena']}.00din</p>
                                        <p>${proizvod['kolicina']}</p>
                                        <button class="korpa-button" id="korpa-dugme-${proizvod['id']}" onclick="izbaciIzKorpe('${proizvod['id']}')">Izbaci</button>
                                    </div>`;
        });
        container.innerHTML += "<h2 id='ukupna-cena'>Ukupna cena : "+ukupna_cena+".00din</h2>"
        container.innerHTML += `<button id='buy-button' onclick='kupi(${ukupna_cena})'>Kupi</button>`

    }
    else
    {
        container.innerHTML = "<h1 style='text-align:center'>KORPA JE PRAZNA</h1>";
    }
}

function kupi(ukupna_cena){
    email_value = getCookie("email")
    moj_novac = getCookie("racun")

    if(Number(moj_novac) > ukupna_cena)
    {

        nova_vrednost = Number(moj_novac) - ukupna_cena
        document.cookie = "racun=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

        date = new Date();
        date.setTime(date.getTime() + 86000);
        document.cookie = `racun=${nova_vrednost}; expires=${date.toUTCString()};`;

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                ucitajKorpu()
            }
        };
        xmlhttp.open("GET", `../cgi-bin/ajax.py?kupi_proizvode=1&email=${email_value}&trosak=${ukupna_cena}`, true);
        xmlhttp.send();
    }
    else
    {
        document.getElementById("buy-message").innerHTML = "NEDOVOLJNO NOVCA Za KUPOVINU"
    }

}

function izbaciIzKorpe(id) {
    
    email_value = getCookie("email")

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            ucitajKorpu()
        }
    };
    xmlhttp.open("GET", `../cgi-bin/ajax.py?izbaci=1&id=${id}&email=${email_value}`, true);
    xmlhttp.send();
}

function ucitajKupca() {
    email_value = getCookie("email")

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            document.getElementById("email").innerHTML = response['email']
            document.getElementById("ime").innerHTML = response['ime']
            document.getElementById("prezime").innerHTML = response['prezime']
            document.getElementById("racun").innerHTML = `${response['racun']}.00din`
        }
    };
    xmlhttp.open("GET", `../cgi-bin/ajax.py?daj_info=1&email=${email_value}`, true);
    xmlhttp.send();
}

function dodajNovac() {
    email_value = getCookie("email")
    trenutni_novac = getCookie("racun")
    nova_vrednost = Number(trenutni_novac) + 1000

    document.cookie = "racun=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    date = new Date();
    date.setTime(date.getTime() + 86000);
    document.cookie = `racun=${nova_vrednost}; expires=${date.toUTCString()};`;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            ucitajKupca()
        }
    };
    xmlhttp.open("GET", `../cgi-bin/ajax.py?dodaj_novac=1&&email=${email_value}`, true);
    xmlhttp.send();
}