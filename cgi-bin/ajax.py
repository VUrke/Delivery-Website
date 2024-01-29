import cgi
from database import database
import json

db = database()

form = cgi.FieldStorage()

if "login" in form:
    print("Content-type: application/json\n")
    response = db.dajKorisnika(form['username'].value, form['password'].value)
    print(json.dumps(response))
    
if "registracija" in form:
    print("Content-type: application/json\n")
    response = db.registracijaKorisnika(form['podaci'].value)
    print(json.dumps(response))
    
if "daj_proizvode" in form:
    print("Content-type: application/json\n") 
    response = db.dajProizvode(form["kategorija"].value)
    print(json.dumps(response))

if "dodaj" in form:
    print("Content-type: application/json\n") 
    db.dodajUKorpu(form["email"].value,form["id"].value,form["kolicina"].value)
    
if "daj_proizvode_korpe" in form:
    print("Content-type: application/json\n") 
    response = db.dajProizvodeKorpe(form["email"].value)
    print(json.dumps(response))
    
if "izbaci" in form:
    print("Content-type: application/json\n") 
    db.izbaciIzKorpe(form["email"].value,form["id"].value)
    
if "daj_info" in form:
    print("Content-type: application/json\n") 
    response = db.dajInfo(form["email"].value)
    print(json.dumps(response))
    
if "dodaj_novac" in form:
    print("Content-type: application/json\n") 
    db.dodajNovacKorisniku(form["email"].value)

if "kupi_proizvode" in form:
    print("Content-type: application/json\n") 
    db.kupiProizvode(form["email"].value,form['trosak'].value)
    