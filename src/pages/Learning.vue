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
        <v-flex v-if="lessonDetails.lessonType == 2" xs7>
          <chessboard :fen="currentFen" @onMove="showInfo" />
        </v-flex>
        <v-flex v-else>
          <iframe
            width="100%"
            class="iframe-video"
            src="https://www.youtube.com/embed/xh4sO1ICS_Q"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </v-flex>
        <v-flex xs4 offset-xs1>
          <v-layout column>
            <v-flex class="move-history">
              <v-card-title>
                <span class="title font-weight-bold">Nước đi</span>
              </v-card-title>
              <div class="move-history-content">
                <div v-for="(item, index) in moveHistory" :key="index">
                  <div class="index">{{ item.index }}</div>
                  <div
                    :id="item.whiteMove.moveCount"
                    class="move"
                    @click="loadFen(item.whiteMove.fen, $event)"
                  >
                    {{ item.whiteMove.move }}
                  </div>
                  <div
                    v-if="item.blackMove"
                    :id="item.blackMove.moveCount"
                    class="move"
                    @click="loadFen(item.blackMove.fen, $event)"
                  >
                    {{ item.blackMove.move }}
                  </div>
                </div>
              </div>
            </v-flex>
            <v-flex mb-4>
              <v-layout row>
                <v-btn
                  flat
                  :disabled="statusPreviousMove"
                  @click="turnToFirstMove()"
                >
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
                <v-btn
                  flat
                  :disabled="statusNextMove"
                  @click="turnToLastMove()"
                >
                  <v-icon>fa-fast-forward</v-icon>
                </v-btn>
              </v-layout>
            </v-flex>
            <v-flex v-if="lessonDetails != null" class="lesson-area" mb-2>
              <v-card-title class="pl-0 py-2">
                <span class="title font-weight-bold">Nội dung</span>
              </v-card-title>
              <div class="lesson-content">
                <v-card-title
                  v-if="lessonDetails.uninteractiveLesson != null"
                  >{{ lessonDetails.uninteractiveLesson.content }}</v-card-title
                >
              </div>
            </v-flex>
            <v-flex>
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
        <Loader v-if="loader" />
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Loader from '@/components/Loader'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const courseRepository = RepositoryFactory.get('course')
const lessonRepository = RepositoryFactory.get('lesson')
export default {
  components: {
    Loader
  },
  data() {
    return {
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
          text: '123123',
          disabled: false,
          href: '/123'
        },
        {
          text: '123123',
          disabled: true
        }
      ]
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
    }
  },
  created() {
    this.currentFen = this.defaultFen
  },
  mounted() {
    this.loader = true
    this.getCourseById()
    this.loader = false
  },
  methods: {
    loadFen(fen, event) {
      this.updateMove = false
      this.currentFen = fen
      if (event != undefined) {
        const divTarget = event.srcElement
        //Lấy id của nó parse sang int
        this.currentMove = this.getIdNumberOfMove(divTarget)
        this.setCurrentMove()
      }
    },
    async getCourseById() {
      const courseId = this.$route.params.courseId
      const { data } = await courseRepository.getById(courseId)
      this.courseDetail = data.data
      this.lessons = this.courseDetail.lessonViewModels
      this.getLessonById()
    },
    async getLessonById() {
      const lessonModel = this.courseDetail.lessonViewModels[this.activeLesson]
      const { data } = await lessonRepository.getById(lessonModel.lessonId)
      this.lessonDetails = data.data

      this.checkStatusDirectLesson()
    },
    showInfo(data) {
      //example data
      // moveHistory: [
      //     {
      //         index:
      //         whiteMove: {
      //             move:
      //             fen:
      //             moveCount:
      //         }
      //         blackMove: {
      //             move:
      //             fen:
      //             moveCount:
      //         }
      //     }
      // ]
      const black = 'black'
      let moveHistory = this.moveHistory
      //Lấy nước đi mới
      let newMove = data.history[data.history.length - 1]
      //Lấy nước đi cuối cùng
      let lastMove = moveHistory[moveHistory.length - 1]
      if (newMove === undefined || !this.currentFen) return
      //   newMove = this.changeChessKey(newMove)
      //Lấy turn hiện tại
      const turn = data.turn
      this.totalMove++
      if (turn === black) {
        //tạo thêm turn mới
        const newTurn = {
          index: moveHistory.length + 1,
          whiteMove: {
            move: newMove,
            fen: data.fen,
            moveCount: 'move-' + this.totalMove
          },
          blackMove: null
        }
        moveHistory.push(newTurn)
      } else {
        //nước đi tiếp theo của turn cũ
        lastMove.blackMove = {
          move: newMove,
          fen: data.fen,
          moveCount: 'move-' + this.totalMove
        }
      }
      this.currentMove = this.totalMove
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
        currentMove.parentNode.parentNode.scrollTop = currentMove.offsetTop
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
</style>
