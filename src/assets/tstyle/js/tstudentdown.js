$(function() {
			
    //检查学生是否提交了免答辩申请,没有则隐藏下载免答辩按钮
    if(true){
        $('.mdb_btn').addClass('am-disabled');
        $.get('/graduation/teacherController/getStudentByTeacherId2',function(data){
            $(data).each(function(index,value){
                var td1=$('<td>').addClass('am-text-middle').text((index+1));
                var td2=$('<td>').addClass('am-text-middle').append($('<span>').text(value.user.userName));
                var td3=$('<td>').addClass('am-text-middle').append($('<span>').text(value.classInfo.subject.subjectName));
                var td4=$('<td>').addClass('am-text-middle').append($('<span>').text(value.classInfo.grade.gradeName));
                var td5=$('<td>').addClass('am-text-middle').append($('<span>').text(value.classInfo.className));
                var td6=$('<td>').addClass('am-text-middle').append($('<span>').text(value.user.userTel));
                if(value.ktbg==null){
                 var ktbgBtn=$('<button>').attr('disabled','disabled').addClass('am-btn am-btn-primary am-btn-sm ktbg_btn').text('下载').append($('<i>').addClass('am-icon-cloud-download'));
                 var td7=$('<td>').addClass('am-text-middle').append(ktbgBtn);
                }else{
                    var ktbgBtn=$('<button>').addClass('am-btn am-btn-primary am-btn-sm ktbg_btn').text('下载').append($('<i>').addClass('am-icon-cloud-download'));
                 var td7=$('<td>').addClass('am-text-middle').append(ktbgBtn);
                }
                if(value.zqjc==null){
                    var ZqjcBtn=$('<button>').attr('disabled','disabled').addClass('am-btn am-btn-primary am-btn-sm zqjc_btn').text('下载').append($('<i>').addClass('am-icon-cloud-download'));
                    var td8=$('<td>').addClass('am-text-middle').append(ZqjcBtn);
                }else{
                 var ZqjcBtn=$('<button>').addClass('am-btn am-btn-primary am-btn-sm zqjc_btn').text('下载').append($('<i>').addClass('am-icon-cloud-download'));
                 var td8=$('<td>').addClass('am-text-middle').append(ZqjcBtn);
                }
                if(value.mdb==null){
                    var MdbBtn=$('<button>').attr('disabled','disabled').addClass('am-btn am-btn-primary am-btn-sm mdb_btn').text('下载').append($('<i>').addClass('am-icon-cloud-download'));
                    var td9=$('<td>').addClass('am-text-middle').append(MdbBtn);
                }else{
                 var MdbBtn=$('<button>').addClass('am-btn am-btn-primary am-btn-sm mdb_btn').text('下载').append($('<i>').addClass('am-icon-cloud-download'));
                 var td9=$('<td>').addClass('am-text-middle').append(MdbBtn);
                }
                if(value.lunwen==null){
                    var LunwenBtn=$('<button>').attr('disabled','disabled').addClass('am-btn am-btn-primary am-btn-sm lunwen_btn').text('下载').append($('<i>').addClass('am-icon-cloud-download'));
                    var td10=$('<td>').addClass('am-text-middle').append(LunwenBtn);
                }else{
                 var LunwenBtn=$('<button>').addClass('am-btn am-btn-primary am-btn-sm lunwen_btn').text('下载').append($('<i>').addClass('am-icon-cloud-download'));
                 var td10=$('<td>').addClass('am-text-middle').append(LunwenBtn);
                }
                var tr=$('<tr>').append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7).append(td8).append(td9).append(td10);
                tr.append($('<input>').attr({'type':'hidden','name':'studentId'}).val(value.studentId));
                $('#studownbody').append(tr);
                //绑定事件
               $('.ktbg_btn').click(function(){
                     var studentId=$(this).parent().parent().find('input:hidden[name=studentId]').val();
                     window.location.href ='/graduation/studentController/downKtbg?studentId='+studentId;
               });
               $('.zqjc_btn').click(function(){
                     var studentId=$(this).parent().parent().find('input:hidden[name=studentId]').val();
                     window.location.href ='/graduation/studentController/downZqjc?studentId='+studentId;
               });
               $('.lunwen_btn').click(function(){
                     var studentId=$(this).parent().parent().find('input:hidden[name=studentId]').val();
                     window.location.href ='/graduation/lunwenController/downloadResource?studentId='+studentId;
               });
               $('.mdb_btn').click(function(){
                     var studentId=$(this).parent().parent().find('input:hidden[name=studentId]').val();
                     window.location.href ='/graduation/studentController/downMdb?studentId='+studentId;
               });
            });
        });
    }

});