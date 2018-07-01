<template>
  <div class="list-container">
    <div class="input-filed">
      <input type="text" placeholder="please input your plan" v-model="plan" @keyup.enter="addData($event)">
      <button @click="addData">添加</button>
    </div>
    <div class="list" v-if="allPlanDatas.length>0">
      <ul v-for="(planData, index) in allPlanDatas" :key="index">
        <li>{{planData}}</li>
        <span @click="deleteToDoList(index)">删除</span>
        <span @click="edit(index, planData)">修改</span>
        <!-- delete -->
      </ul>
      <div class="preview">
        <button @click="preview">预览</button>
      </div>
    </div>
    <pop-up ref="mypop" @saveList="saveList"></pop-up>
  </div>
</template>

<script>
import Pop from '../components/Popup'
import { mapState, mapMutations } from 'vuex'

// import { Popup } from 'mint-ui'
export default {
  components: {
    'popUp': Pop
  },
  data () {
    return {
      plan: '',
      planDatas: [],
      showPopUp: false,
      popupVisible: true,
      editPlan: '',
      index: 0
    }
  },

  methods: {
    // 相当于import一个addTodoList的方法，下边的函数可以调用
    // 1
    ...mapMutations(['addTodoList', 'updateToDoList', 'deleteToDoList']),

    // 2
    // ...mapMutations({
    //   'changeName': 'addTodoList'
    // })

    // 3
    // addTodoList() {
    //   this.$store.commit('addTodoList')
    // },

    addData () {
      this.addTodoList(this.plan)
      this.plan = ''
    },
    // remove (index) {
    //   this.deleteToDoList(index)
    // },
    edit (index, text) {
      this.$refs.mypop.show({index, text})
    },

    // 子元素传给父元素的方法调用 listData是子元素给父元素的值
    saveList (listData) {
      this.updateToDoList(listData)
    },

    preview () {
      this.$router.push('preview')
    }
  },

  computed: {
    ...mapState(['allPlanDatas'])

    // allPlanDatas() {
    //   return this.$store.state.allPlanDatas
    // }
  }
}
</script>

<style lang="scss">
.list-container {
  input {
    border: 1px solid #ccc;
    height: 20px;
    margin: 10px;
  }
  .list {
    margin: 20px 10px;
    ul {
      display: flex;
      justify-content: space-between;
    }
    li {
      width: 60%;
      border-bottom: 1px solid #ccc;
      text-align: center;
      margin-top: 6px;
    }
    button {
      width: 50%;
    }
  }
}
</style>
