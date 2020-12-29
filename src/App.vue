<template>
    <div>
        <v-app>
            <Header />
            <v-container class="grey lighten-5" fluid>
                <v-row no-gutters>
                    <v-col md="2" cols="6" offset-md="4">
                        <v-col class="pa-2" outlined tile>
                            <v-btn color="primary" elevation="2" large x-large width=100% v-on:click="updatecmp('entries')">All Entries</v-btn>
                        </v-col>
                    </v-col>
                    <v-col md="2" cols="6">
                        <v-col class="pa-2">
                            <v-btn color="success" elevation="2" large x-large width=100% v-on:click="updatecmp('projectForm')">Add Project</v-btn>
                        </v-col>
                    </v-col>
                </v-row>
            </v-container>
            <component v-bind:is="cmp"></component>
        </v-app>
    </div>
</template>

<script>
import Form from './components/Form'
import Header from './components/Header'
import Entries from './components/Entries'
export default {
    name: 'App',

    components: {
        Header,
        'projectForm': Form,
        'entries': Entries
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
};
</script>

<style scoped>

</style>