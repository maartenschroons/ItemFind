var SavedItems = function () {
    var _items = ["Dummy taak"];
    var _setLocalStorage = function() {
        localStorage.setItem('item', JSON.stringify(_items));  // localStorage.setItem('key', 'value')
        _itemList();
    }
    var _itemList = function() {
        $("#SavedListTabel").empty();
        var ItemData = '';
        for(var i=0;i<_items.length;i++){
            ItemData += '<tr>';
            ItemData += '<td>'+i+'</td>';
            ItemData += '<td><a class="Itemlink" href="#!" ItemId="'+_items[i].id+'">'+_items[i].naam+'</a></td>';
            ItemData += '<td>'+_items[i].locatie+'</td>';
            ItemData += '<tr>';
        }
        $(ItemData).appendTo("#SavedListTabel");
        $(".Itemlink").click(function(){
            getItem($(this).attr("ItemId"));
        });
    }

    var inits = function(){
        _items = [];
        var items_str = localStorage.getItem('item');
        if (items_str !== null) {
            _items = JSON.parse(items_str);
        }
        _itemList();
    }

    var SaveItem = function(item){
        _items.push(item);
        _setLocalStorage();
    };

    return {
        inits: inits,
        SaveItem: SaveItem,
    };
}