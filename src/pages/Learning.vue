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
          <v-flex v-if="lessonDetails.lessonType == 2" xs8 mr-5>
            <chessboard :fen="currentFen" :move="move" />
          </v-flex>
          <v-flex v-else xs8 mr-5>
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
                  <div v-for="(item, index) in moveHistory" :key="index">
                    <template v-if="item.depth === 1">
                      <div class="index">{{ item.index }}</div>
                      <div
                        v-if="item.whiteMove"
                        :id="item.whiteMove.moveCount"
                        class="move"
                        :preFen="item.whiteMove.preFen"
                        :move="item.whiteMove.moveDirection"
                        @click="
                          loadFen(
                            item.whiteMove.preFen,
                            $event,
                            item.whiteMove.content
                          )
                        "
                      >{{ item.whiteMove.move }}</div>

                      <div
                        v-if="item.blackMove"
                        :id="item.blackMove.moveCount"
                        class="move"
                        :preFen="item.blackMove.preFen"
                        :move="item.blackMove.moveDirection"
                        @click="
                          loadFen(
                            item.blackMove.preFen,
                            $event,
                            item.blackMove.content
                          )
                        "
                      >{{ item.blackMove.move }}</div>
                    </template>
                    <div v-if="item.depth === 2" class="depth_2">
                      <template v-for="(item2, index2) in item.moveHistory">
                        <div :key="index2">
                          <div class="index">{{ item2.index }}</div>
                          <div
                            v-if="item2.whiteMove"
                            :id="item2.whiteMove.moveCount"
                            class="move"
                            :preFen="item2.whiteMove.preFen"
                            :move="item2.whiteMove.moveDirection"
                            @click="
                              loadFen(
                                item2.whiteMove.preFen,
                                $event,
                                item2.whiteMove.content
                              )
                            "
                          >{{ item2.whiteMove.move }}</div>
                          <div
                            v-if="item2.blackMove"
                            :id="item2.blackMove.moveCount"
                            class="move"
                            :preFen="item2.blackMove.preFen"
                            :move="item2.blackMove.moveDirection"
                            @click="
                              loadFen(
                                item2.blackMove.preFen,
                                $event,
                                item2.blackMove.content
                              )
                            "
                          >{{ item2.blackMove.move }}</div>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </v-flex>
              <v-flex mb-2 class="move-history-direction">
                <v-layout row>
                  <v-btn flat :disabled="statusPreviousMove" @click="turnToFirstMove()">
                    <v-icon>fa-fast-backward</v-icon>
                  </v-btn>
                  <v-btn
                    flat
                    class="main-button"
                    :disabled="statusPreviousMove"
                    @click="turnToPreviousMove()"
                  >
                    <v-icon>fa-backward</v-icon>
                  </v-btn>
                  <v-btn
                    flat
                    class="main-button"
                    :disabled="statusNextMove"
                    @click="turnToNextMove()"
                  >
                    <v-icon>fa-forward</v-icon>
                  </v-btn>
                  <v-btn flat :disabled="statusNextMove" @click="turnToLastMove()">
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
                    @click="turnToPreviousLesson()"
                  >
                    <v-icon class="mr-2">fa-angle-left</v-icon>Bài trước
                  </v-btn>
                  <v-btn
                    class="font-weight-bold"
                    :disabled="statusNextLesson"
                    @click="turnToNextLesson()"
                  >
                    Bài tiếp
                    <v-icon class="ml-2">fa-angle-right</v-icon>
                  </v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <Loader v-if="loader" />
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Loader from '@/components/Loader'
import sampleText from '@/data/sampletext.json'
import sampleLesson from '@/data/lesson.json'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const courseRepository = RepositoryFactory.get('course')
const lessonRepository = RepositoryFactory.get('lesson')
export default {
  components: {
    Loader
  },
  data() {
    return {
      sampleText,
      sampleLesson,
      lessonContent: null,
      stepContent: null,
      loader: false,
      moveHistory: [],
      defaultFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      currentFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      updateMove: true,
      currentMove: 0,
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
    if (this.updateMove) {
      this.currentMove = this.totalMove
      this.setCurrentMove()
      if (!this.currentFen) {
        this.currentFen = this.defaultFen
      }
    }
    this.updateMove = true
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
    this.loader = true
    this.getCourseById()
    this.loader = false
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
    loadFen(fen, event, content) {
      this.updateMove = false
      if (event != undefined) {
        this.stepContent = content
        const divTarget = event.srcElement
        //Lấy id của nó parse sang int
        this.currentMove = this.getIdNumberOfMove(divTarget)
        this.currentFen = divTarget.getAttribute('preFen')
        this.move = divTarget.getAttribute('move')
        this.setCurrentMove()
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
      this.loader = true
      const lessonModel = this.courseDetails.lessonViewModels[this.activeLesson]
      const { data } = await lessonRepository.getById(lessonModel.lessonId)
      this.lessonDetails = data.data
      this.steps = this.lessonDetails.interactiveLesson.steps
      this.checkStatusDirectLesson()
      if (this.lessonDetails.lessonType == 2) {
        this.loadMoveHistoryByLesson()
      }
      this.loader = false
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
        newMove.moveCount = 'move-' + this.totalMove
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
          // if (this.isEmpty(lastMove.blackMove)) {
          lastMove.blackMove = newMove
          // } else {
          //   this.moveHistory.push(newTurn)
          // }
        }
      }
    },
    refactorPreviousFen() {
      this.steps.forEach(el => {
        const parent = this.steps.find(pr => pr.id === el.preMove)
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
      console.log(this.moveHistory)
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
        if (el.preMove === move.id) {
          index++
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
      this.moveHistory.forEach((el, index) => {
        if (el.depth === 1) {
          if (
            !this.isEmpty(el.whiteMove) &&
            !this.isEmpty(el.whiteMove.depth2)
          ) {
            // console.log('--- White ---')
            // console.log(el)
          } else if (
            !this.isEmpty(el.blackMove) &&
            !this.isEmpty(el.blackMove.depth2)
          ) {
            const oddMove = {
              move: '...'
            }
            el.blackMove.depth2.unshift(oddMove)
            const depth2 = {
              depth: 2,
              moveHistory: []
            }

            el.blackMove.depth2.forEach(childStep => {
              const newTurn = {
                index: el.index + depth2.moveHistory.length,
                whiteMove: childStep,
                blackMove: null,
                depth: 2
              }
              const turn = this.getTurnOfFen(childStep.preFen)
              if (turn === 'w') {
                depth2.moveHistory.push(newTurn)
              } else {
                let lastMove = depth2.moveHistory[depth2.moveHistory.length - 1]
                lastMove.blackMove = childStep
              }
            })
            this.moveHistory.splice(index + 1, 0, depth2)
          }
        }
      })
    },
    setCurrentMove() {
      //set highlight div dựa trên this.current move hiện tại
      let arr = document.getElementsByClassName('move')
      if (arr != undefined && arr != null && arr.length !== 0) {
        Array.prototype.forEach.call(arr, function(move) {
          move.classList.remove('current-move')
        })
        let currentMove = document.getElementById('move-' + this.currentMove)
        currentMove.classList.add('current-move')
        currentMove.parentNode.parentNode.scrollTop =
          currentMove.offsetTop - 221
      }
    },
    getIdNumberOfMove(divTarget) {
      return parseInt(divTarget.id.replace('move-', ''))
    },
    getMoveByIdNumber() {
      return document.getElementById('move-' + this.currentMove)
    },
    turnToNextMove() {
      if (this.currentMove !== this.totalMove) {
        this.currentMove++
        const divTarget = this.getMoveByIdNumber()
        divTarget.click()
        this.updateMove = false
        this.setCurrentMove()
      }
    },
    turnToLastMove() {
      if (this.currentMove !== this.totalMove) {
        this.currentMove = this.totalMove
        const divTarget = this.getMoveByIdNumber()
        divTarget.click()
        this.updateMove = false
        this.setCurrentMove()
      }
    },
    turnToPreviousMove() {
      if (this.currentMove > 1) {
        this.currentMove--
        const divTarget = this.getMoveByIdNumber()
        divTarget.click()
        this.updateMove = false
        this.setCurrentMove()
      }
    },
    turnToFirstMove() {
      if (this.currentMove > 1) {
        this.currentMove = 1
        const divTarget = this.getMoveByIdNumber()
        divTarget.click()
        this.updateMove = false
        this.setCurrentMove()
      }
    },
    turnToNextLesson() {
      if (this.activeLesson < this.lessons.length - 1) {
        this.activeLesson++
        this.loader = true
        this.resetBoardAndResetHistory()
        this.getLessonById()
        this.checkStatusDirectLesson()
        this.loader = false
      }
    },
    turnToPreviousLesson() {
      if (this.activeLesson >= 1) {
        this.activeLesson--
        this.loader = true
        this.resetBoardAndResetHistory()
        this.getLessonById()
        this.checkStatusDirectLesson()
        this.loader = false
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
  color: #c00;
  margin: 5pt 0 5pt 5pt;
  flex: 0 0 100%;
}
.depth_2 > div {
  flex: 0 0 100%;
}
.depth_2 > div > div {
  background-color: hsla(0, 59%, 85%, 0.85);
}
</style>
