var flag = 0;
$(document).ready( function($) {
$('#commit').hide();
$('#pad').hide();
var y=$(document).find("title").text();
	var request = $.ajax({
					type: 'GET',
					url: 'http://10.0.10.176:8092/editable/getdata', 
					async: false,
					success: function (data) {	
								  var val1,i;
								  for(i=0;i<data.length;i++){
                              if(data[i].title == y) {
                            	  flag = 1;
								val1 = data[i].content;
					        }
								  }
								  $("#pad").text(val1);
								},
			});
});
function myFunction() {
	 var x = $('#pad').val();
     $('#pad').hide();
      $('#commit').hide();
       $('#markdown').show();
        $('#edit').show();
        $('#searchfield').show();
        $('#searchicon').show();
		var y=$(document).find("title").text();
		if(flag==0)
		{
		var request = $.ajax({
					type: 'POST',
					url: 'http://10.0.10.176:8092/editable/insert', 
					async: false,
					data:{ "title":y, "content":x}, 
					dataType: 'json'
			});
			}
			else{
		var request = $.ajax({
					type: 'POST',
					url: 'http://10.0.10.176:8092/editable/update', 
					async: false,
					data:{ "title":y, "content":x}, 
					dataType: 'json'
			});
    }
	}
    function hidelive(){
      $('#pad').show();
      $('#commit').show();
       $('#markdown').hide();
        $('#edit').hide();
        $('#searchfield').hide();
        $('#searchicon').hide(); 
    }
    function search() {
    	  var mark = function() {
    	    // Read the keyword
    	    var keyword = $("input[name='keyword']").val();

    	    // Determine selected options
    	    var options = {};
    	    $("input[name='opt[]']").each(function() {
    	      options[$(this).val()] = $(this).is(":checked");
    	    });

    	    // Remove previous marked elements and mark
    	    // the new keyword inside the context
    	    $("#markdown").unmark({
    	      done: function() {
    	        $("#markdown").mark(keyword, options);
    	      }
    	    });
    	  };

    	  $("input[name='keyword']").on("input", mark);
    	};
	