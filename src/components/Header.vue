<template>
    <v-app>
        <v-app-bar color="purple darken-4 mb-5" max-height="65" dark>
            <v-main class="text-center">
                <h2>
                    PROJECT MANAGEMENT
                </h2>
            </v-main>
        </v-app-bar>
        <v-container class="grey lighten-5" fluid:ture>
            <v-row no-gutters>
                <v-col md="3" cols="12" offset-md="3">
                    <v-col class="pa-2" outlined tile>
                        <v-btn color="primary" elevation="2" large x-large width=100% v-on:click="updatecmp('entries')">All Entries</v-btn>
                    </v-col>
                </v-col>
                <v-col cols="12" md="3">
                    <v-col class="pa-2">
                        <v-btn color="success" elevation="2" large x-large width=100% v-on:click="updatecmp('projectForm')">Add Project</v-btn>
                    </v-col>
                </v-col>
            </v-row>
        </v-container>
        <component v-bind:is="cmp"></component>
    </v-app>
</template>

<script>
import Entries from './Entries'
import Form from './Form'

export default {
    name: 'Header',
    components: {
       'entries': Entries,
        'projectForm': Form
    },
    data() {
        return {
            cmp: 'entries'
        }
    },
    methods: {
        updatecmp(item) {
            this.cmp = item
        }
    }
}
</script>
