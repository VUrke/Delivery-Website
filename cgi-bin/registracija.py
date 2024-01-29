from os import environ
from http.cookies import SimpleCookie
print("Content-type:text/html\n\n")
print(
    '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/style/registracija.css">
    <script src="/js/script.js"></script>
    <title>Registracija</title>
</head>
<body>
    <div class="container">
        <h2>Registracija</h2>
        <form id="registrationForm">
            <label for="email">E-mail adresa:</label>
            <input type="email" id="email" name="email" required>

            <label for="ime">Ime:</label>
            <input type="text" id="ime" name="ime" required>

            <label for="prezime">Prezime:</label>
            <input type="text" id="prezime" name="prezime" required>

            <label for="password1">Sifra:</label>
            <input type="password" id="password1" name="password1" required>

            <label for="password2">Potvrdite sifru:</label>
            <input type="password" id="password2" name="password2" required>

            <button type="button" onclick="registracija()">Registruj se</button>
            <button type="button" onclick="loginStrana()">Povratak nazad</button>
            <p id="greska-registracija" style="color:red"></p>
        </form>
    </div>
</body>
</html>

    <script>
        function loginStrana() {
            window.location.href = 'prijava.py';
        }
    </script>

    '''
)

