<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div id="ref_page">
    <div class="tpl-content-page-title" style="margin-bottom: 10px;">
        内容概要</div>
    <ol class="am-breadcrumb">
        <li><a href="tcontent.html" class="am-icon-home">首页</a></li>
        <li class="am-active">内容</li>
    </ol>
    <div class="row">
        <div class="am-u-lg-4 am-u-md-12 am-u-sm-12">
            <div class="dashboard-stat blue">
                <div class="am-g" style="height: 95px;">
                    <div class="visual">
                        <i class="am-icon-location-arrow"></i>
                    </div>
                    <div class="details">
                        <div class="number">当前阶段</div>
                        <div class="desc" id="workTime"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="am-u-lg-4 am-u-md-12 am-u-sm-12" style="float: left;">
            <div class="dashboard-stat green">
                <div class="visual">
                    <i class="am-icon-bar-chart-o"></i>
                </div>
                <div class="details">
                    <div class="number" id="num1"></div>
                    <div class="desc">已选课题数</div>
                </div>
            </div>
        </div>
        <div class="am-u-lg-4 am-u-md-12 am-u-sm-12" style="float: left;">
            <div class="dashboard-stat red">
                <div class="visual">
                    <i class="am-icon-users"></i>
                </div>
                <div class="details">
                    <div class="number" id="num2"></div>
                    <div class="desc">待确认人数</div>
                </div>
            </div>
        </div>
    </div>
    <div class="am-panel am-panel-default"
        style="margin: -5px 0 0 -4px;">
        <div class="am-panel-bd">
            <h2 class="tpl-content-page-title">
                相关提示 :
            </h2>
                <ul class="am-list am-list-static am-list-border">
                    <li><i class="am-icon-pencil am-icon-exclamation-circle"></i>
                        教师可以申报8个毕业论文课题，请在规定时间内完成申报</li>
                    <li><i class="am-icon-pencil am-icon-exclamation-circle"></i>
                        如需修改已申报的课题，请在申报课题阶段进行修改，注意当前所处阶段</li>
                    <li><i class="am-icon-pencil am-icon-exclamation-circle"></i>
                        学生选题后，老师需在【确认选题】处确认选择学生以完成双选，如果超时未选择，将默认该学生选择成功</li>
                    <li><i class="am-icon-pencil am-icon-exclamation-circle"></i>
                        教师可以在【流程管理】处对学生的开题报告，论文，免答辩申请给出审核意见，对学生成绩进行评定</li>
                    <li><i class="am-icon-pencil am-icon-exclamation-circle"></i>
                        使用原始密码登录的教师，请尽快更改密码</li>
                </ul>
        </div>
    </div>
</div>
  </div>
</template>

<script>
import '@/assets/amazeui/js/amazeui.min.js';
import axios from 'axios';

export default {
    methods:{
        getInfo(){
            const date=new Date();
            const thisDate=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
            // const thisDate = '2017-12-01';
            axios.get("/workTimeController/getWorkTime",{
                params: { date: thisDate }
            }).then(res => {
                console.log(res.data);
                if (res.data !== null) {
                    document.getElementById('workTime').textContent = res.data.workTimeInfo;
                }
            });

            axios.get("/projectController/thisTeacherYesProjectNum").then(res =>{
                if (res.data !== null) {
                    document.getElementById('num1').textContent = res.data;
                }
            });

            axios.get("/projectController/thisTeacherUndefinedStudentNum").then(res =>{
                if (res.data !== null) {
                    document.getElementById('num2').textContent = res.data;
                }
            });
        }
    },
    created() {
        this.getInfo();
    }
}
</script>

<style scoped>
@import "../../assets/amazeui/css/amazeui.min.css";
@import "../../assets/tstyle/css/admin.css";
@import "../../assets/tstyle/css/app.css";
</style>