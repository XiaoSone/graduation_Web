<template>
    <div>
        <div id="ref_page" class="am-g">
            <div class="tpl-content-page-title" style="margin-bottom: 10px">下载表格</div>
            <div class="am-panel am-panel-default">
                <div class="am-panel-bd">
                    <table class="am-table am-table-bordered am-table-radius am-table-compact am-table-centered">
                        <tr>
                            <td>开题报告表</td>
                            <td>
                                <button @click="downloadKtbg" :disabled="isDownloadDisabled" class="am-btn am-btn-primary am-btn-sm">
                                    下载
                                    <i class="am-icon-cloud-download"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>中期检查反馈表</td>
                            <td>
                                <button @click="downloadZqjc" :disabled="isDownloadDisabled" class="am-btn am-btn-primary am-btn-sm">
                                    下载
                                    <i class="am-icon-cloud-download"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>免答辩申请表</td>
                            <td>
                                <button @click="downloadMdb" :disabled="isDownloadDisabled" class="am-btn am-btn-primary am-btn-sm">
                                    下载
                                    <i class="am-icon-cloud-download"></i>
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import ref from "vue";
export default {
    data() {
        return {
            isDownloadDisabled: ref(true), // 控制按钮是否禁用
        };
    },
    methods: {
        // 下载开题报告表
        async downloadKtbg() {
            try {
                const response = await axios.get("/studentController/downKtbg", { responseType: "blob" });
                this.handleFileDownload(response, "开题报告表.doc");
            } catch (error) {
                console.error("下载开题报告表失败:", error);
            }
        },
        // 下载中期检查反馈表
        async downloadZqjc() {
            try {
                const response = await axios.get("/studentController/downZqjc", { responseType: "blob" });
                this.handleFileDownload(response, "中期检查反馈表.doc");
            } catch (error) {
                console.error("下载中期检查反馈表失败:", error);
            }
        },
        // 下载免答辩申请表
        async downloadMdb() {
            try {
                const response = await axios.get("/studentController/downMdb", { responseType: "blob" });
                this.handleFileDownload(response, "免答辩申请表.doc");
            } catch (error) {
                console.error("下载免答辩申请表失败:", error);
            }
        },
        // 处理文件下载
        handleFileDownload(response, fileName) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        // 获取学生选择的项目
        async checkStudentStatus() {
            try {
                const response = await axios.get("/studentController/hasChooseProject");
                if (response.data && response.data.studentId) {
                    this.isDownloadDisabled.value = false;
                }
            } catch (error) {
                console.error("获取学生状态失败:", error);
            }
        },
    },
    created() {
        this.checkStudentStatus();
    },
};
</script>

<style>
@import url("../../assets/sstyle/css/app.css");
@import url("../../assets/sstyle/css/admin.css");
</style>
