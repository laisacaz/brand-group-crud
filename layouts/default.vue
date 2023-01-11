<template>
      <v-app dark> 
        <v-navigation-drawer
          permanent
          expand-on-hover>
              <v-list
              nav
              dense>
                <v-list-item link to="/">
                  <v-list-item-icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-list-item-icon>
                     <v-list-item-title>HomePage</v-list-item-title>
                </v-list-item>

                <v-list-item link to="/group">
                    <v-list-item-icon>
                         <v-icon>mdi-archive-star</v-icon>
                   </v-list-item-icon>
                   <v-list-item-title>Grupos</v-list-item-title>
                </v-list-item>

                <v-list-item link to="/brand">
                  <v-list-item-icon>
                    <v-icon>mdi-bag-personal-tag</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Marcas</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
              <v-main>
        <v-container class="pa-0 ma-0" fluid>
        <Nuxt></Nuxt>
      </v-container>
        </v-main>
     </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
