$(function(){
    document.addEventListener("deviceready", onDeviceReady, false);
    $(document).ready(function(){
        updateList();
    })

    $('.button-collapse').sideNav();

    $('.side-nav a').click(function(){
        $('.spa').hide();
        $('#' + $(this).data('show')).show();
        $('.button-collapse').sideNav('hide');
    });

    $('#saveItem').click(function(){
        $.ajax({
            type: "GET",
            url:'http://r0761272.sinners.be/Item.php?f=getitems',
            dataType: "JSON",
            success:function(json){
                for(var i=0;i<json.length;i++){
                    if (json[i].id == $("#Itemid")) {
                        SavedItems.SaveItem(json[i]);
                    }
                }
            }
        })
    })

    $("#addItem").click(function(){
        var naam=$("#txtNaam").val();
        var image = $("#smallImage").src;
        var longitude = $("#txtlongitude").val();
        var latitude = $("#txtlatitude").val();
        $("#ItemList").empty();

        $.post("http://r0761272.sinners.be/Item.php?f=additem", {name:naam,image:image,longitude:longitude, latitude:latitude},function(){
            updateList();
            $('.spa').hide();
            $('#tabItemLijst').show();
            $('.button-collapse').sideNav('hide');
        });
    })



    function updateList(){
        $.ajax({
            type: "GET",
            url:'http://r0761272.sinners.be/Item.php?f=getitems',
            dataType: "JSON",
            success:function(json){
                var ItemData = '';
                for(var i=0;i<json.length;i++){
                    var idi =i+1;
                    ItemData += '<tr>';
                    ItemData += '<td>'+idi+'</td>';
                    ItemData += '<td><a class="Itemlink" href="#!" ItemId="'+json[i].id+'">'+json[i].naam+'</a></td>';
                    ItemData += '<td>Latitude: '+ json[i].latitude  +'°<br />' +
                    'Longitude: '+ json[i].longitude+ '°</td>';
                    ItemData += '<tr>';
                }
                $(ItemData).appendTo("#ItemList");
                $(".Itemlink").click(function(){
                    getItem($(this).attr("ItemId"));
                });
            }
        })
    }

    function getItem(id){
        $.ajax({
            type: "GET",
            url:'http://r0761272.sinners.be/Item.php?f=getitems',
            dataType: "JSON",
            success:function(json){
                for(var i=0;i<json.length;i++){
                    if (json[i].id == id) {
                    $("#itemnaam").html(json[i].naam);
                    $("#imgItem").attr('src', 'img/boek.jpg');
                    $("#Itemlocatie").html("Latitude: "+ json[i].latitude  +"°<br />" +
                            "Longitude: " + json[i].longitude+ "°");
                    $("#Itemid").val(json[i].id);

                    $('.spa').hide();
                    $('#tabItem').show();
                    $('.button-collapse').sideNav('hide');
                    }
                }
            }
        })
    }
});


function onDeviceReady() {
    console.log('Device is ready');
    console.log(navigator.camera);
    SavedItems.inits();
};


