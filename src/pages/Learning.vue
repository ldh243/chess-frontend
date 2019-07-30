<template>
  <v-app>
    <v-container px-0>
      <v-layout row wrap>
        <v-flex xs12 mb-4>
          <v-breadcrumbs :items="breadcrumbs" class="py-0">
            <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-flex>
        <v-layout row>
          <v-flex v-if="lessonDetails.lessonType === 2" xs8 mr-5>
            <chessboard :fen="currentFen" :move="move" @onMove="showInfo" />
          </v-flex>
          <v-flex v-if="lessonDetails.lessonType === 3" xs8 mr-5>
            <v-card class="pa-3">
              <iframe
                width="100%"
                class="iframe-video"
                src="https://www.youtube.com/embed/xh4sO1ICS_Q"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <div v-for="(item, index) in lessonContent" :key="index">
                <p class="mb-1">{{ item.title }}</p>
                <p class="mb-3">{{ item.text }}</p>
              </div>
            </v-card>
          </v-flex>
          <v-flex xs4 class="direction-side">
            <v-layout column>
              <v-flex class="move-history mb-2">
                <v-card-title class="pl-0 py-2">
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
                        <div v-if="moved2.depth === 2" :key="index2">
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
                        <div v-if="moved2.depth === 3" :key="index2" class="depth_3">
                          <template v-for="(moved3, index3) in moved2.moveHistory">
                            <div :key="index3" class="index">{{ moved3.index }}</div>
                            <div
                              v-if="moved3.whiteMove"
                              :id="moved3.whiteMove.id"
                              :key="index3"
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
                              :key="index3"
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
                <v-layout row>
                  <v-btn flat @click="turnToFirstMove()">
                    <v-icon>fa-fast-backward</v-icon>
                  </v-btn>
                  <v-btn flat class="main-button" @click="turnToPreviousMove()">
                    <v-icon>fa-backward</v-icon>
                  </v-btn>
                  <v-btn flat class="main-button" @click="turnToNextMove()">
                    <v-icon>fa-forward</v-icon>
                  </v-btn>
                  <v-btn flat @click="turnToLastMove()">
                    <v-icon>fa-fast-forward</v-icon>
                  </v-btn>
                </v-layout>
              </v-flex>
              <v-flex class="lesson-area" mb-2>
                <v-card-title class="pl-0 py-2">
                  <span class="title font-weight-bold">Nội dung</span>
                </v-card-title>
                <div class="lesson-content">
                  <v-card-title v-if="lessonDetails.interactiveLesson != null">{{ stepContent }}</v-card-title>
                </div>
              </v-flex>
              <v-flex class="lesson-direction">
                <v-layout row justify-space-between>
                  <v-btn
                    class="font-weight-bold"
                    :disabled="statusPreviousLesson"
                    @click="changeLesson(-1)"
                  >
                    <v-icon class="mr-2">fa-angle-left</v-icon>Bài trước
                  </v-btn>
                  <v-btn
                    class="font-weight-bold"
                    :disabled="statusNextLesson"
                    @click="changeLesson(1)"
                  >
                    Bài tiếp
                    <v-icon class="ml-2">fa-angle-right</v-icon>
                  </v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Chessboard from '@/components/plugins/vue-chessboard/index.vue'
