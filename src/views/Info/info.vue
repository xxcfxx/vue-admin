<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-row :gutter="16">
        <el-col :span="4">
          <div class="label-wrap categpry">
            <label>类型:</label>
            <div class="wrap-content">
              <el-select v-model="categoryValue" placeholder="类型" style="width:100%">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.label"
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
          <el-button type="danger">搜索</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" class="pull-right" @click="dialogVisible=true">新建</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="black-space-30"></div>
    <!--表格-->
    <el-table :data="tableData" border style="width: 100%;">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="标题" width="830"></el-table-column>
      <el-table-column prop="type" label="类型" width="130"></el-table-column>
      <el-table-column prop="date" label="日期" width="237"></el-table-column>
      <el-table-column prop="user" label="管理员" width="115"></el-table-column>
      <el-table-column prop="操作" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteItem">删除</el-button>
          <el-button type="success" size="mini" @click="dialogVisible=true">编辑</el-button>
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
            :current-page="1"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="1000"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>

    <DialogInfo :flag.sync="dialogVisible" />
  </div>
</template>
<script>
import DialogInfo from "./dialog/info";
import { global } from "@/utils/global_V3.0";
import { reactive, ref, watch } from "@vue/composition-api";
import "../../styles/config.scss";
export default {
  name: "info",
  components: { DialogInfo },
  setup(props, { root }) {
    const { str, confirm } = global(); //申明global_V3.0中的常量、方法
    watch(() => console.log(str.value)); //监听str变化时调用
    const dialogVisible = ref(false); //true,false
    const categoryValue = ref(""); //类型
    const dateValue = ref(""); //日期
    const searchKey = ref("id"); //关键字
    const skeyWord = ref(""); //搜索key内容
    const options = reactive([
      { value: 1, label: "国际信息" },
      { value: 2, label: "国内信息" },
      { value: 3, label: "行业信息" }
    ]);
    const searchOptions = reactive([
      { value: "id", label: "ID" },
      { value: "title", label: "标题" }
    ]);
    const tableData = reactive([
      {
        title: "大受打击啊洛克菲勒卡是免费拉面师傅妈的",
        type: "国内消息",
        date: "2020-03-24",
        user: "管理员"
      },
      {
        title: "大受打击啊洛克菲勒卡是免费拉面师傅妈的",
        type: "国内消息",
        date: "2020-03-24",
        user: "管理员"
      },
      {
        title: "大受打击啊洛克菲勒卡是免费拉面师傅妈的",
        type: "国内消息",
        date: "2020-03-24",
        user: "管理员"
      },
      {
        title: "大受打击啊洛克菲勒卡是免费拉面师傅妈的",
        type: "国内消息",
        date: "2020-03-24",
        user: "管理员"
      }
    ]);

    const handleSizeChange = val => {
      console.log(`每页 ${val} 条`);
    };
    const handleCurrentChange = val => {
      console.log(`当前页: ${val}`);
    };
    const deleteItem = () => {
      confirm({
        content: "此操作将永久删除该文件, 是否继续?",
        tip: "警告",
        fn: confirmDelete,
        id: "111"
      });
      // root.confirm({
      //   content: "此操作将永久删除该文件, 是否继续?",
      //   tip: "警告",
      //   fn: confirmDelete,
      //   id: "111"
      // });
    };

    const deleteAll = () => {
      confirm({
        content: "此操作将永久删除选中文件, 是否继续?",
        tip: "警告",
        fn: confirmDelete,
        id: "123"
      });
      // root.confirm({
      //   content: "此操作将永久删除选中文件, 是否继续?",
      //   fn: confirmDelete,
      //   id: "123"
      // });
    };

    const confirmDelete = value => {
      console.log("删除删除" + value);
    };
    return {
      //基础数据ref
      dialogVisible,
      categoryValue,
      dateValue,
      searchKey,
      skeyWord,
      //对象数据reactive
      options,
      searchOptions,
      tableData,
      //方法
      handleSizeChange,
      handleCurrentChange,
      deleteItem,
      deleteAll
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