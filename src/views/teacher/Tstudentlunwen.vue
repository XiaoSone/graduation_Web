<template>
  <div>
    <div id="ref_page" class="am-g">
      <div class="tpl-content-page-title" style="margin-bottom: 10px;">审核论文</div>
      <ol class="am-breadcrumb">
        
        <li><router-link to="/tstudentlist" class="am-icon-users">学生列表</router-link></li>
        <li class="am-active">论文</li>
      </ol>
      <div class="am-panel am-panel-default">
        <div class="am-form-group" style="margin: 20px;">
          <h3>审核意见</h3>
          <label class="am-radio-inline">
            <input type="radio" name="radio10" value="0" v-model="status">退回修改
          </label>
          <label class="am-radio-inline">
            <input type="radio" name="radio10" value="1" v-model="status">审核评分
          </label>
          <button 
            :disabled="isDisabled" 
            @click="submitReview" 
            :class="['am-btn', 'am-btn-primary', 'am-radius']" 
            style="margin-left: 5px;">
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import '@/assets/amazeui/js/amazeui.min.js';
export default {
  data() {
    return {
      studentId: this.getQueryString('studentId'),  // 从 URL 获取学生 ID
      lunwenId: null,  // 论文 ID
      lunwenStatus: null,  // 论文状态
      status: null,  // 审核状态（0 或 1）
      isDisabled: false,  // 是否禁用按钮
      buttonText: '提交',  // 按钮文本
    };
  },
  mounted() {
    this.fetchLunwenData();
  },
  methods: {
    // 获取 URL 参数 (studentId)
    getQueryString(name) {
        const url = window.location.href;
        const regex = new RegExp("[?&]" + name + "=([^&]*)", "i");
        const result = regex.exec(url);
        return result ? decodeURIComponent(result[1]) : null;
      },
    
    // 获取论文数据
    fetchLunwenData() {
      axios.get('/lunwenController/getLunwenBySid', {
        params: { studentId: this.studentId },
      })
      .then(response => {
        const data = response.data;
        if (!data.lunwenId) {
          this.isDisabled = true;
          this.buttonText = '该学生没有提交论文';
        } else {
          this.lunwenId = data.lunwenId;
          this.lunwenStatus = data.lunwenStatus;
          if (this.lunwenStatus !== null) {
            this.buttonText = `更新 (上次审核结果为: ${this.lunwenStatus === 1 ? '审核评分' : '退回修改'})`;
          }
        }
      })
      .catch(error => {
        console.error('Error fetching Lunwen data:', error);
      });
    },
    
    // 提交审核
    submitReview() {
      if (this.status === null) {
        return;
      }
      
      const payload = {
        lunwenId: this.lunwenId,
        lunwenStatus: this.status,
      };
      
      axios.post('/lunwenController/upLunwenBySid', payload)
        .then(response => {
          if (response.data) {
            this.isDisabled = true;
            this.buttonText = '提交完成';
            setTimeout(() => {
              this.buttonText = '提交';
              this.isDisabled = false;
            }, 1000);
          }
        })
        .catch(error => {
          console.error('Error submitting Lunwen review:', error);
        });
    }
  }
};
</script>

<style>
@import url("../../assets/amazeui/css/amazeui.min.css");
@import url("../../assets/tstyle/css/admin.css");
@import url("../../assets/tstyle/css/app.css");
</style>