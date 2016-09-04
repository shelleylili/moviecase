/**
 * Created by Administrator on 16-9-2.
    根据movie的id删除一条数据
 */
$(function(){
  $(".del").click(function(e){
      var target=$(e.target);
      var id=target.data("id");
      var tr=$(".item-id-"+id);

      $.ajax({
          type:"DELETE",
          url:"/admin/list?id="+id
      }).done(function(result){
              if(result.success===1){
                  if(tr.length>0){
                      tr.remove();
                  }
              }
          tr.remove();
      }).fail(function(e){
          console.log(e.message);
      });
  });
});