<template>
  <div>
    <div id="ref_page" class="am-g">
      <div class="tpl-content-page-title" style="margin-bottom: 10px;">免答辩申请结果</div>
      <div class="am-panel am-panel-default">
        <div class="am-panel-bd">
          <blockquote>
            <p :class="mdbResultClass">{{ mdbResultText }}</p>
          </blockquote>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      mdbResultText: '',
      mdbResultClass: '',
    };
  },
  created() {
    this.getMdbResult();
  },
  methods: {
    async getMdbResult() {
      try {
        const response = await axios.get('/mdbController/getMdbByStudentId');
        const data = response.data;

        if (!data || data.mdbId === null) {
          this.mdbResultText = '未填写免答辩申请';
          this.mdbResultClass = 'am-text-xl';
        } else {
          this.mdbResultText = data.mdbStatus === 1 ? '允许免答辩' : '不允许免答辩';
          this.mdbResultClass = data.mdbStatus === 1 ? 'am-text-success' : 'am-text-danger';
        }
      } catch (error) {
        console.error('Error fetching MDB result:', error);
        this.mdbResultText = '加载数据时出错，请稍后重试。';
        this.mdbResultClass = 'am-text-danger';
      }
    },
  },
};
</script>

<style>
@import url("../../assets/sstyle/css/app.css");
@import url("../../assets/sstyle/css/admin.css");
</style>
