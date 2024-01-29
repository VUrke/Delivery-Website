#!/usr/bin/env python

print("Content-type:text/html\n\n")

print("""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/style/login.css">
    <script src="/js/script.js"></script>
    <title>Login</title>
    
</head>
<body>
    <div id="container">
        <img id="dostava-slika" src="/images/dostava.png" alt="">
        <div class="login-container">
            <img id="logo-slika" src="/images/logo-login.jpg" alt="">
            <h2>Dobrodosli</h2>
            <form id="loginForm">
                <label for="username">Email:</label>
                <input type="text" id="username" name="username" required placeholder='Korisnicko ime...'>

                <label for="password">Lozinka:</label>
                <input type="password" id="password" name="password" required placeholder='Lozinka...'>

                <button type="button" onclick="login()">Uloguj se</button>
                <button type="button" onclick="Registracija()">Registruj se</button>
                <p id="greska"></p>
            </form>
        </div>
    </div>
    
    <script>
        function Registracija() {
            window.location.href = 'registracija.py';
        }
    </script>

</body>
</html>
""")
