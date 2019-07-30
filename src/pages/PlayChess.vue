<template>
  <v-container>
    <v-layout row>
      <v-flex lg6 offset-lg1>
        <chessboard
          :move="move"
          :show-threats="true"
          :orientation="userColor"
          :fen="currentFen"
          :status="gameStatus"
          @onMove="showInfo"
        />
      </v-flex>
      <v-flex xs4 offset-xs1>
        <v-layout column>
          <player :time="botTime" :image-link="botImgLink"></player>
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
          <v-flex mb-2>
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
              <v-btn flat :disabled="statusNextMove" @click="turnToLastMove()">
                <v-icon>fa-fast-forward</v-icon>
              </v-btn>
            </v-layout>
          </v-flex>
          <v-flex class="move-analyse" mb-2>
            <v-card height="135">
              <div class="move-analyse-content">
                <div></div>
              </div>
            </v-card>
          </v-flex>
          <player
            :time="playerTime"
            :image-link="player.avatar"
            :point="player.point"
          ></player>
          <v-btn
            block
            color="primary"
            dark
            class="pa-2"
            :disabled="isStart"
            @click="
              startDialog = true
              gameStatus = 'pausing'
            "
            >Ván đấu mới</v-btn
          >
          <v-dialog v-model="startDialog" persistent max-width="600px">
            <v-card>
              <v-card-title>
                <span class="headline">Ván đấu mới</span>
              </v-card-title>
              <v-container grid-list-md pt-0>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-subheader class="pl-0">Cấp độ</v-subheader>
                    <v-slider
                      v-model="level"
                      step="1"
                      :tick-labels="tickLabels"
                      ticks="always"
                      :min="1"
                      :max="5"
                      tick-size="2"
                      color="primary"
                    ></v-slider>
                  </v-flex>
                  <v-flex xs7>
                    <v-subheader class="pl-0"
                      >Chọn màu quân (mặc định ngẫu nhiên)</v-subheader
                    >
                    <div>
                      <v-btn-toggle v-model="colorPicker">
                        <v-btn
                          :value="1"
                          style="width: 100px"
                          class="white king pick-color pa-1"
                        ></v-btn>
                        <v-btn
                          :value="2"
                          style="width: 100px"
                          class="king black pick-color pa-1"
                        ></v-btn>
                      </v-btn-toggle>
                    </div>
                  </v-flex>
                  <v-flex xs5>
                    <v-dialog
                      ref="dialog"
                      v-model="timePicker"
                      :return-value.sync="time"
                      persistent
                      lazy
                      full-width
                      width="300px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="time"
                          label="Chọn thời gian đấu"
                          prepend-icon="fa-clock"
                          readonly
                          class="mt-4"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="timePicker"
                        v-model="time"
                        format="24hr"
                        full-width
                        min="00:01:00"
                        max="12:59:59"
                        use-seconds
                        scrollable
                        :allowed-hours="allowedHours"
                        :allowed-minutes="allowedMinutes"
                        :allowed-seconds="allowedSeconds"
                      >
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="timePicker = false"
                          >Cancel</v-btn
                        >
                        <v-btn
                          flat
                          color="primary"
                          @click="$refs.dialog.save(time)"
                          >OK</v-btn
                        >
                      </v-time-picker>
                    </v-dialog>
                  </v-flex>
                  <v-flex xs12>
                    <v-switch
                      v-model="ex11"
                      label="Dùng chế độ gợi ý nước đi"
                      color="primary"
                      value="indigo"
                      hide-details
                    ></v-switch>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="startDialog = false"
                  >Đóng</v-btn
                >
                <v-btn color="blue darken-1" flat @click="startGame"
                  >Bắt đầu</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Chessboard from '@/components/plugins/vue-chessboard/index.vue'
