<template>
  <v-app>
    <v-container px-0 v-if="lessonDetails.lessonType === 2">
      <v-layout wrap>
        <v-flex xs12 mb-4>
          <v-breadcrumbs :items="breadcrumbs" class="py-0">
            <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-flex>
        <v-layout>
          <v-flex xs6 xl8 offset-xs1 offset-xl0 mr-5>
            <chessboard :status="'viewOnly'" :fen="currentFen" :move="move" @onMove="showInfo" />
          </v-flex>
          <v-flex xs4 class="direction-side">
            <v-layout column>
              <v-flex class="move-history mb-2">
                <v-card-title class="pa-0">
                  <span class="title font-weight-bold">Nước đi</span>
                </v-card-title>
                <div class="move-history-content">
                  <div v-for="(moved1, index) in moveHistory" :key="index">
                    <template v-if="moved1.depth === 1">
                      <div class="index">{{ moved1.index }}</div>
                      <div
                        v-if="moved1.whiteMove"
                        :id="moved1.whiteMove.id"
                        :preId="moved1.whiteMove.preId"
                        :nextId="moved1.whiteMove.nextId"
                        :preFen="moved1.whiteMove.preFen"
                        :move="moved1.whiteMove.moveDirection"
                        :class="moved1.whiteMove.class"
                        :depth="moved1.depth"
                        @click="loadFen(null, $event, moved1.whiteMove.content)"
                      >{{ moved1.whiteMove.move }}</div>

                      <div
                        v-if="moved1.blackMove"
                        :id="moved1.blackMove.id"
                        :preId="moved1.blackMove.preId"
                        :nextId="moved1.blackMove.nextId"
                        :class="moved1.blackMove.class"
                        :preFen="moved1.blackMove.preFen"
                        :move="moved1.blackMove.moveDirection"
                        :depth="moved1.depth"
                        @click="loadFen(null, $event, moved1.blackMove.content)"
                      >{{ moved1.blackMove.move }}</div>
                    </template>
                    <div v-if="moved1.depth === 2" class="depth_2">
                      <template v-for="(moved2, index2) in moved1.moveHistory">
                        <div v-if="moved2.depth === 2" :key="index2*2">
                          <div class="index">{{ moved2.index }}</div>
                          <div
                            v-if="moved2.whiteMove"
                            :id="moved2.whiteMove.id"
                            :preId="moved2.whiteMove.preId"
                            :nextId="moved2.whiteMove.nextId"
                            :class="moved2.whiteMove.class"
                            :preFen="moved2.whiteMove.preFen"
                            :move="moved2.whiteMove.moveDirection"
                            :depth="moved2.depth"
                            @click="
                              loadFen(null, $event, moved2.whiteMove.content)
                            "
                          >{{ moved2.whiteMove.move }}</div>
                          <div
                            v-if="moved2.blackMove"
                            :id="moved2.blackMove.id"
                            :preId="moved2.blackMove.preId"
                            :nextId="moved2.blackMove.nextId"
                            :class="moved2.blackMove.class"
                            :preFen="moved2.blackMove.preFen"
                            :move="moved2.blackMove.moveDirection"
                            :depth="moved2.depth"
                            @click="
                              loadFen(null, $event, moved2.blackMove.content)
                            "
                          >{{ moved2.blackMove.move }}</div>
                        </div>
                        <div v-if="moved2.depth === 3" :key="index2*2+1" class="depth_3">
                          <template v-for="(moved3, index3) in moved2.moveHistory">
                            <div :key="index3*3" class="index">{{ moved3.index }}</div>
                            <div
                              v-if="moved3.whiteMove"
                              :id="moved3.whiteMove.id"
                              :key="index3*3+1"
                              :preId="moved3.whiteMove.preId"
                              :nextId="moved3.whiteMove.nextId"
                              :class="moved3.whiteMove.class"
                              :preFen="moved3.whiteMove.preFen"
                              :move="moved3.whiteMove.moveDirection"
                              :depth="moved3.depth"
                              @click="
                                loadFen(null, $event, moved3.whiteMove.content)
                              "
                            >{{ moved3.whiteMove.move }}</div>
                            <div
                              v-if="moved3.blackMove"
                              :id="moved3.blackMove.id"
                              :key="index3 *3+2"
                              :preId="moved3.blackMove.preId"
                              :nextId="moved3.blackMove.nextId"
                              :class="moved3.blackMove.class"
                              :preFen="moved3.blackMove.preFen"
                              :move="moved3.blackMove.moveDirection"
                              :depth="moved3.depth"
                              @click="
                                loadFen(null, $event, moved3.blackMove.content)
                              "
                            >{{ moved3.blackMove.move }}</div>
                          </template>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </v-flex>
              <v-flex mb-2 class="move-history-direction">
                <v-layout>
                  <v-btn text class="extra-button" @click="turnToFirstMove()">
                    <v-icon>fa-fast-backward</v-icon>
                  </v-btn>
                  <v-btn text class="main-button" @click="turnToPreviousMove()">
                    <v-icon>fa-backward</v-icon>
                  </v-btn>
                  <v-btn text class="main-button" @click="turnToNextMove()">
                    <v-icon>fa-forward</v-icon>
                  </v-btn>
                  <v-btn text class="extra-button" @click="turnToLastMove()">
                    <v-icon>fa-fast-forward</v-icon>
                  </v-btn>
                </v-layout>
              </v-flex>
              <v-flex class="lesson-area" mb-2>
                <v-card-title class="pa-0">
                  <span class="title font-weight-bold">Nội dung</span>
                </v-card-title>
                <div class="lesson-content">
                  <v-card-text v-if="lessonDetails.interactiveLesson != null">{{ stepContent }}</v-card-text>
                </div>
              </v-flex>
              <v-flex class="lesson-direction">
                <v-layout justify-space-between>
                  <v-btn
                    class="font-weight-bold"
                    :disabled="statusPreviousLesson"
                    @click="changeLesson(-1)"
                  >
                    <v-icon class="mr-2">fa-angle-left</v-icon>Bài trước
                  </v-btn>
                  <v-btn
                    v-if="!statusNextLesson"
                    class="font-weight-bold"
                    :disabled="statusNextLesson"
                    @click="changeLesson(1)"
                  >
                    Bài tiếp
                    <v-icon class="ml-2">fa-angle-right</v-icon>
                  </v-btn>
                  <v-btn v-else @click="finishCourse()" class="font-weight-bold">Hoàn thành</v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
    <v-container fill-height v-if="lessonDetails.lessonType === 3">
      <v-layout fill-height wrap class="content-theory-container">
        <v-flex xs12 mb-4>
          <v-breadcrumbs :items="breadcrumbs" class="py-0">
            <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-flex>
        <v-flex xs12 mb-3>
          <v-card class="pa-3">
            <span class="content-theory" v-html="theoryContent"></span>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-layout justify-center>
            <v-btn
              class="font-weight-bold mr-3"
              :disabled="statusPreviousLesson"
              @click="changeLesson(-1)"
            >
              <v-icon class="mr-2">fa-angle-left</v-icon>Bài trước
            </v-btn>
            <v-btn
              v-if="!statusNextLesson"
              class="font-weight-bold"
              :disabled="statusNextLesson"
              @click="changeLesson(1)"
            >
              Bài tiếp
              <v-icon class="ml-2">fa-angle-right</v-icon>
            </v-btn>
            <v-btn v-else class="font-weight-bold" @click="finishCourse()">Hoàn1231 thành</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Chessboard from '@/components/plugins/vue-chessboard/index.vue'
