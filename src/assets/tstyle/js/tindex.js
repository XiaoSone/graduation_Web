$(function() {
			
    //得到用户信息
    getUserInfo();
    function getUserInfo(){
         $.get('/graduation/teacherController/findTeacher',function(data){
            if(data.user==null){
                var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
                //判断是否Firefox浏览器
                if (userAgent.indexOf("Firefox") > -1) {
                    window.open('../login.html'); 
                 }else{
                    window.location.href='../login.html';
                 }
            }
            $('#userName').val(data.user.userName);
            $('#loginName').text(data.user.userName);
            if(isNull(data.user.userPortrait)){
                $('#userPortrait').attr('src','../img/user01.png');
            }else{
                $('#userPortrait').attr('src',data.user.userPortrait);
            }
            $('#describe').val(data.teacherDescribe);
            $('#account').val(data.user.userAccount);
            $('#tel').val(data.user.userTel);
            $('input[name=radio11]').each(function(index,value){
                if($(value).val()==data.user.userGender){
                    $(this).attr('checked','checked');
                }
            });
            $('#updateInfo_btn').append($('<input>').attr({'type':'hidden','name':'teacherId'}).val(data.teacherId));
            $('#updateInfo_btn').append($('<input>').attr({'type':'hidden','name':'userId'}).val(data.userId));
        }); 
    }
    
    $('#userInfo_a').click(function(){
            $('#userInfo-modal').modal('open');
    });
    
    //修改用户信息
    $('#updateInfo_btn').click(function(){
        
        var formData = new FormData();
         formData.append("portrait",$("#portrait")[0].files[0]);
        formData.append("teacherId",$('input[name=teacherId]').val());
        formData.append("user.userName",$('#userName').val());
        formData.append("user.userId",$('input[name=userId]').val());
        formData.append("teacherDescribe",$('#describe').val());
        formData.append("user.userTel",$('#tel').val());
        formData.append("user.userGender",$('input[name=radio11]:checked').val());
        $.ajax({ 
            url : '/graduation/teacherController/updateTeacherInfo', 
            type : 'post', 
            data : formData, 
            // 告诉jQuery不要去处理发送的数据
            processData : false, 
            // 告诉jQuery不要去设置Content-Type请求头
            contentType : false,
            beforeSend:function(){
                var portraitFile =$("#portrait")[0].files[0];
                if(portraitFile!=null){
                    if((portraitFile.size/1024/1024)>10){
                        $('#updateInfo_btn').text('图片过大');
                        setTimeout(function(){
                                $('#updateInfo_btn').text('修改');
                            },'3000');
                        return false;
                    }
                }
            },
            success : function(responseStr) { 
                if(responseStr){
                    $('#userInfo-modal').modal('close');
                    getUserInfo();
                }else{
                    $('#updateInfo_btn').text('失败');
                    setTimeout(function(){
                            $('#updateInfo_btn').text('再次修改');
                        },'3000');
                }
            }, 
            error : function(responseStr) { 
                $('#updateInfo_btn').text('失败');
                setTimeout(function(){
                        $('#updateInfo_btn').text('再次修改');
                    },'3000');
            } 
        });
        return false;
    });
    
    var bool=false;
    $('#password').blur(function(){
        
        var password=$('#password').val();
        if(isNull(password)){
            return false;
        }
        
        $.post('/graduation/userController/ispassword',{
            password:password
        },function(data){
            if(data){
                $('#password_label').css('color','#5eb95e');
                $('#password').css('border-color','#5eb95e');
                bool=true;
            }else{
                $('#password_label').css('color','#dd514c');
                $('#password').css('border-color','#dd514c');
                bool=false;
            }
        });
    });
    
    var bool2=false;
    $('#newPassword2').blur(function(){
        var newPassword=$('#newPassword').val();
        var newPassword2=$('#newPassword2').val();
        
        if(isNull(newPassword)||isNull(newPassword2)){
            return false;
        }
        
        if(newPassword===newPassword2){
            $('#newPassword2_label').css('color','#5eb95e');
            $('#newPassword2').css('border-color','#5eb95e');
            bool2=true;
        }else{
            $('#newPassword2_label').css('color','#dd514c');
            $('#newPassword2').css('border-color','#dd514c');
            bool2=false;
        }
    });
    
    //修改密码
    $('#update_password').click(function(){
        $('#password-modal').modal('open');
    });
    $('#updatePassword_btn').click(function(){
        var password=$('#password').val();
        var newPassword=$('#newPassword').val();
        var newPassword2=$('#newPassword2').val();
        
        if(password===newPassword2){
            return false;
        }
        
        if(isNull(newPassword)||isNull(newPassword2)){
            return false;
        }
        if(bool&&bool2){
            $.post('/graduation/userController/updatePwd',{
                '_method':'put',
                'userId':$('input[name=userId]').val(),
                'userPassword':newPassword
            },function(data){
                if(data){
                    $('#password-modal').modal('close');
                    window.location.href='http://localhost:8080/';
                }
            });
        }
        return false;
    });
    
    
    //网页刷新回到首页
    $(window).on('unload',function(){
        window.location.href='http://localhost:8080/';
    });
    
      $('#iframepage').on('load',function(){
          //"ref_page"为引用页面DIV的ID，获取DIV的外部宽度、外部高度。
          var height = $(this).contents().find('#ref_page').outerHeight();
          // 设置iframe的宽度、高度。
          if(height<100){
              height=850;
          }else{
              height+=30;
          }
          $(this).height(height); 
    });   
    
    //知道点击的是那个选项
    $('.link_a').click(function() {
        $('.link_a').each(function() {
            $(this).removeClass('active');
        });
        $(this).addClass('active');
    });
    
    //左侧选项收缩与展开
     $('.left-nav-link').click(function() {
         $('.tpl-left-nav-sub-menu').each(function() {
            $(this).css('display','none');
        });
         $(this).parent().children('ul').css('display','block');
         $('.tpl-left-nav-sub-menu').each(function() {
             if($(this).css('display')=='block'){
                 $(this).parent().children('a').children('i').eq(1).addClass('tpl-left-nav-more-ico-rotate');
             }else{
                 $(this).parent().children('a').children('i').eq(1).removeClass('tpl-left-nav-more-ico-rotate');
             }
        });
    }); 
    
});