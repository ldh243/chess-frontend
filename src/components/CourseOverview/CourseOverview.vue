<template>
  <v-layout row>
    <v-flex xs3 mr-2>
      <v-card class="mx-auto category-container pa-3">
        <v-list class="category-container">
          <v-list-tile id="category-0" @click="changeFilter(1, 0, '')">
            <v-list-tile-content>
              <v-list-tile-title class="category-name"
                >Tất cả</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <template v-for="(item, index) in listCategories">
            <v-list-tile
              :id="'category-' + item.categoryId"
              :key="index"
              class="ml-2"
              @click="changeFilter(1, item.categoryId, item.name)"
            >
              <v-list-tile-content>
                <v-list-tile-title class="category-name">{{
                  item.name
                }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex xs9>
      <v-layout row wrap>
        <v-flex xs12>
          <v-layout justify-end>
            <div class="filter-container">
              <div
                v-for="(sort, index) in sortFilters"
                :key="index"
                :class="[
                  'filter-item',
                  sort.sortBy === filter.sortBy ? 'filter-active' : ''
                ]"
                @click="changeFilter(2, sort.sortDirection, sort.sortBy)"
              >
                {{ sort.name }}
                <template
                  v-if="filter.sortBy === 'point' && sort.sortBy === 'point'"
                >
                  <v-icon v-if="filter.sortDirection === 'ASC'" class="ml-1"
                    >fa-caret-up</v-icon
                  >
                  <v-icon v-if="filter.sortDirection === 'DESC'" class="ml-1"
                    >fa-caret-down</v-icon
                  >
                </template>
              </div>
            </div>
          </v-layout>
        </v-flex>
        <v-flex mb-1 class="selected-filter" xs12>
          <v-layout fill-height align-center>
            <span class="total-course">
              <b>{{ getTotalCourse }}</b>
              khóa học
            </span>
            <v-chip
              v-model="filter.chips.categoryShow"
              close
              color="#e6e6e6"
              label
              outline
              text-color="#333333"
              >{{ filter.chips.categoryName }}</v-chip
            >
            <v-chip
              v-model="filter.chips.sortShow"
              close
              color="#e6e6e6"
              label
              outline
              text-color="#333333"
              >{{ filter.chips.sortBy }}</v-chip
            >
          </v-layout>
        </v-flex>
        <v-flex
          v-for="(item, index) in listCourses"
          :key="index"
          mb-3
          class="course-item"
          xs12
        >
          <CourseItem :course-detail="item" />
        </v-flex>
        <v-flex>
          <v-layout justify-center>
            <v-pagination
              v-model="filter.page"
              :length="filter.totalPages"
              :total-visible="5"
              color="#fafafa"
            ></v-pagination>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import CourseItem from '@/components/CourseOverview/CourseItem'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { filter } from 'minimatch'