import Player from '../components/PlayChess/Player'
import { setInterval, clearInterval } from 'timers'
export default {
  components: {
    Player,
    Chessboard
  },
  data() {
    return {
      moveHistory: [],
      defaultFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      currentFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      updateMove: true,
      currentMove: 0,
      totalMove: 0,
      startDialog: false,
      tickLabels: [1, 2, 3, 4, 5],
      player: JSON.parse(localStorage.getItem('user')),
      time: '01:00:00',
      timePicker: false,
      level: 3,
      botImgLink: '',
      colorPicker: 1,
      userColor: 'white',
      botTime: '',
      playerTime: '',
      turn: '',
      interval: null,
      isPlayerWin: false,
      move: '',
      moves: '',
      isStart: false,
      gameStatus: '',
      newestFen: '',
      ex11: ''
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
  watch: {
    level: function(level) {
      this.level = level
      this.botImgLink = require('@/assets/images/' + this.level + '.png')
    },
    turn: function(turn) {
      this.turn = turn
      clearInterval(this.interval)
      if (this.turn != null) {
        this.interval = setInterval(this.runClock, 1000)
      }
      if (this.turn !== this.userColor && this.isStart) {
        this.calculateMove()
      }
    },
    playerTime: function(playerTime) {
      playerTime == '00:00:00'
        ? (this.isPlayerWin = false)
        : (this.isPlayerWin = true)
    },
    botTime: function(botTime) {
      botTime == '00:00:00'
        ? (this.isPlayerWin = true)
        : (this.isPlayerWin = false)
    },
    isPlayerWin: function(isPlayerWin) {
      if (isPlayerWin) {
        console.log('Player')
      } else {
        console.log('Bot')
      }
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
    this.botImgLink = require('@/assets/images/' + this.level + '.png')
    this.botTime = this.playerTime = this.time
    this.engine = new Worker('stockfish.js')
    this.sendUCI('uci')
  },
  methods: {
    resetBoard() {
      this.moveHistory = []
      this.moves = ''
      this.updateMove = true
      this.currentFen = this.defaultFen
      this.currentMove = 0
      this.totalMove = 0
      clearInterval(this.interval)
    },
    loadFen(fen, event) {
      console.log('load fen')
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
      console.log('show info')
      this.gameStatus = 'playing'
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

      // get all moves
      this.moves = data.hisMoves
      const black = 'black'
      let moveHistory = this.moveHistory
      //Lấy nước đi mới
      let newMove = data.history[data.history.length - 1]
      //Lấy nước đi cuối cùng
      let lastMove = moveHistory[moveHistory.length - 1]
      if (newMove === undefined || !this.currentFen) return
      //   newMove = this.changeChessKey(newMove)
      //Lấy turn hiện tại
      if (data.end_game) {
        this.isStart = false
      }
      this.turn = data.turn
      this.totalMove++
      if (this.turn === black) {
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
      console.log(data.fen)
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
    resetBoardAndResetHistory() {
      this.currentFen = ''
      this.moveHistory = []
    },
    //handle Time Picker
    allowedHours: v => v >= 0 && v <= 12,
    allowedMinutes: v => v >= 1 && v <= 60,
    allowedSeconds: v => v >= 0 && v <= 60,
    //new a game
    startGame() {
      this.resetBoard()
      this.turn = 'white'
      switch (this.colorPicker) {
        case 0:
          this.userColor = 'white'
          break
        case 1:
          this.userColor = 'white'
          break
        case 2:
          this.userColor = 'black'
          break
      }
      this.gameStatus = 'new'
      this.botTime = this.playerTime = this.time
      this.startDialog = false
      this.isStart = true
      this.interval = setInterval(this.runClock, 1000)
    },
    countDownTime(time) {
      const timeArr = time.split(':')
      let hour = parseInt(timeArr[0]),
        min = parseInt(timeArr[1]),
        second = parseInt(timeArr[2])
      if (second != 0 || min != 0 || hour != 0) {
        if (second > 0) {
          second--
        } else {
          if (min > 0) {
            min--
            second = 59
          } else {
            //hour > 0, min = 0
            min = 59
            hour--
            second = 59
          }
        }
      } else {
        clearInterval(this.interval)
        this.isStart = false
        return '00:00:00'
      }
      hour < 10 ? (hour = '0' + hour) : hour
      min < 10 ? (min = '0' + min) : min
      second < 10 ? (second = '0' + second) : second
      return hour + ':' + min + ':' + second
    },
    runClock() {
      if (this.isStart) {
        this.userColor === this.turn
          ? (this.playerTime = this.countDownTime(this.playerTime))
          : (this.botTime = this.countDownTime(this.botTime))
      }
    },
    sendUCI(str) {
      console.log('Send: ' + str)
      this.engine.postMessage(str)
    },
    calculateMove() {
      let self = this
      this.sendUCI('setoption name Skill Level value ' + this.level)
      this.sendUCI('position startpos moves' + this.moves)
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
</style>

<style scoped src="@/assets/style/chessboard.css"></style>
