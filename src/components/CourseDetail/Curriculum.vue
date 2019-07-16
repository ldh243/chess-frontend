<template>
  <v-card v-if="curriculum != null">
    <v-card-title primary-title>
      <v-layout row wrap>
        <v-flex xs12>
          <div class="headline">Giáo trình</div>
        </v-flex>
        <v-flex xs12>
          <v-layout justify-end pr-3>
            <span>Số bài: &nbsp;</span>
            <span class="total-lesson">{{ curriculum.length }}</span>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-layout row pa-3>
      <v-expansion-panel popout>
        <v-expansion-panel-content v-for="(item, index) in curriculum" :key="index" class="mb-1">
          <template v-slot:header>
            <div class="course-title">Bài {{ index + 1 }}: {{ item.name }}</div>
            <v-spacer></v-spacer>
            <div class="course-type">{{ item.lessonTypeName }}</div>
          </template>
          <v-card>
            <v-card-text>{{ item.name }}</v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-layout>
    <Loader v-if="loader" />
  </v-card>
</template>
<script>
import Loader from '@/components/Loader'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const lessonRepository = RepositoryFactory.get('lesson')
export default {
  components: {
    Loader
  },
  props: {
    curriculum: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      lessonDetails: null,
      loader: false
    }
  },
  mounted() {
    this.loader = true
    if (this.curriculum != null) {
      this.curriculum.forEach(el => {
        this.getLessonById(el.lessonId)
      })
    }
    this.loader = false
  },
  methods: {
    async getLessonById(lessonId) {
      const { data } = await lessonRepository.getById(lessonId)
      this.lessonDetails = data.data
    }
  }
}
</script>

<style scoped>
.course-title {
  font-size: 16px;
  color: #464646;
  font-weight: 700;
}
.course-type {
  flex: none !important;
  font-weight: 400;
  color: #9b9b9b;
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
</style>
