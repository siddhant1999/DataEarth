
var loc_name, loc_expanse, loc_desc, loc_img;
var spec_name;
console.log("we are currently in info.js")

function queryLoc(id_now){
  var location_name = "";
  //habitatAppend(loc_name,loc_desc,loc_expanse, loc_img);
  var thestring = "SELECT * FROM Species_Location WHERE Species_ID='"+ id_now +"'ORDER BY Species_Location_Priority;";
  $.ajax({
    type: "POST",
    url: "scripts/infodata.php",
    async: false,
    data: {
       sqlquery: thestring,
       theTable: "spec_loc"
    },
    success: function(resulto) {
      if (!resulto.connections.length) {
        return 0;
      }
      console.log("resulto");
      console.log(resulto);
      //this contains the expanse area and description

      loc_expanse = resulto.connections[0].Location_Expanse_Area;
      loc_desc = resulto.connections[0].Species_Location_Desc;
      //console.log(resulto.connections[0]);
      //alert(loc_desc);
      var thestr = "SELECT * FROM Locations WHERE Location_ID='"+ resulto.connections[0].Location_ID +"';";
      $.ajax({
        type: "POST",
        url: "scripts/infodata.php",
        async: false,
        data: {
           sqlquery: thestr,
           theTable: "loc"
        },
        success: function(reso) {
          console.log("reso");
          console.log(reso);
          //this contains the image, name
          loc_img = reso.connections[0].Location_Image_URL;
          loc_name = reso.connections[0].Location_Name;
          habitatAppend(loc_name,loc_desc,loc_expanse, loc_img, resulto.connections[0].Species_Location_ID);
          location_name = loc_name;
          //k so now just check if it was a lat lng or an address
          is_address = false;
          if (reso.connections[0].Location_Address) {
            address = reso.connections[0].Location_Address;
            is_address = true;
          }
          else {
            address = '{"lat": '+reso.connections[0].Location_Latitude+', "lng": '+reso.connections[0].Location_Longitude+'}';
            console.log(address);
            is_address = false;
          }
        }
      });

      /*for (var i = 0; i < resulto.connection.length; i++) {
        this is what the location data really should be like, for now I will simply work with the location of highest priority
      }*/
      //if(!resulto.connections.length){
        //meaning that no location is given
      //}
    }
  });
  return location_name;
}


function initMap() {
  //$('body').empty();
  //$('html').css("height", "100%");
  //$('body').css("height", "100%");
  console.log("initializing map")
  //$('body').append("<div id='map'></div>");
  $('#map').css("height", "300px");
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    /*center: {lat: -34.397, lng: 150.644}*/
  })
  var geocoder = new google.maps.Geocoder();

  //address = "8 Stevensgate Drive, Ajax, Ontario";
  //address = "{lat: 36.406, lng: 57.717}";

  geocodeAddress(geocoder, map);
  //at this point the map is initialized and has the marker
}
 function geocodeAddress(geocoder, resultsMap) {
   //var address = document.getElementById('address').value;
   geocoder.geocode({'address': address}, function(results, status) {
     if (status === 'OK') {
       console.log(results);
       resultsMap.setCenter(results[0].geometry.location);
       var marker = new google.maps.Marker({
         map: resultsMap,
         position: results[0].geometry.location
       });
     }
     else {
       console.log(address);
       //console.log(JSON.parse('{"lat": 36.406507, "lng": 57.717964}'));
       //console.log("fucking hell");
       //resultsMap.setCenter({lat: 36.406507, lng: 57.717964});
       resultsMap.setCenter(JSON.parse(address));
       var marker = new google.maps.Marker({
         map: resultsMap,
         position: JSON.parse(address)
       });

       //here we insert a button that asks to find the 5 closest species
       //alert('Geocode was not successful for the following reason: ' + status);
     }
   });
 }

//function loc_init(){
  //var sss = '<img src="'+loc_img+'"><p>'+loc_name+'</p><br><p>'+loc_desc+'</p><br><p>'+loc_expanse+'</p>';
  //$('#loc_info').append(sss);

//}

