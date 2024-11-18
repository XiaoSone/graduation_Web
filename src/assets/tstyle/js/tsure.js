$(function() {
			
    $.ajax({
          url: "/graduation/teacherController/findTeacherAndProject",
          type:'get',
          async:false,
          success: function(data){
              for(var i=0;i<data.projectList.length;i++){
                  var student=data.projectList[i].student;
                  var student_id;
                  if(student!=null){
                      var td1=$('<td>').addClass('am-text-middle').text((i+1));
                      var td2=$('<td>').addClass('am-text-middle').text(data.projectList[i].projectName);
                      var td3=$('<td>').addClass('am-text-middle').text(student.user.userName);
                      var td4=$('<td>').addClass('am-text-middle').text(student.classInfo.className);
                      var td5=$('<td>').addClass('am-text-middle').text(student.user.userTel);
                      student_id=student.studentId;
                      var btn1=$('<button>').attr('type','button').addClass('am-btn am-btn-default am-btn-xs am-text-secondary yes_btn').append($('<span>').addClass('am-icon-check')).append($('<span>').text(' 确定'));
                      var btn2=$('<button>').attr('type','button').addClass('am-btn am-btn-default am-btn-xs am-text-danger no_btn').append($('<span>').addClass('am-icon-times')).append($('<span>').text(' 取消'));
                      var td6=$('<td>').addClass('am-text-middle').append($('<div>').addClass('am-btn-toolbar')
                                          .append($('<div>').addClass('am-btn-group am-btn-group-xs').css('float','right').append(btn1).append(btn2)));
                      if(student_id!=null&&student_id!=''){
                          td6.append($('<input>').addClass('studentId').attr('type','hidden').val(student_id));
                          student_id='';
                      }
                      td6.append($('<input>').addClass('teacherId').attr('type','hidden').val(data.teacherId));
                      td6.append($('<input>').addClass('projectId').attr('type','hidden').val(data.projectList[i].projectId));
                      var tr=$('<tr>').append(td1).append(td2).append(td3).append(td4).append(td5).append(td6);
                      $('#tsureBody').append(tr);
                  }
              }
          }
        });
    
    //确定按钮
    $('.yes_btn').click(function(){
          var btn=$(this);
          var sId=btn.parent().parent().parent().find('.studentId').val();
          if(sId==null||sId==''){
              return;
          }
         $.post('/graduation/studentController/updateProjectNum',{
             "_method":'put',
             studentId:sId,
             projectId:btn.parent().parent().parent().find('.projectId').val(),
             teacherId:btn.parent().parent().parent().find('.teacherId').val()
         },function(data){
             if(data){
                 btn.parent().empty();
             }
         });
      });
    
    //取消按钮
      $('.no_btn').click(function(){
          var btn=$(this);
          var sId=btn.parent().parent().parent().find('.studentId').val();
          if(sId==null||sId==''){
              return;
          }
         $.post('/graduation/studentController/updateNoProjectNum',{
             "_method":'put',
             projectId:btn.parent().parent().parent().find('.projectId').val(),
             studentId:sId
         },function(data){
             if(data){
               btn.parent().parent().parent().parent().empty();
             }
         }); 
      }); 
    
       //查询已确认学生
       var stuEle=$('.yes_btn').parent().parent().parent().find('.studentId');
       stuEle.each(function(index,value){
           $.get('/graduation/studentController/projectNum',{
               studentId:$(value).val()
           },function(data){
               if(data){
                   $(value).parent().empty();
               }
           }); 
       });
       
});