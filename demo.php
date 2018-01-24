<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui">
    <meta name="description" content="dataEARTH">

    <title>dataEARTH</title>

    <link rel="icon" type="image/png" href="img/logo.png">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link href="css/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="css/animate.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Catamaran:200,400" rel="stylesheet">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

    <link rel="stylesheet" type="text/css" href="css/inputs.css">
    <link href="css/dataearth.css" rel="stylesheet">

    <script src="js/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/cytoscape.min.js"></script>

    <script src="js/dataearth.js"></script>

</head>
<?php
$species_id = $_GET["id"];

if (is_null($species_id)):
?>

    <body>


        <!-- Navigation -->
        <nav id="home-nav" class="navbar navbar-default">
            <!--banner-->
            <div class="col-xs-12 navTop">
                <div class="col-xs-10 col-xs-offset-1">
                    <p class="tagline">Transforming Earth Science Research into a Global Ecological Map!</p>
                </div>
            </div>

            <div id="nav-logo" class="col-xs-4">
                <img src="img/logo-large.png" />
            </div>

            <div class="col-xs-6 col-xs-offset-2 container-fluid">

                <ul class="nav navbar-nav navbar-right">
                    <!--<li><a href="#">Map</a></li>-->
                    <li><a href="demo.php?id=61" style="font-size:40px">Explore</a></li>
                    <!--<li><a href="#">Connect</a></li>-->
                    <!--<li><a href="#">Search</a></li>-->
                    <!--<li><a href="#">About</a></li>-->
                    <!--<li><a href="#">Help</a></li>-->
                </ul>

                <div class="clearfix"></div>

                <div class="search-group input-group">
                    <label class="sr-only" for="search">Search</label>
                    <input type="search" class="search-box form-control selector" name="search_keyword" maxlength="128" placeholder="Search" aria-describedby="basic-addon2">
                    <span class="input-group-btn">
                        <button class="btn btn-default search-btn" type="submit"><i class="fa fa-2x fa-search"></i></button>
                    </span>
                </div>


                <p class="pull-right">Search and explore Earth’s species and ecosystems</p>

            </div>


            <div class="clearfix"></div>
        </nav>

        <div id="updates" class="col-xs-6 col-lg-4 col-lg-offset-1">
            <h2 style="color: black;">Featured:</h2>

            <div class="col-xs-4"><a id="updates-a1" href="">
                <div class="circle">
                     <img id="updates-i1" src="">
                </div></a>
                <p id="updates-p1"></p>
            </div>

            <div class="col-xs-4"><a id="updates-a2" href="">
                <div class="circle">
                    <img id="updates-i2" src="">
                </div></a>
                <p id="updates-p2"></p>
            </div>

            <div class="col-xs-4"><a id="updates-a3" href="">
                <div class="circle">
                   <img id="updates-i3" src="">
                </div></a>
                <p id="updates-p3"></p>
            </div>

        </div>


        <div id="recent" class="col-xs-6 col-lg-4 col-lg-offset-2">
            <h2 style="color: black;">Latest Updates:</h2>

            <div class="col-xs-4"><a id="recent-a1" href="">
                <div class="circle">
                    <img id="recent-i1" src="">
                </div></a>
                <p id="recent-p1"></p>
            </div>

            <div class="col-xs-4"> <a id="recent-a2" href="">
                <div class="circle">
                   <img id="recent-i2" src="">
                </div></a>
                <p id="recent-p2"></p>
            </div>

            <div class="col-xs-4"><a id="recent-a3" href="">
                <div class="circle">
                    <img id="recent-i3" src="">
                </div></a>
                <p id="recent-p3"></p>
            </div>

        </div>


        <script>

            /***


            you used to have the code below in a separate <script> tag


            ***/

            $(function() {
                $.ajax({
                    type: "GET",
                    url: "/scripts/autocomplete.php",
                    success: function(data) {
                        //console.log(data.data.country[0].Species_Name);
                        var Species_IDs = [],
                            Species_Names = [],
                            Species_Scientific_Names = [];
                        var asd = '[';
                        for (var i = 0; i < data.data.country.length; i++) {
                            Species_Names.push(data.data.country[i].Species_Name);
                            Species_IDs.push(data.data.country[i].Species_ID);
                            asd += '{"label":"' + data.data.country[i].Species_Name + '", "idx":"' + data.data.country[i].Species_ID + '"},';
                        }
                        asd = asd.substring(0, asd.length - 1);
                        asd += ']';

                        //console.log(asd);

                        asd = JSON.parse(asd);
                        //console.log(asd);
                        $(".selector").autocomplete({
                            source: asd,
                            select: function(event, ui) {
                                //window.location.href = 'http://www.google.com';
                                var name = "<?php echo $id; ?>";
                                window.location.assign("http://dataEARTH.com/demo.php?id=" + ui.item.idx);
                                //alert(ui.item.idx);
                            }
                        });

                    }
                });
            });
        </script>
        <?php
    else :
    ?>

            <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBsRUcH3xboJaH63BGjTBgNmYX4R3q2E-U">
            </script>
            <script type="text/javascript">
                var spec_id = "<?php echo $species_id; ?>";
            </script>

            <nav id="connect-nav" class="navbar navbar-default">

        <div id="nav-logo" class="col-xs-1">
            <img class="img-circle" src="img/logo.png" />
        </div>

        <div class="col-xs-11 container-fluid">

            <p class="pull-left">dataEARTH explore</p>

            <ul class="nav navbar-nav navbar-right">
                <li><a href="demo.php">Home</a></li>
                <!--<li><a href="#">Map</a></li>-->
                <li><a href="#">Explore</a></li>
                <!--<li><a href="info.php">Connect</a></li>-->
                <!--<li><a href="#">About</a></li>-->
                <!--<li><a href="#">Help</a></li>-->
                <li><a href="contact.php">Contact</a></li>
            </ul>
        </div>

        <div class="clearfix"></div>

        <div class="bottom-nav container-fluid">

            <div id="spec_name_here" class="col-xs-7 species-name" style="background-color:#fff"></div>

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

            <div id="cy_contain"><div  id="cy"></div></div><!--temp fix only-->

            <div id="displayhere" style="font-family: Arial;"></div>
            <script src="js/info.js"></script>
            <script src="js/explore.js"></script>

            <script>
                var name = "<?php echo $species_id; ?>";
                var species_data;
                var connection_data = [];
            </script>
            <?php
    endif;
    ?>

                <!-- Footer -->
                <!--<footer style="position:absolute;bottom:0px;text-align:center;width:100%;">
                    <div class="container">
                        <p>All rights reserved dataEARTH &copy; - dataEARTH.com -
                            <?php echo date("Y") ?>
                        </p>-->
                        <!--<a href="mailto:yayimahuman@gmail.com?Subject=Contact%20dataEARTH" class="pull-right">placeholder email</a>-->
                    <!--</div>
                </footer>-->

    </body>


</html>
<style>
#home-nav #nav-logo img {
    height: 150%;
    width: 150%;
}
</style>