const courseRepository = RepositoryFactory.get('course')
const categoryRepository = RepositoryFactory.get('category')
export default {
  components: {
    CourseItem
  },
  data() {
    return {
      chips: {
        category: {
          name: '',
          show: false
        },
        sort: {
          name: '',
          show: false
        }
      },
      listCourses: [],
      listCategories: [],
      currentCategoryId: 0,
      filter: {
        totalPages: 0,
        page: 1,
        pageSize: 5,
        sortBy: '',
        sortDirection: '',
        statusId: 2,
        categoryId: 0,
        chips: {
          categoryName: '',
          categoryShow: false,
          sortBy: '',
          sortShow: false
        }
      },
      sortFilters: [
        {
          name: 'Mới nhất',
          sortBy: 'created_date',
          sortDirection: ''
        },
        {
          name: 'Đánh giá cao nhất',
          sortBy: 'rating',
          sortDirection: 'DESC'
        },
        {
          name: 'Điểm',
          sortBy: 'point',
          sortDirection: null
        }
      ],
      totalCourse: 0
    }
  },
  computed: {
    getTotalCourse() {
      return this.totalCourse
    }
  },
  watch: {
    'filter.page': function() {
      this.factoryGetCourse()
    },
    'filter.chips.categoryShow': function() {
      if (!this.filter.chips.categoryShow) {
        //xóa chip category
        this.changeFilter(1, 0, '')
      }
    },
    'filter.chips.sortShow': function() {
      if (!this.filter.chips.sortShow) {
        //xóa chip sort
        this.changeFilter(2, '', '')
      }
    }
  },
  mounted() {
    this.$store.commit('incrementLoader', 1)
    setTimeout(() => {
      this.getCoursesPagination()
      this.getCategories()
      this.$store.commit('incrementLoader', -1)
    }, 500)
  },
  methods: {
    factoryGetCourse() {
      this.$store.commit('incrementLoader', 1)
      setTimeout(() => {
        if (this.filter.categoryId === 0) {
          //search all
          this.getCoursesPagination()
        } else {
          this.getCoursesPaginationByCategoryId()
        }
        this.hightlightCategory()
        this.$store.commit('incrementLoader', -1)
      }, 500)
    },
    async getCoursesPagination() {
      const { data } = await courseRepository.getCoursesPagination(this.filter)
      this.listCourses = data.data.content
      this.formatListCourse()
      this.filter.totalPages = data.data.totalPages
      this.totalCourse = data.data.totalElements
    },
    async getCoursesPaginationByCategoryId() {
      const { data } = await courseRepository.getCoursesPaginationByCategoryId(
        this.filter
      )
      this.listCourses = data.data.content
      this.formatListCourse()
      this.filter.totalPages = data.data.totalPages
      this.totalCourse = data.data.totalElements
    },
    formatListCourse() {
      this.listCourses.forEach(course => {
        const date = new Date(Date.parse(course.courseCreatedDate))
        course.courseCreatedDate =
          date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()
      })
    },
    async getCategories() {
      const { data } = await categoryRepository.getCategories()
      this.listCategories = data.data
      this.activeCategory = this.listCategories[0].categoryId
      this.hightlightCategory()
    },
    changeFilter(filterType, categoryId, name) {
      //filterType = 1 is category, 2 is sortBy
      if (filterType === 1) {
        this.filter.chips.categoryName = name
        if (categoryId === 0) {
          this.filter.chips.categoryShow = false
        } else {
          this.filter.chips.categoryShow = true
        }
        //khác mới load lại course trong category
        if (this.filter.categoryId !== categoryId) {
          this.filter.page = 1
          this.filter.categoryId = categoryId
          this.factoryGetCourse()
        }
      } else if (filterType === 2) {
        //categoryId có nghĩa là sortDirection trong trường hợp này
        const sortDirection = categoryId
        if (sortDirection === null) {
          this.filter.sortDirection =
            this.filter.sortDirection === 'ASC' &&
            this.filter.sortBy === 'point'
              ? 'DESC'
              : 'ASC'
        } else {
          this.filter.sortDirection = sortDirection
        }
        this.filter.chips.sortShow = true
        if (sortDirection === '' && name === '') {
          this.filter.chips.sortShow = false
        }
        this.filter.sortBy = name
        this.filter.chips.sortBy = this.mappingSortNameOfChips(
          name,
          this.filter.sortDirection
        )
        this.factoryGetCourse()
      }
    },
    mappingSortNameOfChips(name, sortDirection) {
      if (name === 'created_date') {
        return 'Mới nhất'
      } else if (name === 'rating') {
        return 'Đánh giá cao nhất'
      } else if (name === 'point' && sortDirection === 'ASC') {
        return 'Điểm: thấp đến cao'
      } else if (name === 'point' && sortDirection === 'DESC') {
        return 'Điểm: cao đến thấp'
      }
    },
    hightlightCategory() {
      let arr = document.getElementsByClassName('v-list__tile--link')
      if (!this.isEmpty(arr)) {
        Array.prototype.forEach.call(arr, function(category) {
          category.classList.remove('active')
        })
      }
      let categoryItem = document.getElementById(
        `category-` + this.filter.categoryId
      )
      if (!this.isEmpty(categoryItem)) {
        categoryItem.classList.add('active')
      }
    }
  }
}
</script>

<style scoped>
.course-item {
  -ms-flex-preferred-size: 31%;
  flex-basis: 31%;
  -webkit-box-flex: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
  max-width: 31%;
  flex: 1 1 auto;
}
.category-name {
  color: #333333 !important;
  font-size: 14px;
  letter-spacing: -0.5px;
}
.category-container {
  background-color: transparent !important;
  box-shadow: none;
  color: #333333 !important;
  font-size: 14px;
  line-height: 32px;
}
.active > div:first-child {
  font-weight: 700;
}
>>> .v-list__tile {
  height: 32px;
}
>>> .v-pagination__navigation,
>>> .v-pagination__item {
  background: transparent !important;
  box-shadow: none !important;
  font-size: 14px;
}
>>> .v-pagination__item--active {
  color: #c3c3c3 !important;
  background: #fafafa !important;
  border: 1px solid #cccccc !important;
}
>>> .v-pagination__item--active:hover {
  cursor: not-allowed;
}
>>> .v-pagination__item:hover {
  background-color: #f2f2f2 !important;
}
>>> .v-pagination__item:focus {
  outline: none;
}
>>> .v-pagination__navigation--disabled {
  opacity: 0;
}
>>> .v-chip:focus,
.v-chip:focus:after {
  box-shadow: none !important;
  background: transparent !important;
  background-color: transparent !important;
}
>>> .v-chip.v-chip.v-chip--outline {
  height: 28px;
}
>>> .v-chip__content {
  font-size: 12px;
}
>>> .v-chip__close > .v-icon {
  font-size: 18px;
}
.selected-filter {
  height: 36px;
  width: 40px;
}
.filter-item:not(.filter-active):hover {
  cursor: pointer;
  background-color: #f2f2f2;
}
.filter-item {
  border-right: 2px solid #e6e6e6;
  font-size: 12px;
  color: #333333;
  padding: 4px 16px;
  font-weight: 600;
}
.filter-container {
  border: 2px solid #e6e6e6;
  display: flex;
  border-right: none;
}
.total-course {
  font-size: 14px;
  color: #4d4d4d;
}
.v-icon {
  font-size: 17px;
}
.filter-active,
.filter-active > i {
  background: #333333;
  color: #ffffff;
}
</style>
