var Item = function () {

    function LoadAllItems(){
        if(connection){
            $.ajax({
                type: "GET",
                url: "http://r0761272.sinners.be/php/Item.php?f=getitems",
                success: function(result){

                }
            })
        }
    }

    function SaveItem(){
        if(connection){
            $.ajax({
                type: "POST",
                data: $("ItemForm :input").serializeArray(),
                url: "http://r0761272.sinners.be/public_html/item.php?f=additem",
                success: function(result){

                }
            })
        }
    }

}();