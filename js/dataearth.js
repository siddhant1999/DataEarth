function homeInit(leftOrRight, img1, species1, link1, img2, species2, link2, img3, species3, link3){
    var category = "";
    leftOrRight = leftOrRight.toLowerCase();

    //console.log(leftOrRight, img1, species1, link1);


    if (leftOrRight == "left"){
        category = "updates";
    }
    else if (leftOrRight == "right"){
        category = "recent";
    }
    else{
        console.log("invalid value for leftOrRight in homeInit()");
        return;
    }
    //http://dataearth.com/demo.php?id=
    console.log("initiating homepage bubbles for category: " + category);
    var ttt ="";
    var selector = "#" + category + "-";//selects updates > updates-[INSERT HERE]

    $(selector + "i1").attr("src",img1);
    $(selector + "p1").text(species1);
    ttt = "http://dataearth.com/demo.php?id=" + link1;
    $(selector + "a1").attr("href", ttt);

    $(selector + "i2").attr("src",img2);
    $(selector + "p2").text(species2);
    ttt = "http://dataearth.com/demo.php?id=" + link2;
    $(selector + "a2").attr("href", ttt);

    $(selector + "i3").attr("src",img3);
    $(selector + "p3").text(species3);
    ttt = "http://dataearth.com/demo.php?id=" + link3;
    $(selector + "a3").attr("href", ttt);
}
function infoInit(speciesName, scientificName, description, lowWeight, highWeight, unitWeight, speciesImg, subgroup){//this function initializes the connect/info page
    console.log("info page initalized");
    //alert(description);
    //alert(subgroup);

    if (scientificName == "" || scientificName == null) {
        $(".scientific-name").remove();
    }
    if (subgroup.length < 1 || subgroup == "null") {
    alert("here");
        $("#species-subgroup").remove();
    }

    if (unitWeight == "" || lowWeight == "" || highWeight == "" || unitWeight == null || lowWeight == null || highWeight == null) {

        $("#weight-info").remove();
    }
    if (description == "" || description == null) {
        $(".species-desc").remove();
    }

    $(".species-name").text(speciesName);//inserts species name
    $(".species-img").attr('src', speciesImg);
    $(".scientific-name").text(scientificName);
    $("#species-subgroup").text(subgroup);
    $(".unit-weight").text(unitWeight);
    $(".species-desc").text(description);

    //some logic for printing out the right text
    /*if (lowWeight != "" && highWeight == ""|| highWeight=="null"){//is this a string or int?
        $("#low-weight").text("At least " + lowWeight);
        $("#high-weight").text("");
    }
    else if (lowWeight == "" || lowWeight=="null" && highWeight != ""){//is this a string or int?
        $("#low-weight").text("");
        $("#high-weight").text("Up to " + highWeight);
    }
    else */if (lowWeight != "" && highWeight != ""){
        $("#low-weight").text(lowWeight);
        $("#high-weight").text(highWeight);
        $("#weight-span").text(" to ");
    }
}
function habitatAppend(habitat,habitatDesc,habitatArea,habitatImg = "", habitat_id){//this function appends a habitat group to the info page
    if (typeof habitat !== 'undefined'){
        //var habitatSelector = habitat.toLowerCase().replace(/ /g,"-");
        habitatSelector = habitat_id;

        $("#habitat-blurbs").append(
            '<div class="col-xs-4">'+
                '<div class="circle">'+
                    '<img id="' + habitatSelector + '-img">'+
                '</div>'+
            '</div>'+
            '<div class="col-xs-8">'+
                '<p><b>Habitat: </b><span id="' + habitatSelector + '"></span></p>'+
                '<p><b>Description: </b><span id="' + habitatSelector + '-desc"></span></p>'+
                '<p><b>Distribution Size: </b><span id="' + habitatSelector + '-area"></span></p>'+
            '</div>'+
            '<div class="clearfix"></div><br>'
        );

        $("#" + habitatSelector).text(habitat);
        //alert(habitatDesc);
        $("#" + habitatSelector + "-desc").text(habitatDesc);
        $("#" + habitatSelector + "-area").text(habitatArea);
        $("#" + habitatSelector + "-img").attr('src', habitatImg);
    }
}
function infoAppend(relyOrRespond = "rely", subgroup, blurbTitle = "", blurbText = "", imgUrl = "",subgroupIconUrl = "", species_id){//this function allows you to append info to the rely and respond divs
    //console.log("infoAppend: " + subgroup)
    //set inputs to lowercase
    relyOrRespond = relyOrRespond.toLowerCase();
    var subgroupSelector = subgroup.toLowerCase().replace(/ /g,"-");

    if (relyOrRespond == "rely"){
        var selector = "#connect-rely-div";
    }
    else if (relyOrRespond == "respond"){
        var selector = "#connect-respond-div";
    }
    else{
        console.log("invalid value for relyOrRespond in infoAppend()");
        return;
    }

    //check if subgroup exists -> if not, add it
    if ($(selector + " > div#" + subgroupSelector).length == 0){
        //console.log("Subgroup doesn't exist yet. Creating new subgroup: " + subgroup);
        //console.log($(selector + " > div#" + subgroupSelector));
        //console.log(" <- " + subgroupSelector);
        $(selector).append(
            '<div id="'+ subgroupSelector +'">'+
                '<div class="col-lg-offset-3">'+
                    '<h3>'+ subgroup +'</h3>'+
                '</div>'+
            '</div>'
        );
        //console.log("successfully created");

        if (subgroupIconUrl != ""){//adds custom icon beside subgroup (e.g. a sunflower for photosynthesis)
            $(selector + " > div#" + subgroupSelector +" > div > h3").append('<img style="border-radius: 100%;" class="subgroup-icon" src="'+ subgroupIconUrl +'"/>');

        }
    }
    else{
        //console.log("subgroup already exists. appending...");
    }

    //add blurb and stuff
    $(selector + " > div#" + subgroupSelector).append(
        '<div class="connect-blurb">'+
            '<div class="col-xs-3">'+
                '<a href="https://dataearth.com/demo.php?id='+species_id+'"><div class="circle">'+
                    '<img src="'+ imgUrl +'">'+
                '</div></a>'+
            '</div>'+
            '<div class="col-xs-9 connect-blurb-text">'+
                '<h4>'+ blurbTitle +'</h4>'+
                '<p>'+ blurbText +'</p>'+
            '</div>'+
        '</div>'+
        '<div class="clearfix"></div>'
    );

}


