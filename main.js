var url = "https://awiclass.monoame.com/api/command.php?type=get&name=itemdata";
var data;

$.ajax(
  {
    url: url,
    success: function(res){
      data = JSON.parse(res);
      shoplist.items = data;
      show_list();
    }
  }
);

var shoplist={};

shoplist.name = "My BuyList 購物清單";
shoplist.time = "2018/05/28";
shoplist.items = [
  {name: "吹風機",price: 300},
  {name: "麥克筆",price: 9000},
  {name: "筆記型電腦",price: 54555},
  {name: "IPhone",price: 32000},
  {name: "海螺",price: 5000},
];

var item_html = "<li id={{id}} class='buy_item'>{{num}}. {{itemname}}<div class='price'>{{price}}</div><div id={{del_id}} data_del_id='{{delid}}' class='delbtn'>X</div></li>";

var total_html = "<li class='buy_item total'>總價<div class='price'>{{price}}</div></li>";

function show_list(){
  $("#items_list").html("");
  var total_price = 0;
  for(var i = 0; i < shoplist.items.length; i++){
    var item = shoplist.items[i];
    total_price += parseInt(item.price);
    var current_item_html = 
        item_html.replace("{{num}}", i+1)
                 .replace("{{itemname}}", item.name)
                 .replace("{{id}}", "buyitem_" + i)
                 .replace("{{price}}", "$" + item.price)
                 .replace("{{del_id}}","del_item_id_" + i)
                 .replace("{{delid}}", i)
    ;
    $("#items_list").append(current_item_html);
  
  $("#del_item_id_" + i).click(
    function(){
    remove_item($(this).attr("data_del_id"));
  });
  }
  
  var current_total = total_html.replace("{{price}}","$" + total_price);
  $("#items_list").append(current_total);
}

show_list();

$(".addbtn").click(
  function(){
    shoplist.items.push(
      {
        name: $("#input_name").val(),
        price: $("#input_price").val()
      }
    );
    $("#input_name").val("");
    $("#input_price").val("");
    show_list();
  }
);

function remove_item(id){
  shoplist.items.splice(id, 1);
  show_list();
}