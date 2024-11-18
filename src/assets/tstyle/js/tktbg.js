$(function() {
		
    var studentId=getQueryString("studentId");
    $.ajax({
           url: "/graduation/studentController/getStudentAndKtbgBySid",
           type: 'get',
           dataType:'json',
           async:false,
           data:{
               studentId:studentId
           },
           success: function(data){
               if(!isNull(data.ktbg)){
                    $('#stuInfo1').find('td').eq(0).text(data.user.userName);
                    var gender;
                    if(data.user.userGender==1){
                        gender='男';
                    }else{
                        gender='女';
                    }
                    $('#stuInfo1').find('td').eq(1).text(gender);
                    $('#stuInfo1').find('td').eq(2).text(data.user.userAccount);
                    $('#stuInfo1').find('td').eq(3).text(data.classInfo.subject.subjectName);
                    $('#stuInfo1').find('td').eq(4).text(data.classInfo.grade.gradeName);
                    $('#projectName').text(data.project.projectName);
                    $('#projectFrom').text(data.project.projectFrom.projectFromName);
                    $('#column1').text(data.ktbg.column1);
                    $('#column2').text(data.ktbg.column2);
                    $('#ktbg_btn').append($('<input>').attr('type','hidden').val(data.ktbg.ktbgId));
               }else{
                   $('#ktbg_btn').attr('disabled','disabled').text('该学生没有填写开题报告');
               }
           }
         });
    
    //查询数据库是否应该禁用提交按钮
    var ktbg_btn=$('#ktbg_btn').find('input:hidden').val();
    if(!isNull(ktbg_btn)){
        $.ajax({
           url: "/graduation/ktbgController/getKtbgStatus",
           type: 'get',
           dataType:'json',
           async:false,
           data:{
               ktbgId:$('#ktbg_btn').find('input:hidden').val()
           },
           success: function(data){
              if(data.ktbgStatus!=null){
                  $('#ktbg_btn').text('更新'+'(上次审核结果为: '+(data.ktbgStatus==1?'是':'否')+')');
                  $('#ktbg_btn').append($('<input>').attr('type','hidden').val(data.ktbgId));
              }
           }
     });
    }
    
    //点击提交开题报告按钮
    $('#ktbg_btn').click(function () {
          var $btn = $(this);
          var status=$('#ktbg_select option:selected').val();
          if(isNull(status)){
              return;
          }
          $.post('/graduation/ktbgController/updateByPrimaryKeySelective',{
              ktbgId:$('#ktbg_btn').find('input:hidden').val(),
              ktbgStatus:status
          },function(data){
              if(data){
                  $btn.button('loading');
                    setTimeout(function(){
                        disableBtn('ktbg_btn','提交完成');
                  }, 3000);
              }
          });
            
        });
    
});