import sampleText from '@/data/sampletext.json'
import sampleLesson from '@/data/algorithmsample.json'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const courseRepository = RepositoryFactory.get('course')
const lessonRepository = RepositoryFactory.get('lesson')
const learningRepository = RepositoryFactory.get('learning')
import MoveHistory from '@/library/ChessHistory.js'
export default {
  components: {
    Chessboard
  },
  data() {
    return {
      sampleText,
      sampleLesson,
      lessonContent: null,
      stepContent: null,
      moveHistory: [],
      defaultFen: '',
      currentFen: '',
      currentMove: 0,
      currentId: 0,
      firstId: 0,
      totalMove: 0,
      activeLesson: 0,
      courseDetails: null,
      lessonDetails: {},
      statusNextLesson: false,
      statusPreviousLesson: false,
      breadcrumbs: [
        {
          text: 'Trang chủ',
          disabled: false,
          href: '/'
        },
        {
          text: 'Khóa học',
          disabled: false,
          href: '/course'
        },
        {
          text: '',
          disabled: false,
          href: ''
        },
        {
          text: 'Học',
          disabled: true
        }
      ],
      height: {
        moveHistory: 0,
        lessonContent: 0
      },
      move: '',
      steps: [],
      theoryContent: ''
    }
  },
  computed: {
    statusNextMove() {
      if (this.currentMove === this.totalMove) {
        return true
      }
      return false
    },
    statusPreviousMove() {
      if (this.currentMove <= 1) {
        return true
      }
      return false
    }
  },
  updated() {
    if (this.lessonDetails.lessonType == 3) {
      this.lessonContent = this.sampleText
    } else {
      this.lessonContent = null
      this.initHeightForDirecitonSide()
    }
  },
  created() {
    this.currentFen = this.defaultFen
    // console.log(JSON.stringify(this.sampleLesson))
  },
  mounted() {
    this.$store.commit('incrementLoader', 1)
    this.getCourseById()
    setTimeout(() => {
      this.$store.commit('incrementLoader', -1)
    }, 500)
  },
  methods: {
    finishCourse() {
      const courseId = this.$route.params.courseId

      let timerInterval
      this.$swal
        .fire({
          title: 'Hoàn thành',
          type: 'success',
          html:
            'Chúc mừng bạn đã hoàn thành khóa học. Quay về trang chi tiết trong <strong></strong>...',
          timer: 5000,
          onBeforeOpen: () => {
            this.$swal.showLoading()
            timerInterval = setInterval(() => {
              this.$swal
                .getContent()
                .querySelector('strong').textContent = Math.ceil(
                this.$swal.getTimerLeft() / 1000
              )
            }, 100)
          },
          onClose: () => {
            clearInterval(timerInterval)
          }
        })
        .then(result => {
          this.$router.push(`/course/${courseId}`)
        })
    },
    initHeightForDirecitonSide() {
      //reset height
      const totalHeight = document.getElementsByClassName('cg-board-wrap')[0]
        .offsetHeight
      const moveHeight = totalHeight * 0.6 - 84
      document.getElementsByClassName('move-history-content')[0].style.height =
        moveHeight + 'px'
      const lessonHeight = totalHeight * 0.4 - 76
      document.getElementsByClassName('lesson-content')[0].style.height =
        lessonHeight + 'px'
    },
    showInfo(data) {
      // console.log(data.history[data.history.length - 1])
      // console.log(data.fen)
    },
    loadFen(fen, event, content) {
      if (event != undefined) {
        const divTarget = event.srcElement
        if (divTarget.id) {
          this.stepContent = content
          this.currentId = divTarget.id
          this.currentFen = divTarget.getAttribute('prefen')
          console.log(this.currentFen)
          this.move = divTarget.getAttribute('move')
          this.setCurrentMove()
        }
      } else {
        this.currentFen = fen
      }
    },
    async getCourseById() {
      const courseId = this.$route.params.courseId
      const { data } = await courseRepository.getById(courseId)
      this.courseDetails = data.data
      this.lessons = this.courseDetails.lessonViewModels
      this.breadcrumbs[2].text = this.courseDetails.name
      this.breadcrumbs[2].href = `/course/${this.$route.params.courseId}`
      this.getLessonById()
    },
    async getLessonById() {
      this.theoryContent = ''
      this.$store.commit('incrementLoader', 1)
      const lessonModel = this.courseDetails.lessonViewModels[this.activeLesson]
      const { data } = await lessonRepository.getById(lessonModel.lessonId)
      this.lessonDetails = data.data
      this.checkStatusDirectLesson()
      if (this.lessonDetails.lessonType == 2) {
        this.defaultFen = this.lessonDetails.interactiveLesson.initCode
        this.currentFen = this.defaultFen
        this.loadMoveHistory()
      } else {
        this.theoryContent = this.lessonDetails.uninteractiveLesson.content
      }
      setTimeout(() => {
        this.$store.commit('incrementLoader', -1)
      }, 500)
    },
    async createLearningLog(courseId, lessonId) {
      const { data } = await learningRepository.createLearningLog(
        courseId,
        lessonId
      )
      console.log(data)
    },
    loadMoveHistory() {
      this.loadFen(this.lessonDetails.interactiveLesson.initCode)
      const moveHistory = new MoveHistory(this.lessonDetails)
      moveHistory.formatMoveHistory()
      this.moveHistory = moveHistory.getMoveHistory
      this.steps = moveHistory.getSteps
      this.firstId = this.steps[0].id
    },

    setCurrentMove() {
      //set highlight div dựa trên this.current id hiện tại
      let arr = document.getElementsByClassName('move')
      if (arr != undefined && arr != null && arr.length !== 0) {
        Array.prototype.forEach.call(arr, function(move) {
          move.classList.remove('current-move')
        })
        let currentMove = document.getElementById(this.currentId)
        if (!this.isEmpty(currentMove)) {
          currentMove.classList.add('current-move')
          // document.getElementsByClassName('move-history-content')[0].scrollTop =
          //   currentMove.offsetTop - 251
        }
      }
    },
    getPreMoveById(id) {
      if (id === 0) {
        return null
      } else {
        const preId = document.getElementById(id).getAttribute('preId')
        return document.getElementById(preId)
      }
    },
    getNextMoveById(id) {
      let nextId = null
      if (id === 0) {
        nextId = this.firstId
      } else {
        nextId = document.getElementById(id).getAttribute('nextId')
      }
      return document.getElementById(nextId)
    },
    getLastMoveById(id) {
      const nextStep = this.steps.find(el => el.id == id)
      if (this.isEmpty(nextStep.nextId)) {
        return document.getElementById(nextStep.id)
      }
      return this.getLastMoveById(nextStep.nextId)
    },
    turnToNextMove() {
      const nextMove = this.getNextMoveById(this.currentId)
      if (!this.isEmpty(nextMove)) {
        this.currentId = nextMove.id
        nextMove.click()
        this.setCurrentMove()
      }
    },
    turnToLastMove() {
      if (this.currentId === 0) {
        this.currentId = this.firstId
      }
      const lastMove = this.getLastMoveById(this.currentId)
      if (!this.isEmpty(lastMove)) {
        this.currentId = lastMove.id
        lastMove.click()
        this.setCurrentMove()
      }
    },
    turnToPreviousMove() {
      const preMove = this.getPreMoveById(this.currentId)
      if (!this.isEmpty(preMove)) {
        this.currentId--
        preMove.click()
        this.setCurrentMove()
      }
    },
    turnToFirstMove() {
      this.currentId = 0
      this.currentFen = this.defaultFen
      this.setCurrentMove()
    },
    changeLesson(val) {
      if (0 <= this.activeLesson + val <= this.lessons.length) {
        this.activeLesson += val
        this.$store.commit('incrementLoader', 1)
        this.createLearningLog(
          this.$route.params.courseId,
          this.lessonDetails.lessonId
        )
        this.resetBoardAndResetHistory()
        this.getLessonById()
        this.checkStatusDirectLesson()
        setTimeout(() => {
          this.$store.commit('incrementLoader', -1)
        }, 500)
      }
    },
    checkStatusDirectLesson() {
      this.statusNextLesson = this.checkStatusNextLesson()
      this.statusPreviousLesson = this.checkStatusPreviousLesson()
    },
    checkStatusNextLesson() {
      if (this.activeLesson === this.lessons.length - 1) {
        return true
      }
      return false
    },
    checkStatusPreviousLesson() {
      if (this.activeLesson <= 0) {
        return true
      }
      return false
    },
    resetBoardAndResetHistory() {
      this.currentFen = ''
      this.moveHistory = []
      this.currentMove = 0
      this.totalMove = 0
    }
  }
}
</script>
<style scoped src="@/assets/style/chessboard.css"></style>
<style scoped>
.depth_2 {
  background-color: hsla(0, 59%, 85%, 0.85);
  margin: 5pt 0 5pt 5pt;
  flex: 0 0 100%;
}
.depth_3 {
  background-color: rgba(196, 240, 196, 0.85) !important;
  color: #080;
  margin: 5pt 0 5pt 5pt;
  flex: 0 0 100%;
}
.depth_2 > div {
  flex: 0 0 100%;
}
.depth_2 > div > div {
  color: #c00;
}
.single-move-white {
  -ms-flex: 0 0 86% !important;
  flex: 0 0 86% !important;
}
.content-theory-container > div:nth-child(2) {
  min-height: calc(100% - 85px);
}
.content-theory-container > div:nth-child(2) > div:first-child {
  height: 100%;
}
>>> .v-application--wrap {
  margin-top: -56px;
  padding-top: 56px !important;
}
>>> .content-theory img {
  position: relative;
  overflow: hidden;
  -webkit-box-flex: 1;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  max-width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
</style>
