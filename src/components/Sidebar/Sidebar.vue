<template>
<div class="sidebar">
    <div class="sidebar__header">
        <i class="fa fa-bars"></i>
        <p>Direct Messages</p>
        <span class="fa fa-search"></span>
    </div>
</div>
  <!-- <v-navigation-drawer permanent class="indigo darken-3" dark>
    <v-toolbar flat class="indigo darken-3">
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            Timehack Codehub
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card height="57px" flat class="indigo darken-3">
        <v-bottom-nav
        :active.sync="bottomNav"
        :value="true"
        absolute
        color="transparent"
        >
        <v-btn
            color="teal"
            flat
            value="recent"
        >
            <span>Recent</span>
            <v-icon>history</v-icon>
        </v-btn>

        <v-btn
            color="teal"
            flat
            value="favorites"
        >
            <span>Favorites</span>
            <v-icon>favorite</v-icon>
        </v-btn>

        <v-btn
            color="teal"
            flat
            value="nearby"
        >
            <span>Nearby</span>
            <v-icon>place</v-icon>
        </v-btn>
        </v-bottom-nav>
    </v-card>
    <v-divider></v-divider>
    <v-list dense class="pt-0">
    <h4>ONLINE</h4>
    <v-list-tile
        v-for="people in peoples"
        :key="people.name"
        @click=""
    >
        <v-list-tile-action>
        <v-flex xs4 sm2 md1>
            <v-avatar
            slot="activator"
            size="36px"
            >
            <img
                v-if="people.avatar"
                v-bind:src=" people.avatar"
                alt="Avatar"
            >
            </v-avatar>
        </v-flex>
        </v-list-tile-action>
        <v-list-tile-content>
            <v-list-tile-title>{{ people.name }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-content>
            <v-badge color="indigo accent-1" transition="fab-transition">
                <span slot="badge">{{ people.messages }}</span>
            </v-badge>
        </v-list-tile-content>
        
    </v-list-tile>
    </v-list>
  </v-navigation-drawer> -->
</template>

<script>
//   export default {
//     data () {
//       return {
//         peoples: [
//             {
//                 avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
//                 name: 'Jerome Patiga',
//                 messages: '5'
//             },
//             {
//                 avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
//                 name: 'Jodie Cristobal',
//                 messages: '6'
//             },
//             {
//                 avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
//                 name: 'Victor Rafols',
//                 messages: '3'
//             }
//         ],
//         right: null
//       }
//     }
//   }
</script>
<style lang="scss" scoped>

</style>

