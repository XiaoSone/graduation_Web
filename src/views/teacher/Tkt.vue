<template>
  <div>
    <div id="ref_page" class="am-g">
    <div class="tpl-content-page-title" style="margin-bottom: 10px;">申报课题</div>
    <div class="am-panel am-panel-default">
      <div class="am-panel-bd am-scrollable-horizontal">
        <div class="am-u-sm-12">
          <form class="am-form">
            <table class="am-table am-table-centered am-table-striped am-table-hover table-main">
              <thead>
                <tr>
                  <th>序号</th>
                  <th>课题名</th>
                  <th>课题描述</th>
                  <th>课题来源</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <!-- 动态渲染课题行 -->
                <tr v-for="(project, index) in projects" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td><input v-model="project.name" type="text" @input="onInputChange(project)" /></td>
                  <td>
                    <textarea v-model="project.description" style="height: 36.8px;" @focus="openEditor(project)"></textarea>
                  </td>
                  <td>
                    <label class="am-radio-inline">
                      <input type="radio" v-model="project.source" value="2" /> 学生拟定
                    </label>
                    <label class="am-radio-inline">
                      <input type="radio" v-model="project.source" value="1" /> 教师建议
                    </label>
                    <label class="am-radio-inline">
                      <input type="radio" v-model="project.source" value="3" /> 企业和社会征集
                    </label>
                    <label class="am-radio-inline">
                      <input type="radio" v-model="project.source" value="4" /> 科研单位提供
                    </label>
                  </td>
                  <td>
                    <div class="am-btn-toolbar">
                      <div class="am-btn-group am-btn-group-xs">
                        <button
                          type="button"
                          class="am-btn am-btn-default am-btn-xs am-text-secondary"
                          :disabled="!project.canEdit"
                          @click="editProject(index)"
                        >
                          <span class="am-icon-pencil-square-o"></span> 编辑
                        </button>
                        <button
                          type="button"
                          class="am-btn am-btn-default am-btn-xs am-text-secondary"
                          :disabled="!project.canSubmit"
                          @click="submitProject(index)"
                        >
                          <span class="am-icon-check"></span> 提交
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- 编辑课程描述模态框 -->
  <div class="am-modal am-modal-alert" tabindex="-1" id="edit-modal">
    <div class="am-modal-dialog" style="width: 750px;">
      <div class="am-modal-hd">
        课程描述
        <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
      </div>
      <div class="am-modal-bd" id="edit_model_bd" style="text-align: left;">
        <textarea v-model="editingDescription" style="height: 100px;"></textarea>
      </div>
      <div class="am-modal-footer">
        <span class="am-modal-btn" id="edit_model_btn" @click="saveDescription">确定</span>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import '@/assets/amazeui/js/amazeui.min.js';
import axios from 'axios';
import "../../assets/js/wangEditor.min.js";

export default {
  data() {
    return {
      projects: [],
      editingDescription: '',
      editingIndex: null,
      editor: null,  // wangEditor 实例
    };
  },
  mounted() {
    this.fetchProjects();
  },
  methods: {
    // 获取项目数据
    fetchProjects() {
      axios
        .get('/projectController/getProjectByTeacherId')
        .then((response) => {
          this.projects = response.data.map((item) => ({
            name: item.projectName,
            description: item.projectDescribe,
            source: item.projectFromId,
            projectId: item.projectId,
            canEdit: false,
            canSubmit: false,
          }));
        })
        .catch((error) => {
          console.error('Error fetching projects:', error);
        });
    },

    // 输入框变化时禁用或启用提交按钮
    onInputChange(project) {
      project.canSubmit = !!project.name;
    },

    // 打开编辑器
    openEditor(project) {
      this.editingDescription = project.description;
      this.editingIndex = this.projects.indexOf(project);

      const modal = document.getElementById('edit-modal');
      modal.classList.add('am-modal-active');

      if (!this.editor) {
        this.editor = new E('#edit_model_bd');
        this.editor.create();
      } else {
        this.editor.txt.html(this.editingDescription);
      }
    },

    // 保存编辑器内容
    saveDescription() {
      if (this.editingIndex !== null) {
        this.projects[this.editingIndex].description = this.editor.txt.text();
        this.editingIndex = null;

        const modal = document.getElementById('edit-modal');
        modal.classList.remove('am-modal-active');
      }
    },

    // 编辑操作
    editProject(index) {
      const project = this.projects[index];
      project.canEdit = !project.canEdit;
      project.canSubmit = false;
    },

    // 提交操作
    submitProject(index) {
      const project = this.projects[index];
      if (!project.name) return;

      axios
        .post('/projectController/insertSelective', {
          projectName: project.name,
          projectDescribe: project.description,
          projectFromId: project.source,
          projectId: project.projectId,
        })
        .then((response) => {
          project.canSubmit = false;
          project.canEdit = true;
        })
        .catch((error) => {
          console.error('Error submitting project:', error);
        });
    },
  },
};
</script>

<style>
@import url("../../assets/amazeui/css/amazeui.min.css");
@import url("../../assets/tstyle/css/admin.css");
@import url("../../assets/tstyle/css/app.css");
</style>