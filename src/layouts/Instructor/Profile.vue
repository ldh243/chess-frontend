<template>
  <v-content>
    <v-container fluid>
      <v-layout align-center justify-center row wrap>
        <v-flex offset-xs5 xs2 mt-5>
          <v-avatar size="100" color="grey lighten-4">
            <img
              src="https://pickaface.net/gallery/avatar/DoubleA8559e089c6902b.png"
              alt="avatar"
            />
          </v-avatar>
          <span class="font-weight-medium display-1 ml-4">Tony stark</span>
        </v-flex>
        <v-flex xs5></v-flex>
        <v-flex xs4>
          <LeftFrom />
        </v-flex>
        <v-flex xs4>
          <RightForm />
        </v-flex>
        <v-flex xs1></v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import LeftFrom from '@/components/Instructor/Profile/LeftForm'
import RightForm from '@/components/Instructor/Profile/RightForm'
export default {
  components: {
    LeftFrom,
    RightForm
  }
}
</script>

<style></style>