import sampleText from '@/data/sampletext.json'
import sampleLesson from '@/data/lesson.json'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const courseRepository = RepositoryFactory.get('course')
const lessonRepository = RepositoryFactory.get('lesson')
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
          text: '123123',
          disabled: true
        }
      ],
      height: {
        moveHistory: 0,
        lessonContent: 0
      },
      move: '',
      steps: []
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
      this.setHeightForIframe()
      this.lessonContent = this.sampleText
    } else {
      this.lessonContent = null
    }
    this.initHeightForDirecitonSide()
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
    initHeightForDirecitonSide() {
      //reset height
      document.getElementsByClassName('move-history-content')[0].style.height =
        '0px'
      document.getElementsByClassName('lesson-content')[0].style.height = '0px'

      const totalHeight = document.getElementsByClassName('direction-side')[0]
        .offsetHeight

      if (this.lessonDetails.lessonType == 2) {
        this.showHideMoveHistory(true)
        const moveHeight = totalHeight * 0.6 - 88
        document.getElementsByClassName(
          'move-history-content'
        )[0].style.height = moveHeight + 'px'
        const lessonHeight = totalHeight * 0.4 - 88
        document.getElementsByClassName('lesson-content')[0].style.height =
          lessonHeight + 'px'
      } else {
        this.showHideMoveHistory(false)
        const lessonHeight = totalHeight - 76
        document.getElementsByClassName('lesson-content')[0].style.height =
          lessonHeight + 'px'
      }
    },
    showHideMoveHistory(status) {
      if (status) {
        document.getElementsByClassName('move-history')[0].style.display =
          'block'
        document.getElementsByClassName(
          'move-history-direction'
        )[0].style.display = 'block'
      } else {
        document.getElementsByClassName('move-history')[0].style.display =
          'none'
        document.getElementsByClassName(
          'move-history-direction'
        )[0].style.display = 'none'
      }
    },
    showInfo(data) {
      console.log(data.history[data.history.length - 1])
      console.log(data.fen)
    },
    loadFen(fen, event, content) {
      if (event != undefined) {
        const divTarget = event.srcElement
        if (divTarget.id) {
          this.stepContent = content
          this.currentId = divTarget.id
          this.currentFen = divTarget.getAttribute('preFen')
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
      this.$store.commit('incrementLoader', 1)
      const lessonModel = this.courseDetails.lessonViewModels[this.activeLesson]
      const { data } = await lessonRepository.getById(lessonModel.lessonId)
      this.lessonDetails = data.data
      this.checkStatusDirectLesson()
      if (this.lessonDetails.lessonType == 2) {
        this.steps = this.lessonDetails.interactiveLesson.steps
        this.defaultFen = this.lessonDetails.interactiveLesson.initCode
        this.currentFen = this.defaultFen
        this.firstId = this.steps[0].id
        this.loadMoveHistoryByLesson()
      }
      setTimeout(() => {
        this.$store.commit('incrementLoader', -1)
      }, 500)
    },
    getTurnOfFen(fen) {
      if (this.isEmpty(fen)) {
        return 'w'
      }
      const arr = fen.split(' ')
      return arr[1]
    },
    addMoveHistory(newMove, depth) {
      if (depth === 1) {
        let turn = this.getTurnOfFen(newMove.preFen)
        this.totalMove++
        //tạo thêm turn mới
        const newTurn = {
          index: this.moveHistory.length + 1,
          depth: 1,
          whiteMove: newMove,
          blackMove: null
        }
        if (turn === 'w') {
          this.moveHistory.push(newTurn)
        } else {
          let lastMove = this.moveHistory[this.moveHistory.length - 1]
          //nước đi tiếp theo của turn cũ
          lastMove.blackMove = newMove
        }
      }
    },
    refactorPreviousFen() {
      this.steps.forEach(el => {
        el.class = 'move'
        const parent = this.steps.find(pr => pr.id === el.preId)
        if (this.isEmpty(parent)) {
          el.preFen = this.lessonDetails.interactiveLesson.initCode
        } else {
          el.preFen = parent.fen
        }
      })
      this.steps[0].fen = this.lessonDetails.interactiveLesson.initCode
    },
    loadMoveHistoryByLesson() {
      this.loadFen(this.lessonDetails.interactiveLesson.initCode)
      this.refactorPreviousFen()
      const firstStep = this.steps[0]
      this.dfs(null, firstStep, 1)
      this.refactorDepth2()
      this.refactorDepth3()
    },
    dfs(parent, move, depth) {
      if (depth === 2) {
        if (this.isEmpty(parent.depth2)) {
          parent.depth2 = []
        }
        parent.depth2.push(move)
      } else if (depth === 3) {
        if (this.isEmpty(parent.depth3)) {
          parent.depth3 = []
        }
        parent.depth3.push(move)
      }
      // move.move = `${move.move} ${depth}`
      this.addMoveHistory(move, depth)
      let index = depth - 1
      let firstBranch = null
      this.steps.forEach(el => {
        if (el.preId === move.id) {
          index++
          if (this.isEmpty(move.nextId)) {
            move.nextId = el.id
          }
          if (index === depth) {
            this.dfs(parent, el, index)
            firstBranch = el
          } else {
            this.dfs(firstBranch, el, index)
          }
        }
      })
    },
    refactorDepth2() {
      let queue = []
      for (let index = 0; index < this.moveHistory.length; index++) {
        const el = this.moveHistory[index]
        if (el.depth === 1) {
          if (
            !this.isEmpty(el.whiteMove) &&
            !this.isEmpty(el.whiteMove.depth2)
          ) {
            const newMove = {
              index: el.index,
              whiteMove: {
                move: '...',
                nextId: null,
                preId: null,
                class: 'empty-move'
              },
              blackMove: el.blackMove,
              depth: 1
            }
            el.whiteMove.class = 'move single-move-white'
            queue.push({ index: el.index, move: el.whiteMove, pos: index + 1 })
            queue.push({ oldMove: el, newMove: newMove, pos: index + 1 })
          }
          if (
            !this.isEmpty(el.blackMove) &&
            !this.isEmpty(el.blackMove.depth2)
          ) {
            const oddMove = {
              move: '...',
              nextId: null,
              preId: null,
              class: 'empty-move'
            }
            el.blackMove.depth2.unshift(oddMove)
            queue.push({ index: el.index, move: el.blackMove, pos: index + 1 })
          }
        }
      }
      while (queue.length > 0) {
        const el = queue.pop()
        if (this.isEmpty(el.index)) {
          el.oldMove.blackMove = null
          this.moveHistory.splice(el.pos, 0, el.newMove)
        } else {
          const depth2 = {
            depth: 2,
            moveHistory: []
          }
          el.move.depth2.forEach(childStep => {
            const newTurn = {
              index: el.index + depth2.moveHistory.length,
              whiteMove: childStep,
              blackMove: null,
              depth: 2
            }
            const turn = this.getTurnOfFen(childStep.preFen)
            if (turn === 'w') {
              newTurn.whiteMove.class = 'move single-move-white'
              depth2.moveHistory.push(newTurn)
            } else {
              let lastMove = depth2.moveHistory[depth2.moveHistory.length - 1]
              lastMove.whiteMove.class = 'move'
              if (lastMove.whiteMove.move === '...') {
                lastMove.whiteMove.class = 'empty-move'
              }
              lastMove.blackMove = childStep
            }
          })
          this.moveHistory.splice(el.pos, 0, depth2)
        }
      }
    },
    refactorDepth3() {
      let queue = []
      this.moveHistory.forEach(el => {
        if (el.depth === 2) {
          const listDepth2 = el.moveHistory
          listDepth2.forEach((moved2, pos) => {
            if (
              !this.isEmpty(moved2.whiteMove) &&
              !this.isEmpty(moved2.whiteMove.depth3)
            ) {
              const newMove = {
                index: moved2.index,
                whiteMove: {
                  move: '...',
                  nextId: null,
                  preId: null,
                  class: 'empty-move'
                },
                blackMove: moved2.blackMove,
                depth: 2
              }
              moved2.whiteMove.class = 'move single-move-white'
              queue.push({
                index: moved2.index,
                move: moved2.whiteMove,
                pos: pos + 1,
                list: listDepth2
              })
              queue.push({
                oldMove: moved2,
                newMove: newMove,
                pos: pos + 1,
                list: listDepth2
              })
            }
            if (
              !this.isEmpty(moved2.blackMove) &&
              !this.isEmpty(moved2.blackMove.depth3)
            ) {
              const oddMove = {
                move: '...',
                nextId: null,
                preId: null,
                class: 'empty-move'
              }
              moved2.blackMove.depth3.unshift(oddMove)
              queue.push({
                index: moved2.index,
                move: moved2.blackMove,
                pos: pos + 1,
                list: listDepth2
              })
            }
          })
        }
      })
      while (queue.length > 0) {
        const el = queue.pop()
        if (this.isEmpty(el.index)) {
          el.oldMove.blackMove = null
          el.list.splice(el.pos, 0, el.newMove)
        } else {
          const depth3 = {
            depth: 3,
            moveHistory: []
          }
          el.move.depth3.forEach(childStep => {
            const newTurn = {
              index: el.index + depth3.moveHistory.length,
              whiteMove: childStep,
              blackMove: null,
              depth: 2
            }
            const turn = this.getTurnOfFen(childStep.preFen)
            if (turn === 'w') {
              newTurn.whiteMove.class = 'move single-move-white'
              depth3.moveHistory.push(newTurn)
            } else {
              let lastMove = depth3.moveHistory[depth3.moveHistory.length - 1]
              lastMove.whiteMove.class = 'move'
              if (lastMove.whiteMove.move === '...') {
                lastMove.whiteMove.class = 'empty-move'
              }
              lastMove.blackMove = childStep
            }
          })
          el.list.splice(el.pos, 0, depth3)
        }
      }
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
      const preId = document.getElementById(id).getAttribute('preId')
      return document.getElementById(preId)
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
    },
    setHeightForIframe() {
      const ratio = 16 / 9
      let iframe = document.getElementsByClassName('iframe-video')[0]
      const width = iframe.offsetWidth
      const height = width / ratio
      iframe.style.height = height + 'px'
    }
  }
}
</script>

<style scoped src="@/assets/style/chessboard.css"></style>

<style scoped>
>>> .application--wrap {
  margin-top: -56px;
  padding-top: 56px;
}
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
</style>
