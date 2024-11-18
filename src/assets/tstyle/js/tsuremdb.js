$(function() {
		
    var studentId=getQueryString("studentId");
    
     $.get('/graduation/studentController/getStudentAndMdbBySid?studentId='+studentId,function(data){
             $('#tr1').find('td').eq(1).text(data.user.userAccount);
            $('#tr1').find('td').eq(3).text(data.user.userName);
            $('#tr1').find('td').eq(5).text(data.user.userGender==1?'男':'女');
            $('#tr2').find('td').eq(1).text(data.classInfo.subject.subjectName);
            $('#tr2').find('td').eq(3).text(data.classInfo.grade.gradeName);
            $('#tr2').find('td').eq(5).text(data.classInfo.className);
            $('#tr3').find('td').eq(3).text(data.user.userTel);
            $('#tr4').find('td').eq(1).text(data.project.projectName);
            $('#tr4').find('td').eq(3).text(data.teacher.user.userName);
            $('#column1').text(data.mdb.column1);
            if(!isNull(data.mdb.column2)){
                $('#column2').attr('disabled','disabled').text(data.mdb.column2);
                $('#mdb_btn').attr('disabled','disabled').text('已提交审核意见');
                return;
            }
            $('#mdb_btn').append($('<input>').attr('type','hidden').val(data.mdb.mdbId));
    }); 
    
    //提交免答辩
    $('#mdb_btn').click(function () {
          var $btn = $(this);
          var column2=$('#column2').val();
          if(isNull(column2)){
              return;
          }
          $.post('/graduation/mdbController/updateColumnById',{
              '_method':'put',
              mdbId:$('#mdb_btn').find('input:hidden').val(),
              column2:column2
          },function(data){
              if(data){
                  $btn.button('loading');
                    setTimeout(function(){
                        disableBtn('mdb_btn','提交完成');
                  }, 3000);
              }
          });
            
    });

});