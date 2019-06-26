<template>
  <v-container>
    <v-layout row>
      <v-flex lg6 offset-lg1>
        <chessboard :move="'e2e4'" :fen="currentFen" @onMove="showInfo"/>
      </v-flex>
      <v-flex xs4 offset-xs1>
        <v-layout column>
          <player :time="botTime" :imageLink="botImgLink"></player>
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
          <v-flex mb-2>
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
          <v-flex class="move-analyse" mb-2>
            <v-card height="135">
              <div class="move-analyse-content">
                <div></div>
              </div>
            </v-card>
          </v-flex>
          <player :time="playerTime" :imageLink="player.avatar" :point="player.point"></player>
          <v-btn block color="primary" @click="startDialog = true" dark class="pa-2">Ván đấu mới</v-btn>
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
                    <v-subheader class="pl-0">Chọn màu quân (mặc định ngẫu nhiên)</v-subheader>
                    <div>
                      <v-btn-toggle v-model="colorPicker">
                        <v-btn :value="1" style="width: 100px" class="white king pick-color pa-1"></v-btn>
                        <v-btn :value="2" style="width: 100px" class="king black pick-color pa-1"></v-btn>
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
                          v-on="on"
                          class="mt-4"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="timePicker"
                        v-model="time"
                        format="24hr"
                        full-width
                        use-seconds
                        scrollable
                        :allowed-hours="allowedHours"
                        :allowed-minutes="allowedMinutes"
                        :allowed-seconds="allowedSeconds"
                      >
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="timePicker = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
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
                <v-btn color="blue darken-1" flat @click="startDialog = false">Đóng</v-btn>
                <v-btn color="blue darken-1" flat @click="startGame">Bắt đầu</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Clock from '../components/PlayChess/Clock'
import Player from '../components/PlayChess/Player'
import { setInterval, clearInterval } from 'timers'
export default {
  components: {
    Clock,
    Player
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
      time: '00:00:00',
      timePicker: false,
      level: 3,
      botImgLink: '',
      colorPicker: 1,
      userColor: 'white',
      botTime: '',
      playerTime: '',
      isWhiteTurn: false,
      interval: null,
      isPlayerWin: false,
      tmpMoves: ['e7e5', 'h7h5', 'g7g5'],
      move: '',
      isStart: false
    }
  },
  watch: {
    currentFen: function(fen) {
      this.currentFen = fen
    },
    level: function(level) {
      this.level = level
      console.log(level)
      this.botImgLink = require('@/assets/images/' + this.level + '.png')
    },
    isWhiteTurn: function(isWhiteTurn) {
      this.isWhiteTurn = isWhiteTurn
      const white = 'white'
      let time = ''
      if (this.userColor == white) {
        if (isWhiteTurn) {
          clearInterval(this.interval)
          this.interval = setInterval(() => {
            time = this.playerTime
            this.playerTime = this.countDownTime(time)
          }, 1000)
        } else {
          clearInterval(this.interval)
          this.interval = setInterval(() => {
            time = this.botTime
            this.botTime = this.countDownTime(time)
          }, 1000)
        }
      }
    },
    playerTime: function(playerTime) {
      playerTime == '00:00:00' ? this.isPlayerWin = false : this.isPlayerWin = true
    },
    botTime: function(botTime) {
      botTime == '00:00:00' ? this.isPlayerWin = true : this.isPlayerWin = false
    },
    isPlayerWin: function(isPlayerWin) {
      if (isPlayerWin) {
        console.log("Player")
      } else {
        console.log("Bot")
      }
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
  },
  created() {
    this.currentFen = this.defaultFen
    this.botImgLink = require('@/assets/images/' + this.level + '.png')
    this.botTime = this.playerTime = this.time
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
        if (this.isStart) {
          if (this.userColor != black) {
          this.move = this.tmpMoves[this.currentMove]
          
        }
        }
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
      this.isWhiteTurn = !this.isWhiteTurn
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
    allowedMinutes: v => v >= 0 && v <= 60,
    allowedSeconds: v => v >= 0 && v <= 60,
    //new a game
    startGame() {
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
      this.botTime = this.playerTime = this.time
      console.log(this.botTime)
      console.log(this.playerTime)
      this.startDialog = false
      this.isStart = true
      this.isWhiteTurn = true
      this.currentFen = this.defaultFen
      console.log(this.currentFen)
    },
    countDownTime(time) {
      const timeArr = time.split(':')
      let hour = parseInt(timeArr[0]),
        min = parseInt(timeArr[1]),
        second = parseInt(timeArr[2])
      console.log(hour + '-' + min + '-' + second)
      if (second != 0 || min != 0 || hour != 0) {
        if (second > 0) {
          second--
        } else {
          if (min > 0) {
            min--
            second = 59
          } else {
            if (hour > 0) {
              min = 59
              hour--
            }
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
    }
  }
}
</script>

<style scoped src="@/assets/style/chessboard.css">
</style>