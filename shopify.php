<html>
	<head>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	</head>
</html>
<script>
	$.ajax({
         type: "GET",
         url: "https://backend-challenge-summer-2018.herokuapp.com/challenges.json?id=1&page=1",
         success: function(data) {
         	console.log(data);
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
</script>