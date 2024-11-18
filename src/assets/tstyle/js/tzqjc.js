$(function() {
		
    var studentId=getQueryString("studentId");
    
    $.ajax({
           url: "/graduation/studentController/getStudentAndZqjcBySid",
           type: 'get',
           dataType:'json',
           async:false,
           data:{
               studentId:studentId
           },
           success: function(data){
               if(!isNull(data.zqjc)){
                $('#tr1').find('td').eq(3).text(data.classInfo.subject.subjectName);
                $('#tr1').find('td').eq(5).text(data.classInfo.grade.gradeName);
                $('#tr2').find('td').eq(1).text(data.project.projectName);
                $('#tr3').find('td').eq(1).text(data.user.userAccount);
                $('#tr3').find('td').eq(3).text(data.user.userName);
                $('#tr4').find('td').eq(1).text(data.teacher.user.userName);
                $('#tr4').find('td').eq(3).text(data.teacher.zhicheng);
                $('#column1').text(data.zqjc.column1);
                $('#column2').text(data.zqjc.column2);
                if(!isNull(data.zqjc.column3)&&!isNull(data.zqjc.column4)){
                     $('#column3').text(data.zqjc.column3);
                     $('#column4').text(data.zqjc.column4);
                     $('#zqjc_btn').text('更新');
                   }
                $('#zqjc_btn').append($('<input>').attr('type','hidden').val(data.zqjc.zqjcId));
               }else{
                   $('#column3').attr('disabled','disabled');
                   $('#column4').attr('disabled','disabled');
                   $('#zqjc_btn').attr('disabled','disabled').text('该学生没有填写中期检查');
               }
           }
         });
    
    //提交中期检查
    $('#zqjc_btn').click(function () {
          var $btn = $(this);
          var zqjcId=$btn.find('input:hidden').val();
          if(isNull(zqjcId)){
              return;
          }
          $.post('/graduation/zqjcController/updateByPrimaryKeySelective',{
              '_method':'put',
              zqjcId:zqjcId,
              column3:$('#column3').val(),
              column4:$('#column4').val(),
          },function(data){
              if(data){
                  $btn.button('loading');
                    setTimeout(function(){
                        disableBtn('zqjc_btn','完成');
                  }, 3000);
              }
          });
    });
    
});