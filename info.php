<?php $species_id = $_GET["id"]; ?>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="dataEARTH">

    <title>dataEARTH</title>

    <link rel="icon" type="image/png" href="img/logo.png">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link href="css/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="css/animate.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Catamaran:200,400" rel="stylesheet">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

    <link rel="stylesheet" type="text/css" href="css/inputs.css" />
    <link href="css/dataearth.css" rel="stylesheet">

    <script src="js/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="js/bootstrap.min.js"></script>

    <script src="js/dataearth.js"></script>
    <script src="js/explore.js"></script>
    <script src="js/info.js"></script>

    <script type="text/javascript">
        //alert("this is line 36")
        var spec_id = "<?php echo $species_id; ?>";
        //alert("L: " + spec_id)
    </script>

</head>

<body>

    <!-- Navigation -->
    <nav id="connect-nav" class="navbar navbar-default">

        <div id="nav-logo" class="col-xs-1">
            <img class="img-circle" src="img/logo.png" />
        </div>

        <div class="col-xs-11 container-fluid">

            <p class="pull-left">dataEARTH info</p>

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

            <div class="col-xs-7 species-name" style="background-color:#fff"></div>

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

    <div class="rely-respond-div col-xs-6">
        <div id="connect-rely-div" class="col-xs-6">
            <h2>Rely</h2>
            <!--subgroups inserted here-->
        </div>


        <div id="connect-respond-div" class="col-xs-6">
            <h2>Respond</h2>
            <!--subgroups inserted here-->
        </div>
    </div>


    <div id="connect-nav-div" class="col-xs-6">

        <div class="col-xs-12">

            <h2 class="species-name"></h2>
            <br>
            <div class="col-xs-5 col-md-4">
                <div class="circle">
                    <img id="species-img" class="species-img" src="">
                </div>
            </div>
            <div class="col-xs-7 col-md-8">
                <p><b>Scientific Name: </b><i><span class="scientific-name"></span></i></p>
                <p><b>Subgroup: </b><span id="species-subgroup"></span></p>
                <!--<p><b>Average Weight: </b><span id="unit-weight"></span></p>-->
                <p id="weight-info">
                    <b>Weight Range: </b>

                    <span id="low-weight"></span><span class="unit-weight"></span>
                    <span id="weight-span"></span>
                    <span id="high-weight"></span><span class="unit-weight"></span>
                </p>
            </div>

            <div class="clearfix"></div>

            <h3>Description</h3>

            <p class="species-desc">No description available</p>

            <h3>Distribution <span style="text-transform: lowercase;">and</span> Habitat</h3>

            <div id="map"></div>

            <br>
            <!--ready for insertion via JS-->
            <div id="habitat-blurbs" class="col-xs-12"></div>

        </div>

    </div>

    <div class="clearfix"></div>



    <!-- Footer -->
    <!--<footer>
        <div class="container">
            <p>All rights reserved dataEARTH &copy; - dataEARTH.com - <?php echo date("Y") ?></p>
            <!--<a href="mailto:yayimahuman@gmail.com?Subject=Contact%20dataEARTH" class="pull-right">placeholder email</a>-->
    <!--</div>
    </footer>-->

</body>

</html>
<script type="text/javascript">
    infopage(spec_id);
    queryLoc(spec_id);
</script>
<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBsRUcH3xboJaH63BGjTBgNmYX4R3q2E-U&callback=initMap">
    </script>
