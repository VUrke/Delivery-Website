import sqlite3
import random
import json
import hashlib

class database():
    def __init__(self):
        self.dbh = sqlite3.connect('biblioteka.db')
        
    def dajInfo(self,email):
        
        response = dict()
        sql = "SELECT * FROM korisnici where email='{}'".format(email)
        
        cursor = self.dbh.cursor()               #kursor za izvrsavanje upita
        cursor.execute(sql)                      #izvrsava se sam upit
        
        result = cursor.fetchone()         #vraca tuple,zato mora preko indexa
        cursor.close()
        if result:
            response = {
                'email': email,
                'sesid': result[0],
                'ime': result[3],
                'prezime': result[4],
                'racun': result[5]
            }
            return response
        return False

    def dajKorisnika(self,email,password):
        enc_password = hashlib.sha1(password.encode('utf-8')).hexdigest() #mora da se enkodira zato sto sha1 prima samo ulaz kao niz bajtova.hexdigest() iz niz bajtova u string
        
        randNumber = random.randint(10**13, 10**14 - 1)
        sql_update = "UPDATE korisnici SET sesid = '{}' WHERE email='{}' AND sifra = '{}'".format(randNumber, email, enc_password)
        
        first_cursor = self.dbh.cursor()
        first_cursor.execute(sql_update)
        self.dbh.commit()
        first_cursor.close()           
        
        response = dict()
        sql = "SELECT * FROM korisnici where email='{}' and sifra='{}'".format(email,enc_password)
        
        cursor = self.dbh.cursor()               #kursor za izvrsavanje upita
        cursor.execute(sql)                      #izvrsava se sam upit
        
        result = cursor.fetchone()         #vraca tuple,zato mora preko indexa
        cursor.close()
        if result:
            response = {
                'email': email,
                'sesid': result[0],
                'ime': result[3],
                'prezime': result[4],
                'racun': result[5]
            }
            return response
        return False
    
    def registracijaKorisnika(self,podaci):
        podaciKorisnika = json.loads(podaci)
        
        enc_password = hashlib.sha1(podaciKorisnika['sifra'].encode('utf-8')).hexdigest() #mora da se enkodira zato sto sha1 prima samo ulaz kao niz bajtova.hexdigest() iz niz bajtova u string
        randNumber = random.randint(10**13, 10**14 - 1)
        
        povratna_infromacija = dict()
        povratna_infromacija['flag'] = "False" 
        
        if(self.postojiMejl(podaciKorisnika['email']) is False):
            sql = "INSERT into korisnici(sesid,email,sifra,ime,prezime,racun) VALUES ('{}','{}','{}','{}','{}','{}')".format(randNumber,podaciKorisnika['email'],enc_password,podaciKorisnika['ime'],podaciKorisnika['prezime'],0)
            cursor = self.dbh.cursor()
            cursor.execute(sql)
            self.dbh.commit()
            cursor.close()
            
            povratna_infromacija['sesid'] = randNumber
            povratna_infromacija['flag'] = "True" 
            
            return povratna_infromacija
    
    def postojiMejl(self, email):
        sql = "SELECT * FROM korisnici WHERE email = ?"
        cursor = self.dbh.cursor()

        cursor.execute(sql, (email,))
        result = cursor.fetchone()

        if result:
            return True
       
        cursor.close()

        return False
        
    def dajProizvode(self,kategorija):
        sql = "select * from proizvodi where kategorija = '{}'".format(kategorija)
        
        cursor = self.dbh.cursor()
        
        cursor.execute(sql)
        self.dbh.commit()
        podaci = cursor.fetchall()
        
        cursor.close()
        response = []
        for podatak in podaci:
            proizvod=self.dajProizvod(podatak[0])
            response.append(proizvod)
        return response
    
    def dajProizvod(self, id):
        sql = "select * from proizvodi where id='{}'".format(id)
        
        cursor = self.dbh.cursor()
        
        cursor.execute(sql)
        self.dbh.commit()
        proizvod = cursor.fetchone()
        
        cursor.close()
        
        response = {
            'id': proizvod[0],
            'kategorija': proizvod[1],
            'ime': proizvod[2],
            'slika': proizvod[3],
            'cena' : proizvod[4]
        }
        return response
    
    def dodajUKorpu(self, email,id_proizvoda,kolicina):
        
        sql="select * from korpa where email='{}' and id='{}'".format(email,id_proizvoda)
        cursor=self.dbh.cursor()
        cursor.execute(sql)
        result=cursor.fetchone()
        
        cursor.close()
        
        if result:
            sql = "UPDATE korpa set kolicina=kolicina+'{}' where  email='{}' and id='{}'".format(kolicina,email,id_proizvoda)
            cursor2 = self.dbh.cursor()
            cursor2.execute(sql)
            self.dbh.commit()
            cursor2.close()
        else:
            sql = "INSERT into korpa(email,id,kolicina) VALUES ('{}','{}','{}')".format(email,id_proizvoda,kolicina)
            cursor1 = self.dbh.cursor()
            cursor1.execute(sql)
            self.dbh.commit()
            cursor1.close()
            
            
    def dajProizvodeKorpe(self,email):
        sql = "select * from korpa where email = '{}'".format(email)
        
        cursor = self.dbh.cursor()
        
        cursor.execute(sql)
        self.dbh.commit()
        podaci = cursor.fetchall()
        
        cursor.close()
        response = []
        for podatak in podaci:
            proizvod=self.dajProizvod(podatak[1])
            proizvod['kolicina'] = podatak[2]
            response.append(proizvod)
        return response
    
    def izbaciIzKorpe(self, email,id_proizvoda):
        
        sql="delete from korpa where email='{}' and id='{}'".format(email,id_proizvoda)
        cursor=self.dbh.cursor()
        cursor.execute(sql)
        self.dbh.commit()
        
        cursor.close()
        
    def dodajNovacKorisniku(self, email):
        sql = "UPDATE korisnici SET racun = racun + 1000 WHERE email = '{}'".format(email)
        cursor = self.dbh.cursor()
        cursor.execute(sql)
        self.dbh.commit()
        cursor.close()

    def kupiProizvode(self, email,potroseno_novca):
        sql = "UPDATE korisnici SET racun = racun - {} WHERE email = '{}'".format(potroseno_novca,email)
        cursor = self.dbh.cursor()
        cursor.execute(sql)
        self.dbh.commit()
        cursor.close()
        
        sql1 = "DELETE from korpa where email='{}'".format(email)
        second_cursor = self.dbh.cursor()
        second_cursor.execute(sql1)
        self.dbh.commit()
        second_cursor.close()
        
    