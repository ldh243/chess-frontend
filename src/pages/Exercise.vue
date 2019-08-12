<template>
  <v-container>
    <v-layout>
      <v-flex xs6 offset-xs1 mr-5>
        <chessboard
          :move="move"
          :orientation="userColor"
          :fen="currentFen"
          :status="currentGameStatus"
          @onMove="showInfo"
          @onWrong="performWrongMove"
          :preMove="preMove"
        />
      </v-flex>
      <v-flex xs4 offset-xs1>
        <v-layout column>
          <v-flex class="move-history">
            <v-card-title class="pl-0 mb-2 py-0 mt-1" style="height:60px">
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
          <v-flex mb-2>
            <v-layout>
              <v-btn text :disabled="statusPreviousMove || this.isStart" @click="turnToFirstMove()">
                <v-icon>fa-fast-backward</v-icon>
              </v-btn>
              <v-btn
                text
                class="main-button"
                :disabled="statusPreviousMove || this.isStart"
                @click="turnToPreviousMove()"
              >
                <v-icon>fa-backward</v-icon>
              </v-btn>

              <v-btn
                text
                class="main-button"
                :disabled="statusNextMove || this.isStart"
                @click="turnToNextMove()"
              >
                <v-icon>fa-forward</v-icon>
              </v-btn>
              <v-btn text :disabled="statusNextMove || this.isStart" @click="turnToLastMove()">
                <v-icon>fa-fast-forward</v-icon>
              </v-btn>
            </v-layout>
          </v-flex>
          <v-flex class="move-analyse" mb-2>
            <v-card height="135">
              <div class="game-information" id="game-information-area">
                <div
                  :id="`game-information-item-${index}`"
                  class="game-information-item"
                  v-for="(item, index) in gameHistory"
                  :key="index"
                >{{item}}</div>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Chessboard from '@/components/plugins/vue-chessboard/index.vue'
