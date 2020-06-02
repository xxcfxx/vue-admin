<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-row :gutter="16">
        <el-col :span="4">
          <div class="label-wrap categpry">
            <label>分类:</label>
            <div class="wrap-content">
              <el-select v-model="categoryValue" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in category.item"
                  :key="item.id"
                  :label="item.category_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="label-wrap date">
            <label>
              时间:
              <div style="width:25px">&nbsp;</div>
            </label>
            <div class="wrap-content">
              <el-date-picker
                style="width:100%"
                v-model="dateValue"
                format="yyyy年MM月dd日"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetimerange"
                align="right"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00', '08:00:00']"
              ></el-date-picker>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="label-wrap key-word">
            <label>关键字:</label>
            <div class="wrap-content">
              <el-select v-model="searchKey" style="width:100%">
                <el-option
                  v-for="item in searchOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <el-input v-model="skeyWord" placeholder="请输入内容" style="width:100%"></el-input>
        </el-col>
        <el-col :span="5">
          <el-button type="danger" @click="search">搜索</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" class="pull-right" @click="dialogVisible=true">新建</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="black-space-30"></div>
    <!--表格-->
    <el-table
      :data="tableData.item"
      border
      v-loading="table_loading"
      @selection-change="handleSelectionChange"
      style="width: 100%;"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="标题" width="830"></el-table-column>
      <el-table-column prop="type" label="类型" width="130" :formatter="toCategory"></el-table-column>
      <el-table-column prop="date" label="日期" width="237" :formatter="toDate"></el-table-column>
      <el-table-column prop="user" label="管理员" width="115"></el-table-column>
      <el-table-column prop="操作" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)">删除</el-button>
          <el-button type="success" size="mini" @click="editInfoDialog(scope.row.id)">编辑</el-button>
          <el-button type="success" size="mini" @click="editInfoDialog(scope.row.id)">编辑详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="black-space-30"></div>
    <!--页面底部-->
    <el-row>
      <el-col :span="12">
        <el-button size="medium" @click="deleteAll">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <div class="block">
          <el-pagination
            class="pull-right"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.pageNumber"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
    <!-- 信息添加弹框-->
    <DialogInfo
      :flag.sync="dialogVisible"
      :category="category.item"
      :pageSize="page.pageSize"
      :pageNumber="page.pageNumber"
      @getList="getCategoryList"
    />
    <!-- 信息修改弹框-->
    <DialogEditInfo
      :flag.sync="dialog_editVisible"
      :category="category.item"
      :infoId="infoId"
      @getList="getCategoryList"
    />
  </div>
</template>
<script>
import DialogInfo from "./dialog/info";
import DialogEditInfo from "./dialog/edit";
import { GetCategory, GetInfoList, EditInfo, DeleteInfo } from "@/api/news";
import { global } from "@/utils/global_V3.0";
import { common } from "@/api/common";
import { timestampToTime } from "@/utils/common";
import { reactive, ref, watch, onMounted } from "@vue/composition-api";
import "../../styles/config.scss";
export default {
  name: "info",
  components: { DialogInfo, DialogEditInfo },
  setup(props, { root }) {
    const { str, confirm } = global(); //申明global_V3.0中的常量、方法
    const { getCategoryInfo, categoryData } = common();
    const infoId = ref("");
    const table_loading = ref(true);
    const dialogVisible = ref(false); //true,false
    const dialog_editVisible = ref(false); //true,false
    const categoryValue = ref(""); //类型
    const dateValue = ref(""); //日期
    const searchKey = ref("id"); //关键字
    const skeyWord = ref(""); //搜索key内容
    const total = ref(0);
    const category = reactive({
      item: []
    });
    const multipleSelection = reactive({
      data: []
    });
    const searchOptions = reactive([
      { value: "id", label: "ID" },
      { value: "title", label: "标题" }
    ]);
    const tableData = reactive({
      item: []
    });
    const deleteId = ref("");

    const page = reactive({
      pageNumber: 1,
      pageSize: 10
    });

    const handleSizeChange = val => {
      console.log(`每页 ${val} 条`);
      page.pageSize = val;
      getCategoryList();
    };
    const handleCurrentChange = val => {
      console.log(`当前页: ${val}`);
      page.pageNumber = val;
      getCategoryList();
    };
    const handleSelectionChange = val => {
      let id = val.map(item => item.id);
      deleteId.value = id;
    };
    const toDate = (row, column, cellValue, index) => {
      return timestampToTime(row.createDate);
    };
    const toCategory = (row, column, cellValue, index) => {
      let categoryId = row.categoryId;
      let categoryName = category.item.filter(
        item => item.id == row.categoryId
      )[0];
      return categoryName.category_name;
    };
    const deleteItem = value => {
      deleteId.value = [value];
      confirm({
        content: "此操作将永久删除该文件, 是否继续?",
        tip: "警告",
        fn: confirmDelete
      });
    };
    const deleteAll = () => {
      if (!deleteId.value || deleteId.value.lenght == 0) {
        root.$message({
          type: "error",
          message: "请先选择要删除的数据!"
        });
        return false;
      }
      confirm({
        content: "此操作将永久删除选中文件, 是否继续?",
        tip: "警告",
        fn: confirmDelete
      });
    };
    const confirmDelete = value => {
      DeleteInfo({ id: deleteId.value })
        .then(response => {
          getCategoryList();
          deleteId.value = "";
        })
        .catch(error => {});
    };
    const search = () => {
      let requestData = formatData();
      console.log(requestData);
      getCategoryList();
    };
    const formatData = () => {
      let requestData = {
        pageNumber: page.pageNumber,
        pageSize: page.pageSize
      };
      //信息分类
      if (categoryValue.value) {
        requestData.categoryId = categoryValue.value;
      }
      //日期
      if (dateValue.value) {
        requestData.startTiem = dateValue.value[0];
        requestData.endTime = dateValue.value[1];
      }
      requestData[searchKey.value] = skeyWord.value;
      return requestData;
    };
    const getCategoryList = () => {
      const requestData = formatData();
      GetInfoList(requestData)
        .then(response => {
          const infoList = response.data.data.data;
          tableData.item = infoList; //更新表数据
          //更新页码
          total.value = response.data.data.total;
          table_loading.value = false;
        })
        .catch(error => {
          table_loading.value = false;
        });
    };

    const editInfoDialog = id => {
      dialog_editVisible.value = true;
      infoId.value = id;
    };
    /**
    生命周期
     */
    //挂载完成时执行（页面DOM元素完成时，实例完成）
    onMounted(() => {
      getCategoryInfo();
      getCategoryList();
    });
    watch(
      () => categoryData.item,
      value => {
        category.item = value;
      }
    ); //监听category变化时调用
    return {
      //基础数据ref
      infoId,
      dialogVisible,
      dialog_editVisible,
      categoryValue,
      dateValue,
      searchKey,
      skeyWord,
      total,
      table_loading,
      //对象数据reactive
      category,
      searchOptions,
      tableData,
      deleteId,
      page,
      multipleSelection,
      //方法
      search,
      handleSizeChange,
      handleCurrentChange,
      handleSelectionChange,
      toDate,
      toCategory,
      deleteItem,
      deleteAll,
      getCategoryList,
      editInfoDialog
    };
  }
};
</script>

<style lang="scss" scoped>
.label-wrap {
  &.categpry {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(right, 93, 40);
  }
  &.key-word {
    @include labelDom(right, 99, 40);
  }
}
</style>