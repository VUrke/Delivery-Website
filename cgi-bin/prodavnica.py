print("Content-type:text/html\n\n")

print("""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/style/prodavnica.css">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    <script src="/js/script.js"></script>
    <title>Prodavnica</title>
</head>
<body onload="proveraPrijave()">

    <div class="menu-bar">
        <img src="/images/logo-login.jpg" alt="Logo">
        <ul class="menu-items">
            <li><button class="dugmici" onclick='otvoriInfo()'>MOJ INFO</button></li>
            <li><button class="dugmici" onclick="idiNaKorpu()">KORPA</button></li>
            <li><button class="dugmici" onclick="odjaviSe()">ODJAVI SE</button></li>
        </ul>
    </div>

    <div class="center-sections">
        <div class="section">
            <a href="http://localhost:8000/cgi-bin/pica.py"><img src='/images/pizza.jpg' alt='Pizza'></a>
        </div>
        <div class="section">
            <a href="http://localhost:8000/cgi-bin/pljeskavica.py"><img src='/images/pljeska.jpg' alt='Pljeska'></a>
        </div>
        <div class="section">
            <a href="http://localhost:8000/cgi-bin/palacinka.py"><img src='/images/palacinka.jpg' alt='Palacinka'></a>
        </div>
    </div>
    
    <footer>
      <div class="footer">
        <div class="row">
          <ul>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Our Services</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Career</a></li>
          </ul>
        </div>

        <div class="row">
          Uros Copyright © 2024 Sva prava zadrzana || Designed By: Uros 
        </div>
      </div>
    </footer>
</body>
</html>
""")
