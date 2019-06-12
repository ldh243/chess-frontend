<template>
  <div class="trainingTemplate">
    <v-toolbar color="indigo" dark fixed app class="elevation-0">
      <v-toolbar-title>Học Với Bàn Cờ</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout row>
          <v-flex xs11 sm11 md12 lg12 xl12>
            <div class="alignToTop">
              <v-card class="card1">
                <div class="floatLeft"></div>
                <div class="floatRight">
                  <v-textarea
                    outline
                    height="200px"
                    width="200px"
                    name="input-7-4"
                    label="Nước cờ"
                    value
                  ></v-textarea>
                </div>
                <div class="btn">
                  <v-btn-toggle v-model="icon">
                    <v-btn flat value="left">
                      <v-icon>mdi-skip-previous</v-icon>
                      <span>Rrevious</span>
                    </v-btn>
                    <v-btn flat value="justify">
                      <v-icon>mdi-skip-next</v-icon>
                      <span>Next</span>
                    </v-btn>
                  </v-btn-toggle>
                </div>
                <div class="floatBottom">
                  <v-textarea
                    outline
                    height="225px"
                    width="200px"
                    name="input-7-4"
                    label="Bài học"
                    value
                  ></v-textarea>
                </div>
                <div>
                  <router-link to="/">
                    <h2>Quay lại</h2>
                  </router-link>
                </div>
              </v-card>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  name: 'TrainingTemplate',
  data() {
    return {
      text: 'center',
      icon: 'justify',
      toggle_none: null,
      toggle_one: 0,
      toggle_exclusive: 2,
      toggle_multiple: [0, 1, 2]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn {
  height: 300px;
}
.floatBottom {
  float: inherit;
}
.card1 {
  width: 100%;
  height: 100%;
  text-align: center;
}
.card2 {
  width: 70%;
  height: 80%;
  text-align: center;
  border: 0;
}
.floatRight {
  float: right;
  width: 50%;
  border: 0;
}
.floatLeft {
  float: left;
  width: 50%;
  height: 80%;
  background-color: lavender;
}
.courseProgressText {
  text-align: center;
  font-size: 1.3em;
  margin-bottom: 25px;
}

li.removeListPadding {
  margin-left: -50px !important;
}

.lessonComplete {
  color: rgb(170, 170, 170);
}

.clearfix::after {
  content: '';
  clear: both;
  display: table;
}

.cardMediaFormatting {
  margin: 0 !important;
  padding: 0 !important;
}

.cardMediaFormatting p {
  padding: 15px;
  text-align: center;
}

.audioFormatting {
  width: 100%;
  height: 285px;
  padding: 75px;
  text-align: center;
}

#leftSideTime,
#scrubBar {
  float: left;
}

#leftSideTime,
#rightSideTime {
  width: 5%;
  padding-top: 22px;
}

#leftSideTime {
  text-align: right;
}

#rightSideTime {
  float: right;
  text-align: left;
}

#scrubBar {
  width: 90%;
  padding: 0 10px 0 25px;
}

.alignToTop {
  height: 100vh !important;
  align-self: flex-start;
}
</style>
