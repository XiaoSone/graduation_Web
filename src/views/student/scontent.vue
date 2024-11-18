<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
      <div id="ref_page">
      <div class="tpl-content-page-title" style="margin-bottom: 10px;">
          内容概要</div>
      <ol class="am-breadcrumb">
          <li><router-link to="/scontent" class="am-icon-home">首页</router-link></li>
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
                      <div class="number" id="number"></div>
                      <div class="desc">剩余课题数</div>
                  </div>
              </div>
          </div>
          <div class="am-u-lg-4 am-u-md-12 am-u-sm-12" style="float: left;">
              <div class="dashboard-stat red">
                  <div class="visual">
                      <i class="am-icon-check"></i>
                  </div>
                  <div class="details">
                      <div class="number" id="num2" style="font-size: 25px;">未选题</div>
                      <div class="desc">选题状态</div>
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
                          学生在选择课题阶段，只能选择一位导师的一个课题。所以请尽早与导师联系，导师审核同意才会被选上</li>
                      <li><i class="am-icon-pencil am-icon-exclamation-circle"></i>
                          如果选择某导师的课题未被通过或已经被他人选择，请尽快选择其他课题，注意及时关注个人选题状态</li>
                      <li><i class="am-icon-pencil am-icon-exclamation-circle"></i>
                          请按时填写开题报告，中期检查反馈表，系统验收表和上传论文</li>
                      <li><i class="am-icon-pencil am-icon-exclamation-circle"></i>
                          所有的修改项，如果已经被审核则不再允许修改</li>
                      <li><i class="am-icon-pencil am-icon-exclamation-circle"></i>
                          使用原始密码登录的同学，请尽快更改密码</li>
                  </ul>
          </div>
      </div>
  </div>
    </div>
  </template>

<script>
import axios from 'axios';
export default {
  data() {

  },
  methods: {
    // 获取项目数量
    getProjectCount() {
      axios.get('/projectController/getCountProjectNum').then(response => {
        if (response.data !== null) {
          document.getElementById('number').textContent = response.data;
        }
        }).catch(error => {
          console.error('Error fetching project count:', error);
        });
    },

    // 阶段时间
    getWorkTime() {
      const date = new Date();
      const thisDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      axios.get('/workTimeController/getWorkTime', {
        params: { date:thisDate }
      }).then(response => {
          if (response.data !== null) {
            document.getElementById('workTime').textContent = response.data.workTimeInfo;
          }
        }).catch(error => {
          console.error('Error fetching work time:', error);
        });
    },

    // 获取学生信息
    getStudentInfo() {
      axios.get('/studentController/findStudent').then(response => {
          const data = response.data;
          if (data.teacherId != null) {
            document.getElementById('num2').textContent = '等待老师确认';
          }
          if (data.projectId != null) {
            document.getElementById('num2').textContent = '选题成功';
          }
        })
        .catch(error => {
          console.error('Error fetching student info:', error);
        });
    },
  },
  created() {
    // 获取数据
    this.getProjectCount();
    this.getWorkTime();
    this.getStudentInfo();
  }
};

</script>

<style>
@import url("../../assets/sstyle/css/app.css");
@import url("../../assets/sstyle/css/admin.css");
</style>