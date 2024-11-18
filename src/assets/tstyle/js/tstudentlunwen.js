$(function() {
		
    var studentId=getQueryString("studentId");
    
    //查询数据库是否应该禁用提交按钮
    $.get('/graduation/lunwenController/getLunwenBySid',{
        studentId:studentId
    },function(data){
        if(isNull(data.lunwenId)){
            $('#lunwen_btn').attr('disabled','disabled').text('该学生没有提交论文');
            return;
        }
        if(data.lunwenStatus!=null){
            $('#lunwen_btn').text('更新'+'(上次审核结果为: '+(data.lunwenStatus==1?'审核评分':'退回修改')+')');
        }
        $('#lunwen_btn').append($('<input>').attr('type','hidden').val(data.lunwenId));
    });
    
    //点击提交评审论文按钮
     $('#lunwen_btn').click(function () {
          var $btn = $(this);
          var status=$('input[name=radio10]:checked').val();
          if(isNull(status)){
              return;
          }
         $.post('/graduation/lunwenController/upLunwenBySid',{
              '_method':'put',
              lunwenId:$('#lunwen_btn').find('input:hidden').val(),
              lunwenStatus:status
          },function(data){
              if(data){
                  $btn.button('loading');
                    setTimeout(function(){
                        disableBtn('lunwen_btn','提交完成');
                  }, 3000);
              }
          });
        });
    
});