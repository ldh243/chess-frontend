<template>
  <v-content>
    <v-container fluid>
      <v-layout align-center justify-center row wrap>
        <v-flex xs12 my-5>
          <v-layout justify-center align-center>
            <v-avatar size="100" color="grey lighten-4">
              <img
                src="https://pickaface.net/gallery/avatar/DoubleA8559e089c6902b.png"
                alt="avatar"
              />
            </v-avatar>
            <span class="font-weight-medium display-1 ml-4">Tony stark</span>
          </v-layout>
        </v-flex>
        <v-flex xs10>
          <v-layout>
            <v-flex xs6 mr-4>
              <FixedProfile />
            </v-flex>
            <v-flex xs6>
              <MutableProfile />
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs10 mt-4>
          <Certificate />
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import FixedProfile from '@/components/Profile/FixedProfile'
import MutableProfile from '@/components/Profile/MutableProfile'
import Certificate from '@/components/Profile/Certificate'
export default {
  components: {
    FixedProfile,
    MutableProfile,
    Certificate
  }
}
</script>

<style></style>
