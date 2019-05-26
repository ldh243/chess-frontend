<template>
  <v-content>
    <v-container fluid>
      <v-layout align-center justify-center row wrap>
        <v-flex offset-xs4 xs3 my-5>
          <v-avatar size="100" color="grey lighten-4">
            <img
              src="https://pickaface.net/gallery/avatar/DoubleA8559e089c6902b.png"
              alt="avatar"
            />
          </v-avatar>
          <span class="font-weight-medium display-1 ml-4">Tony stark</span>
        </v-flex>
        <v-flex xs4></v-flex>

        <v-flex xs4 mr-3>
          <LeftFrom />
        </v-flex>
        <v-flex xs4>
          <RightForm />
        </v-flex>
        <v-flex xs10 mt-4>
          <Certificate />
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import LeftFrom from '@/components/Instructor/Profile/LeftForm'
import RightForm from '@/components/Instructor/Profile/RightForm'
import Certificate from '@/components/Instructor/Profile/Certificate'
export default {
  components: {
    LeftFrom,
    RightForm,
    Certificate
  }
}
</script>

<style></style>
