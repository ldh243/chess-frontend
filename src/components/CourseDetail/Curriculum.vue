<template>
  <v-card v-if="curriculum !== null && learningLog !== null">
    <v-card-title primary-title>
      <v-layout wrap>
        <v-layout pr-3 align-center>
          <span class="title-curriculum text-black">Giáo trình</span>
          <v-spacer></v-spacer>
          <span class="text-black total-lesson-title">Số bài: &nbsp;</span>
          <span class="total-lesson">{{ curriculum.length }}</span>
        </v-layout>
        <v-flex xs12></v-flex>
      </v-layout>
    </v-card-title>
    <v-layout pa-3>
      <v-expansion-panels popout inset focusable>
        <v-expansion-panel v-for="(item,index) in curriculum" :key="index">
          <v-expansion-panel-header disable-icon-rotate>
            <v-layout>
              Bài {{index + 1}}: {{item.name}}
              <v-spacer></v-spacer>
              <div class="course-type pr-3">{{ item.lessonTypeName }}</div>
            </v-layout>
            <template v-slot:actions v-if="item.learned === true">
              <v-icon color="teal" size="18">mdi-check</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-layout>
  </v-card>
</template>
<script>
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const learningRepository = RepositoryFactory.get('learning')
export default {
  props: {
    courseDetail: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      courseId: this.$route.params.courseId,
      learningLog: null,
      curriculum: null
    }
  },
  created() {
    this.curriculum = this.courseDetail.lessonViewModels
    console.log(this.courseDetail.enrolled)
  },
  mounted() {
    this.$store.commit('incrementLoader', 1)
    if (this.courseDetail.enrolled) {
      this.getCurrentUserLearningLogByCourseId()
    } else {
      this.learningLog = []
    }
    setTimeout(() => {
      this.$store.commit('incrementLoader', -1)
    }, 500)
  },
  methods: {
    async getCurrentUserLearningLogByCourseId() {
      const { data } = await learningRepository.getLearningLog(this.courseId)
      this.learningLog = new Map()
      data.data.forEach(el => {
        this.learningLog.set(el, true)
      })
      this.curriculum.forEach(el => {
        el.learned = false
        if (this.learningLog.get(el.lessonId) === true) {
          el.learned = true
        }
      })
    }
  }
}
</script>

<style scoped>
.course-title {
  font-size: 16px;
  color: #464646;
  font-weight: 600;
}
.course-type {
  flex: none !important;
  font-weight: 400;
  color: #9b9b9b;
  font-size: 13px;
}
.total-lesson {
  color: #276fbd;
}
>>> .v-expansion-panel__header {
  border-radius: 7px;
  border: 1px solid #dedfe0;
}
>>> .v-expansion-panel__container--active .v-expansion-panel__header {
  border-radius: 0px;
  border: none;
}
>>> .theme--light.v-expansion-panel .v-expansion-panel__container {
  border-top: none;
}
.title-curriculum {
  font-size: 18px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0.3px;
}
.total-lesson-title,
.total-lesson {
  font-size: 14px;
}
</style>