export default {
  components: {
    Chessboard
  },
  data() {
    return {
      moveHistory: [],
      gameHistory: [],
      defaultFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      currentFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      initFen: '',
      updateMove: true,
      currentMove: 0,
      totalMove: 0,
      startDialog: false,
      tickLabels: [1, 2, 3, 4, 5],
      player: JSON.parse(localStorage.getItem('user')),
      timePicker: false,
      level: 3,
      botImgLink: '',
      colorPicker: 0,
      userColor: 'white',
      botTime: '',
      playerTime: '',
      turn: '',
      move: '',
      moves: '',
      isStart: false,
      gameNumber: 0,
      pgn: '',
      currentGame: {
        bonusPoint: 0
      },
      currentGameStatus: '',
      sampleData: {},
      answerType: 0,
      preMove: [],
      answerArr: [],
      lastFen: ''
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
  watch: {},
  updated() {
    this.setCurrentMove()
  },
  created() {
    this.engine = new Worker('stockfish.js')
    this.sendUCI('uci')
    this.sampleData = {
      fen: '4k3/8/8/8/8/Q7/K7/8 w - - 0 1',
      answerType: 1
    }
    this.sampleData1 = {
      fen: '4r2k/1p3rpp/p1q1p3/5p2/3Q1P2/2P1R3/PP4PP/4R2K w - - 0 1',
      answerType: 2,
      answerArr: [
        [
          {
            id: 1,
            moveDirection: 'e3e6',
            move: 'Re6',
            preId: null,
            rightRes: 'Chúc mừng',
            wrongRes: 'Ocschos'
          },
          {
            id: 2,
            moveDirection: 'c6e6',
            move: 'Qe6',
            preId: 1,
            rightRes: 'Nó mún ngăn chiếu bí đó',
            wrongRes: ''
          },
          {
            id: 3,
            moveDirection: 'e1e6',
            move: 'Re6',
            preId: 2,
            rightRes: 'Chúc mừng',
            wrongRes: 'Ocschos tập 2'
          }
        ],
        [
          {
            id: 1,
            moveDirection: 'd4d1',
            move: 'Qd1',
            preId: null,
            rightRes: 'Chúc mừng',
            wrongRes: 'Ocschos'
          },
          {
            id: 2,
            moveDirection: 'c6d6',
            move: 'Qd6',
            preId: 1,
            rightRes: 'LOL ngu quá',
            wrongRes: ''
          },
          {
            id: 3,
            moveDirection: 'd1d6',
            move: 'Qd6',
            preId: 2,
            rightRes: 'Chúc mừng, nó phải thua rồi',
            wrongRes: 'Ocschos'
          },
        ]
      ]
    }
    this.currentFen = this.sampleData1.fen
    // this.lastFen = this.sampleData1.fen
    this.answerType = this.sampleData1.answerType
    this.userColor =
      this.sampleData.fen.split(' ')[1] === 'w' ? 'white' : 'black'
      this.answerArr = this.sampleData1.answerArr
      if (this.sampleData1.answerType === 2) {
        this.sampleData1.answerArr.forEach(arr => {
          this.preMove.push(arr[0].moveDirection)
        })
      }
    this.gameStatus = 'new'
    // this.lastFen = this.currentFen
  },
  methods: {
    performWrongMove() {
      this.gameHistory.push('Câu trả lời sai, hãy thực hiện lại')
    },
    resetBoard() {
      this.moveHistory = []
      this.moves = ''
      this.currentFen = this.defaultFen
      this.currentMove = 0
      this.totalMove = 0
    },
    showInfo(data) {
      console.log(data)
      const black = 'black'
      let fen = data.fen, moveDirection = data.moveDirection
      if (this.answerType === 2 && data.turn !== this.userColor) {
        let answerArrPrediction = this.answerArr.map(move => {
          return move[this.currentMove].moveDirection
        })
        if (answerArrPrediction.indexOf(data.moveDirection) === -1) {
          this.currentGameStatus = 'wrong_ans'
          console.log(this.currentGameStatus)
        }
      }
      // this.moves = data.hisMoves
      // let moveHistory = this.moveHistory
      // let newMove = data.history[data.history.length - 1]
      // let lastMove = moveHistory[moveHistory.length - 1]
      // if (newMove === undefined || !this.currentFen) return
      // this.totalMove++
      // if (data.turn === undefined) {
      //   //end game
      //   this.turn = this.turn === 'white' ? 'black' : 'white'
      //   this.currentGameStatus = 'end_game'
      // } else {
      //   this.turn = data.turn
      // }
      // if (this.turn === black) {
      //   //tạo thêm turn mới
      //   const newTurn = {
      //     index: moveHistory.length + 1,
      //     whiteMove: {
      //       move: newMove,
      //       fen: data.fen,
      //       moveCount: 'move-' + this.totalMove
      //     },
      //     blackMove: null
      //   }
      //   moveHistory.push(newTurn)
      // } else {
      //   //nước đi tiếp theo của turn cũ
      //   lastMove.blackMove = {
      //     move: newMove,
      //     fen: data.fen,
      //     moveCount: 'move-' + this.totalMove
      //   }
      // }
      // this.currentMove = this.totalMove
      // if (data.end_game === undefined) {
      //   if (this.turn !== this.userColor) {
      //     switch (this.answerType) {
      //       case 1:
      //         this.calculateMove()
      //         break
      //         case 2:
      //           this.getNextMove()
      //           break
      //       default:
      //         break
      //     }
      //   }
      // } else if (data.end_game === this.userColor) {
      //   this.$swal('Kết quả', `Tạch`, 'error')
      // } else {
      //   this.$swal('Kết quả', `Hoàn thành`, 'success')
      // }
    },
    getNextMove() {
      console.log(this.answerArr[0])
      this.move = this.answerArr[0][this.currentMove].moveDirection
      this.currentMove++
    },
    loadFen(fen, event) {
      if (this.currentGameStatus === 'end_game') {
        this.currentFen = fen
        const divTarget = event.srcElement
        let id = divTarget.id
        this.currentMove = parseInt(id.replace('move-', ''))
      }
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
    sendUCI(str) {
      console.log('Send: ' + str)
      this.engine.postMessage(str)
    },
    calculateMove() {
      let self = this
      this.sendUCI('setoption name Skill Level value ' + this.level)
      this.sendUCI(
        'position fen ' + this.sampleData.fen + ' moves' + this.moves
      )
      this.sendUCI('go depth 15')
      this.engine.onmessage = function(event) {
        console.log(event.data)
        let line = event.data
        if (event.data.indexOf('bestmove') > -1) {
          let match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/)
          match[3] == undefined
            ? (self.move = match[1] + match[2])
            : (self.move = match[1] + match[2] + match[3])
        }
      }
    }
  }
}
</script>

<style scoped>
.move-history-content {
  height: 180px !important;
}
.game-information {
  height: 135px;
  overflow: auto;
}
.game-information-item {
  padding: 5px;
}
.game-information-item:nth-child(odd) {
  background-color: #bcd1d8;
}
.game-information-item:nth-child(even) {
  background-color: #9db9cc;
}
</style>

<style scoped src="@/assets/style/chessboard.css"></style>