function infopage(theid){
  console.log("initialized infopage")


  var con_lookup = sessionStorage.getItem('con_lookup').split(',');
  /*var conn_id = JSON.parse("[" + sessionStorage.getItem('conn_id')+"]");
  var conn_s1 = JSON.parse("[" + sessionStorage.getItem('conn_s1')+"]");
  var conn_s2 = JSON.parse("[" + sessionStorage.getItem('conn_s2')+"]");
  var conn_type = JSON.parse("[" + sessionStorage.getItem('conn_type')+"]");
  var conn_desc = JSON.parse("[" + sessionStorage.getItem('conn_desc')+"]");
  var conn_pri = JSON.parse("[" + sessionStorage.getItem('conn_pri')+"]");
  */
  var allnodes = JSON.parse("[" + sessionStorage.getItem('allnodes') + "]");
  console.log(sessionStorage.getItem('species_lookup').split(','));
  var species_lookup = sessionStorage.getItem('species_lookup').split(',');
  var species_img_lookup = sessionStorage.getItem('species_img_lookup').split(',');
  //var species_img_lookup = sessionStorage.getItem('species_img_lookup');
  var rely_nodes = JSON.parse("[" + sessionStorage.getItem('rely_nodes')+ "]");
  var rely_subgroup_lookup = sessionStorage.getItem('rely_subgroup_lookup').split(',');
  var respond_nodes = JSON.parse("[" + sessionStorage.getItem('respond_nodes')+ "]");
  var respond_subgroup_lookup = sessionStorage.getItem('respond_subgroup_lookup').split(',');

  console.log(rely_nodes);
  spec_name =  sessionStorage.getItem('spec_name');
  var spec_sci_name = sessionStorage.getItem('spec_sci_name');
  var spec_img = sessionStorage.getItem('spec_img');
  //document.getElementById("spec_name_here").innerHTML = spec_name;
  var spec_desc =sessionStorage.getItem('spec_desc');
  //alert(spec_desc);
  var spec_low =sessionStorage.getItem('spec_low');
  var spec_high =sessionStorage.getItem('spec_high');
  var spec_units =sessionStorage.getItem('spec_units');
  var spec_subgroup =sessionStorage.getItem('spec_subgroup');
  var spec_category = sessionStorage.getItem('spec_category');


  var ssss = "SELECT * FROM Subgroups WHERE Subgroup_ID='"+spec_subgroup+"';";
  //infoInit(spec_name, spec_sci_name, spec_desc, spec_low, spec_high, spec_units, spec_img, spec_subgroup);
 
  if (spec_subgroup) {
    $.ajax({
    type: "POST",
    url: "scripts/infodata.php",
    async: false,
    data: {
       sqlquery: ssss,
       theTable: "subgroup"
    },
    success: function(data) {
      console.log(data);
      if (data.connections.length) {
        spec_subgroup = data.connections[0].Subgroup_Name;
      }
      
    }
  });
  }
  

  infoInit(spec_name, spec_sci_name, spec_desc, spec_low, spec_high, spec_units, spec_img, spec_subgroup);

  //speciesInit(spec_sci_name, desc, low_weight, high_weight, unit_weight, img_url, subgroup_id)
  //console.log("Whether or not null", spec_category)

  //console.log("boolean", spec_category, spec_category == 'null')
  
  if(spec_category != 'null'){//this is wrong
    //query the species_categories table
    console.log("You should be fucking here")
    var srccat = "SELECT * FROM Species_Categories WHERE Category_ID='"+ spec_category +"';";
    console.log("begin")
    $.ajax({
      type: "POST",
      url: "scripts/infodata.php",
      async: false,
      data: {
         sqlquery: srccat,
         theTable: "category"
      },
      success: function(data) {
        console.log("over here", data, data.connections.length)
        //to fix this you need to itterate over each species in data.connections and determine the respective species info and subgroups
        for (var p = 0; p < rely_nodes.length; p++) {
        var curspecid = rely_nodes[p];
        //alert(curspecid);
        var subgroup_id = rely_subgroup_lookup[rely_nodes[p]];



        var spec_query = "SELECT * FROM Subgroups WHERE Subgroup_ID='"+subgroup_id+"';";
        $.ajax({
          type: "POST",
          url: "scripts/infodata.php",
          async: false,
          data: {
            sqlquery: spec_query,
            theTable: "subgroup"
          },
          success: function(sub_res){
            console.log("here is the sub_res result data:");
            console.log(sub_res);
            if (sub_res.connections.length>0) {
              infoAppend("rely", sub_res.connections[0].Subgroup_Name, species_lookup[curspecid], con_lookup[curspecid], species_img_lookup[curspecid],sub_res.connections[0].Subgroup_Image_URL, curspecid)
              //$('#connect-rely-div').append(add_tag_new);
            }

          }
        });
      }
      }
    });
  }

  else{


  //$('#con_1').append("<h3><u>Rely</u></h3>");
  //$('#con_2').append("<h3><u>Respond</u></h3>");
  var src12 = "SELECT * FROM Connections WHERE Connection_Type='Rely' AND Species_1_ID='"+ theid +"'ORDER BY Connection_Priority;";
  var src21 = "SELECT * FROM Connections WHERE Connection_Type='Respond' AND Species_1_ID='"+ theid +"' ORDER BY Connection_Priority;";
  console.log("start querying");
  /*console.log(rely_nodes);
  console.log(rely_subgroup_lookup);
  console.log(respond_nodes);
  console.log(respond_subgroup_lookup);
  */

  //rely
  $.ajax({
    type: "POST",
    url: "scripts/infodata.php",
    async: false,
    data: {
       sqlquery: src12,
       theTable: "connect"
    },
    success: function(data) {
      console.log("here is the rely data");
      console.log(data);

      //here we need to start by querying for these species in the food table (if they exist in the species_id column)
      for (var k = 0; k < data.connections.length; k++) {
        //console.log(data.connections[i].Species_1_ID);
        //now check if this id exists in the foods table
        var thequery = "SELECT * FROM Foods WHERE Species_ID='"+data.connections[k].Species_2_ID+"';";
        console.log(thequery);
        $.ajax({
          type: "POST",
          url: "scripts/infodata.php",
          async: false,
          data: {
            sqlquery: thequery,
            theTable: "food"
          },
          success: function(res){
            //console.log(res);
            //this means that this species is a food
            for (var j = 0; j < res.connections.length; j++) {
              //alert(res.connections[j].Food_ID);
              var spec_query = "SELECT * FROM Species_Foods WHERE Food_ID='"+res.connections[j].Food_ID+"' AND Species_ID='"+ theid +"';";

              $.ajax({
                type: "POST",
                url: "scripts/infodata.php",
                async: false,
                data: {
                  sqlquery: spec_query,
                  theTable: "species_food"
                },
                success: function(ress){
                  console.log(ress);

                  if(ress.connections.length){


                    //$('#connect-rely-div').append('<h3>Food<i class="fa fa-sun-o" style="color:#f2cc10"></i></h3>');
                    //alert("here");
                    console.log(data.connections[k].Species_2_ID);
                    console.log(rely_nodes);
                    //alert("here now");
                    var index = rely_nodes.indexOf(parseInt(data.connections[k].Species_2_ID));
                    //alert(index + " " + data.connections[k].Species_2_ID);
                    if (index > -1) {rely_nodes.splice(index, 1);
                      //alert("here: " + index);
                    }
                  }
                  for (var q = 0; q < ress.connections.length; q++) {
                    var food_img_url = res.connections[j].Food_Image_URL;
                    if (food_img_url == null) {
                      //this means that we got the food as a species
                      food_img_url = species_img_lookup[data.connections[k].Species_2_ID];
                    }
                    var food_name = res.connections[j].Food_Name;
                    if (food_name == null) {
                      //this means that we got the food as a species
                      food_name = species_lookup[data.connections[k].Species_2_ID];
                      console.log(species_lookup);
                      //alert(species_lookup);
                    }
                    console.log(ress.connections[q]);
                    var species_food_desc = ress.connections[q].Species_Food_Desc;
                    var species_food_conmin = ress.connections[q].Consumption_Low_Percentage;
                    var species_food_conmax = ress.connections[q].Consumption_High_Percentage;
                    var species_food_conav = ress.connections[q].Average_Consumption;
                    //alert(food_name);
                    //var add_tag = '<img style="vertical-align:middle" align="left" src="'+food_img_url+'"><h5>'+food_name+'</h5><br><p>'+species_food_desc+'</p><p>Consumption range: '+species_food_conmin+'% - '+species_food_conmax+'%</p><p>Average Consumption: '+species_food_conav+'%</p><br>';
                    var add_tag_new = '<div class="connect-blurb"><div class="col-xs-3"><img class="img-circle" src="'+food_img_url+'"></div><div class="col-xs-9 connect-blurb-text"><h4>'+food_name+'</h4><p>'+species_food_desc+'</p><p>Consumption range: '+species_food_conmin+'% - '+species_food_conmax+'%</p><p>Average Consumption: '+species_food_conav+'%</p></div></div><div class="clearfix"></div>';
                    //$('#con_1').append(add_tag);
                    //alert("we are here");
                    //infoAppend("rely","testing","blurb title","blurb text","img url, leave blank for placeholder image", "subgroup icon url here (adds custom icon beside subgroup e.g. a sunflower for photosynthesis) ");
                    var appendingstr = "" + species_food_desc+"<br><b>Consumption range: </b>"+species_food_conmin+"% - "+species_food_conmax+"%<br><b>Average Consumption: </b>"+species_food_conav + ""
                    infoAppend("rely", "Food", food_name, appendingstr, food_img_url,"img/logo.png", data.connections[k].Species_2_ID) // change to actual food img
                    //$('#connect-rely-div').append(add_tag_new);
                  }

                  //this is if the food exists in the species foods table

                }
              });
            }
          }
        });
      }
      //subgroups here
      rely_nodes.sort(function(a, b){return rely_subgroup_lookup[a]-rely_subgroup_lookup[b]});

      for (var p = 0; p < rely_nodes.length; p++) {
        var curspecid = rely_nodes[p];
        //alert(curspecid);
        var subgroup_id = rely_subgroup_lookup[rely_nodes[p]];
        //alert(subgroup_id);
        var spec_query = "SELECT * FROM Subgroups WHERE Subgroup_ID='"+subgroup_id+"';";

        //now the species are grouped by the respective subgroups they are in
        $.ajax({
          type: "POST",
          url: "scripts/infodata.php",
          async: false,
          data: {
            sqlquery: spec_query,
            theTable: "subgroup"
          },
          success: function(sub_res){
            console.log("here is the sub_res result data:");
            console.log(sub_res);
            if (sub_res.connections.length>0) {

              /*console.log(sub_res.connections[0]);
              console.log(sub_res.connections[0].Subgroup_Image_URL);
              var add_tag = '<img style="vertical-align:middle" align="left" src="'+sub_res.connections[0].Subgroup_Image_URL+'"><h4>'+sub_res.connections[0].Subgroup_Name+'</h4>';
              add_tag += '<br><img style="vertical-align:middle" align="left" src="'+species_img_lookup[curspecid]+'"><h5>'+species_lookup[curspecid]+'</h5>';
              add_tag += '<br><p>'+con_lookup[curspecid]+'</p><br>';//this is the connection description
              var add_tag_new = '<h3>'+ sub_res.connections[0].Subgroup_Name+'<i class="fa fa-sun-o" style="color:#f2cc10"></i></h3>';
              add_tag_new+= '<div class="connect-blurb"><div class="col-xs-3"><img class="img-circle" src="'+species_img_lookup[curspecid]+'"></div><div class="col-xs-9 connect-blurb-text"><h4>'+species_lookup[curspecid]+'</h4><p>'+con_lookup[curspecid]+'</p></div></div><div class="clearfix"></div>';
              console.log(species_img_lookup);*/
              infoAppend("rely", sub_res.connections[0].Subgroup_Name, species_lookup[curspecid], con_lookup[curspecid], species_img_lookup[curspecid],sub_res.connections[0].Subgroup_Image_URL, curspecid)
              //$('#connect-rely-div').append(add_tag_new);
            }

          }
        });
      }
      console.log("done rely");
    }//success ends here
  });
  //respond
  $.ajax({
    type: "POST",
    url: "scripts/infodata.php",
    async: false,
    data: {
       sqlquery: src21,
       theTable: "connect"
    },
    success: function(data) {
      console.log("here is the respond data");
      console.log(data);

      //console.log(data.connections[i].Species_1_ID);
      //now check if this id exists in the foods table
      var thequery = "SELECT * FROM Foods WHERE Species_ID='"+theid+"';";
      console.log(thequery);
      $.ajax({
        type: "POST",
        url: "scripts/infodata.php",
        async: false,
        data: {
          sqlquery: thequery,
          theTable: "food"
        },
        success: function(res){
          //console.log(res);
          for (var j = 0; j < res.connections.length; j++) {
            //alert(res.connections[j].Food_ID);
            var spec_query = "SELECT * FROM Species_Foods WHERE Food_ID='"+res.connections[j].Food_ID+"';";

            $.ajax({
              type: "POST",
              url: "scripts/infodata.php",
              async: false,
              data: {
                sqlquery: spec_query,
                theTable: "species_food"
              },
              success: function(ress){
                console.log(ress);
                if(ress.connections.length){

                  //$('#connect-respond-div').append('<h3>Food<i class="fa fa-sun-o" style="color:#f2cc10"></i></h3>');

                  //$('#con_2').append("<h4>Food For</h4><br>");
                  var index = respond_nodes.indexOf(parseInt(data.connections[j].Species_2_ID));
                  if (index > -1) {respond_nodes.splice(index, 1);}
                }
                for (var q = 0; q < ress.connections.length; q++) {

                  if (species_lookup[ress.connections[q].Species_ID]) {
                    var food_img_url = species_img_lookup[ress.connections[q].Species_ID];

                    var food_name = species_lookup[ress.connections[q].Species_ID];
                    var species_food_desc = ress.connections[q].Species_Food_Desc;
                    var species_food_conmin = ress.connections[q].Consumption_Low_Percentage;
                    var species_food_conmax = ress.connections[q].Consumption_High_Percentage;
                    var species_food_conav = ress.connections[q].Average_Consumption;
                    //var add_tag = '<img style="vertical-align:middle" align="left" src="'+food_img_url+'"><h5>'+food_name+'</h5><br><p>'+species_food_desc+'</p><p>Consumption range: '+species_food_conmin+'% - '+species_food_conmax+'%</p><p>Average Consumption: '+species_food_conav+'%</p><br>';
                    //var add_tag_new = '<div class="connect-blurb"><div class="col-xs-3"><img class="img-circle" src="'+food_img_url+'"></div><div class="col-xs-9 connect-blurb-text"><h4>'+food_name+'</h4><p>'+species_food_desc+'</p><p>Consumption range: '+species_food_conmin+'% - '+species_food_conmax+'%</p><p>Average Consumption: '+species_food_conav+'%</p></div></div><div class="clearfix"></div>';
                    //$('#con_1').append(add_tag);
                    var appendingstr = "" + species_food_desc+"<br><b>Consumption range: </b>"+species_food_conmin+"% - "+species_food_conmax+"%<br><b>Average Consumption: </b>"+species_food_conav + ""
                    infoAppend("respond", "Food", food_name, appendingstr, food_img_url,"img/logo.png", ress.connections[q].Species_ID)

                    //$('#connect-respond-div').append(add_tag_new);
                    //$('#con_2').append(add_tag);
                  }
                }
                //this is if the food exists in the species foods table

              }
            });
          }
        }
      });

      respond_nodes.sort(function(a, b){return respond_subgroup_lookup[a]-respond_subgroup_lookup[b]});
      for (var p = 0; p < respond_nodes.length; p++) {
        var subgroup_id = respond_subgroup_lookup[respond_nodes[p]];
        var curspecid = respond_nodes[p];
        var spec_query = "SELECT * FROM Subgroups WHERE Subgroup_ID='"+subgroup_id+"';";

        //now the species are grouped by the respective subgroups they are in
        $.ajax({
          type: "POST",
          url: "scripts/infodata.php",
          async: false,
          data: {
            sqlquery: spec_query,
            theTable: "subgroup"
          },
          success: function(sub_res){
            console.log("here is the sub_res result data:");
            console.log(sub_res);
            if (sub_res.connections.length) {
              //console.log(sub_res.connections[0].Subgroup_Image_URL);
              /*var add_tag = '<img style="vertical-align:middle" align="left" src="'+sub_res.connections[0].Subgroup_Image_URL+'"><h4>'+sub_res.connections[0].Subgroup_Name+'</h4>';
              add_tag += '<br><img style="vertical-align:middle" align="left" src="'+species_img_lookup[curspecid]+'"><h5>'+species_lookup[curspecid]+'</h5>';
              add_tag += '<br><p>'+con_lookup[curspecid]+'</p><br>';
              var add_tag_new = '<h3>'+ sub_res.connections[0].Subgroup_Name+'<i class="fa fa-sun-o" style="color:#f2cc10"></i></h3>';
              add_tag_new+= '<div class="connect-blurb"><div class="col-xs-3"><img class="img-circle" src="'+species_img_lookup[curspecid]+'"></div><div class="col-xs-9 connect-blurb-text"><h4>'+species_lookup[curspecid]+'</h4><p>'+con_lookup[curspecid]+'</p></div></div><div class="clearfix"></div>';
              console.log(species_img_lookup);*/
              infoAppend("respond", sub_res.connections[0].Subgroup_Name, species_lookup[curspecid], con_lookup[curspecid], species_img_lookup[curspecid],sub_res.connections[0].Subgroup_Image_URL, curspecid)
              //$('#connect-respond-div').append(add_tag_new);
              //$('#con_2').append(add_tag);
            }
          }
        });
      }
      console.log("done respond");
    }
  });
 }
  //map implementation
  //map_loc(theid);
}
