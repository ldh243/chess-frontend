<template>
  <v-container px-0>
    <v-layout row>
      <v-flex mr-4 xs8>
        <chessboard :fen="currentFen" @onMove="showInfo"/>
      </v-flex>

      <v-flex xs4>
        <v-layout column>
          <v-flex class="move-history">
            <v-card-title class="pl-0 py-2">
              <span class="title font-weight-bold">Nước đi</span>
            </v-card-title>
            <div class="move-history-content">
              <div v-for="(item, index) in moveHistory" :key="index">
                <div class="index">{{ item.index }}</div>
                <div
                  :id="item.whiteMove.moveCount"
                  class="move"
                  @click="loadFen(item.whiteMove.fen, $event)"
                >{{ item.whiteMove.move }}</div>
                <div
                  v-if="item.blackMove"
                  :id="item.blackMove.moveCount"
                  class="move"
                  @click="loadFen(item.blackMove.fen, $event)"
                >{{ item.blackMove.move }}</div>
              </div>
            </div>
          </v-flex>
          <v-flex mb-4>
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

              <v-btn flat class="main-button" :disabled="statusNextMove" @click="turnToNextMove()">
                <v-icon>fa-forward</v-icon>
              </v-btn>
              <v-btn flat :disabled="statusNextMove" @click="turnToLastMove()">
                <v-icon>fa-fast-forward</v-icon>
              </v-btn>
            </v-layout>
          </v-flex>
          <v-flex class="lession-content" mb-2>
            <v-card-title class="pl-0 py-2">
              <span class="title font-weight-bold">Nội dung</span>
            </v-card-title>
            <v-card height="300">
              <v-card-title>{{ loadLesson }}</v-card-title>
            </v-card>
          </v-flex>
          <v-flex>
            <v-layout>
              <v-btn
                class="font-weight-bold"
                :disabled="statusPreviousLesson"
                @click="turnToPreviousLesson()"
              >
                <v-icon class="mr-2">fa-angle-left</v-icon>Bài trước
              </v-btn>
              <v-spacer></v-spacer>
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
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      moveHistory: [],
      defaultFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      currentFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      updateMove: true,
      currentMove: 0,
      totalMove: 0,
      lessons: [
        'Bài học đầu tiên chưa có nội dung',
        'Bài học thứ 2 cũng chưa có nội dung',
        'Bài học thứ 3 cũng chưa có nội dung'
      ],
      activeLesson: 0
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
    },
    statusNextLesson() {
      if (this.activeLesson === this.lessons.length - 1) {
        return true
      }
      return false
    },
    statusPreviousLesson() {
      if (this.activeLesson <= 0) {
        return true
      }
      return false
    },
    loadLesson() {
      return this.lessons[this.activeLesson]
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
  },
  created() {
    this.currentFen = this.defaultFen
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
        this.resetBoardAndResetHistory()
      }
    },
    turnToPreviousLesson() {
      if (this.activeLesson >= 1) {
        this.activeLesson--
        this.resetBoardAndResetHistory()
      }
    },
    resetBoardAndResetHistory() {
      this.currentFen = ''
      this.moveHistory = []
    }
  }
}
</script>

<style scoped>
>>> piece,
.blue {
  background-color: transparent !important;
}
.lession-content {
  height: 30%;
}
.move-history-content {
  background-color: #fff;
  border-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  height: 180px;
  border-radius: 2px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  overflow: auto;
}
.move-history-content div {
  flex-wrap: wrap;
  display: flex;
}
.v-btn {
  height: 30px;
  min-width: 20%;
  margin: 0px;
}

.main-button {
  min-width: 30% !important;
}
.chess-move-history {
  min-width: 50%;
}
.index {
  flex: 0 0 14%;
  border-right: 1px solid #d9d9d9;
  background: #f7f6f5;
  color: #b3b3b3;
  justify-content: center;
  align-content: center;
  font-size: 15px;
}
.move {
  flex: 0 0 43%;
  font-size: 1.185em;
  padding-left: 10px;
  height: 30px;
  align-content: center;
  font-size: 18px;
}

.move:hover {
  cursor: pointer;
  background-color: #1b83e4;
  color: white;
}

.current-move {
  font-weight: bold;
  background: #d1e6fa;
  color: #1f1f1f;
}
</style>
