<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="dataEARTH is the Wikipedia of biological interactions.">

    <title>dataEARTH - The Wikipedia of Biological Interactions</title>

    <!--<link rel="icon" type="image/png" href="img/logo.png">-->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link href="css/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="css/animate.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Catamaran:200,400" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="css/inputs.css" />
    <link href="css/dataearth.css" rel="stylesheet">

    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>

    <script src="js/dataearth.js"></script>

</head>

<body>
    <!-- Navigation -->
    <nav id="connect-nav" class="navbar navbar-default">

        <div id="nav-logo" class="col-xs-1">
            <img class="img-circle" src="img/logo.png" />
        </div>

        <div class="col-xs-11 container-fluid">

            <p class="pull-left">dataEARTH Contact</p>

            <ul class="nav navbar-nav navbar-right">
                <li><a href="demo.php">Home</a></li>
                <!--<li><a href="#">Map</a></li>-->
                <li><a href="demo.php?id=13">Explore</a></li>
                <!--<li><a href="info.php">Connect</a></li>-->
                <!--<li><a href="#">About</a></li>-->
                <!--<li><a href="#">Help</a></li>-->
                <li><a href="contact.php">Contact</a></li>
            </ul>
        </div>

        <div class="clearfix"></div>

        <div class="bottom-nav container-fluid">

            <div class="col-xs-7"  style="background-color:#fff">
            </div>
            <div id="search-div" class="col-xs-5" style="background-color:#fff">
                <form id="search">
                    <div class="search-group input-group">
                        <label class="sr-only" for="search">Search</label>
                        <input type="search" class="search-box form-control" name="search_keyword" maxlength="128" placeholder="Search" aria-describedby="basic-addon2">
                        <span class="input-group-btn">
                           <button class="btn btn-default search-btn" type="submit"><i class="fa fa-search"></i></button>
                        </span>
                    </div>
                </form>
            </div>
        </div>

    </nav>

    <div class='clearfix'></div>

    <div class="col-xs-12" style="padding:50px 50px 100px;background:#23A8E9">
        <div class="col-xs-10 col-xs-offset-1">
            <div class="container">
                <h1>Contact</h1>
                <form id="contact-form" action="scripts/send.php" method="POST">
                    <div class="input-group">
                        <label class="sr-only" for="name">Name</label>
                        <input type="text" class="form-control contact" name="name" maxlength="128" placeholder="Name" aria-describedby="basic-addon2">
                    </div>
                    <br>

                    <div class="input-group">
                        <label class="sr-only" for="name">Email</label>
                        <input type="email" class="form-control contact" name="email" placeholder="Email" aria-describedby="basic-addon2">
                    </div>
                    <br>
                    <div class="input-group">
                        <label class="sr-only" for="name">Message</label>
                        <textarea rows="5" cols="26" class="form-control contact" name="message" placeholder="Message"></textarea>
                    </div>
                    <br>
                    <div class="input-group">
                        <input type="submit" class="form-control white-btn" />
                    </div>

                </form>
                <br>
                <p id="contact-response" class="pull-left" style="font-size:20px;color:#fff"></p>
            </div>
        </div>
    </div>


    <!-- Footer -->
    <footer>
        <div class="container">
            <p>All rights reserved dataEARTH &copy; - dataEARTH.com - <?php echo date("Y") ?></p>
            <!--<a href="mailto:yayimahuman@gmail.com?Subject=Contact%20dataEARTH" class="pull-right">placeholder email</a>-->
        </div>
    </footer>

</body>

</html>
