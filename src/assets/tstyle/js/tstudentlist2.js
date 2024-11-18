$(function() {
			
    $.get('/graduation/teacherController/getStudentByTeacherId',function(data){
        $(data).each(function(index,value){
            var td1=$('<td>').text(index+1);
            var td2=$('<td>').text(value.project.projectName);
            var td3=$('<td>').text(value.user.userName);
            var td4=$('<td>').text(value.classInfo.className);
            var td5=$('<td>').text(value.user.userTel);
                var studentScore = value.studentScore;
                var pinfen_btn=$('<button>').attr('type','button').addClass('am-btn am-btn-primary am-btn-block').text('进入评分');
            var td6=$('<td>').append(pinfen_btn);
                td6.find('button').click(function() {
                    var url='/graduation/studentController/gotoTstudentscore?studentId='+value.studentId;
                    var form=$('<form>').attr({'action':url,'method':'post'});
                    $('body').append(form);
                    form.submit();
                });
            var tr=$('<tr>').append(td1).append(td2).append(td3).append(td4).append(td5).append(td6);
            $('#slist').append(tr);
        });
    });

});