$( document ).ready(function() {
    //console.log("ready");


    var path = window.location.pathname;
    //console.log("current path: "+path);
    if (path.includes("demo.php")){
        $.ajax({
            type: "POST",
            url: "scripts/infodata.php",
            data: {// ORDER BY Date_Updated DESC LIMIT 3;
                sqlquery: "SELECT * FROM Species ORDER BY Date_Updated DESC LIMIT 3;",
                theTable: "recent",
            },
            success: function(reso) {
                //console.log("right: ")
                //console.log(reso);
                //(leftOrRight, img1, species1, link1, img2, species2, link2, img3, species3, link3)
                homeInit("right", reso.connections[0].Species_Image_URL, reso.connections[0].Species_Name, reso.connections[0].Species_ID, reso.connections[1].Species_Image_URL, reso.connections[1].Species_Name, reso.connections[1].Species_ID,reso.connections[2].Species_Image_URL, reso.connections[2].Species_Name, reso.connections[2].Species_ID);
                //console.log("right: done ");
                /*document.getElementById("i1").src = reso.connections[0].Species_Image_URL;
                document.getElementById("i2").src = reso.connections[1].Species_Image_URL;
                document.getElementById("i3").src = reso.connections[2].Species_Image_URL;

                document.getElementById("p1").innerHTML = reso.connections[0].Species_Name;
                document.getElementById("p2").innerHTML = reso.connections[1].Species_Name;
                document.getElementById("p3").innerHTML = reso.connections[2].Species_Name;*/
            }

        });

        $.ajax({
            type: "POST",
            url: "scripts/infodata.php",
            data: {
                sqlquery: "SELECT * FROM Species ORDER BY RAND() LIMIT 3;",
                theTable: "recent",
            },
            success: function(reso) {
                homeInit("left", reso.connections[0].Species_Image_URL, reso.connections[0].Species_Name, reso.connections[0].Species_ID, reso.connections[1].Species_Image_URL, reso.connections[1].Species_Name, reso.connections[1].Species_ID,reso.connections[2].Species_Image_URL, reso.connections[2].Species_Name, reso.connections[2].Species_ID);

                
                /*document.getElementById("ii1").src = reso.connections[0].Species_Image_URL;
                document.getElementById("ii2").src = reso.connections[1].Species_Image_URL;
                document.getElementById("ii3").src = reso.connections[2].Species_Image_URL;

                document.getElementById("pp1").innerHTML = reso.connections[0].Species_Name;
                document.getElementById("pp2").innerHTML = reso.connections[1].Species_Name;
                document.getElementById("pp3").innerHTML = reso.connections[2].Species_Name;*/
            }


        });
        //homeInit("left","http://i0.kym-cdn.com/entries/icons/mobile/000/013/564/doge.jpg","test","http://i0.kym-cdn.com/entries/icons/mobile/000/013/564/doge.jpg","test","https://lh4.ggpht.com/mJDgTDUOtIyHcrb69WM0cpaxFwCNW6f0VQ2ExA7dMKpMDrZ0A6ta64OCX3H-NMdRd20=w300","test");

    }



    var contactform = $('#contact-form');
    $(contactform).submit(function(event) {
        // Stop the browser from submitting the form.
        //console.log("submitted");
        event.preventDefault();

        // Serialize the form data.
        var formData = $(contactform).serialize();

        $.ajax({
            type: 'POST',
            url: $(contactform).attr('action'),
            data: formData
        })
        .done(function(data) {
            $("#contact-response").html(data);
        });

        return false;

    });

    /*var searchform = $('#search');
    $(searchform).submit(function(event) {
        // Stop the browser from submitting the form.
        console.log("submitted");
        event.preventDefault();

        // Serialize the form data.
        var formData = $(searchform).serialize();

        $.ajax({
            type: 'POST',
            url: $(searchform).attr('action'),
            data: formData
        })
        .done(function(data) {
            //logic
        });

        return false;

    });*/

});
