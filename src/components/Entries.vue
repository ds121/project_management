<template>
    <div>
        <v-container class="grey lighten-5">
            <v-row no-gutters>
                <v-col md="12" cols="12" elevation="2">
                    <v-card>
                        <v-card-title>
                            Project Details
                            <v-spacer></v-spacer>
                            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                        </v-card-title>
                        <v-data-table :headers="headers" :items="list" :search="search"></v-data-table>
                    </v-card>
    
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'Entries',
    data() {
        return {
            list: [],
            search: '',
            headers: [{
                    text: 'Project Title',
                    align: 'start',
                    sortable: false,
                    value: 'projectTitle',
                },
                { text: 'Project Title', value: 'projectTitle' },
                { text: 'Project Owner', value: 'projectOwner' },
                { text: 'Start Date', value: 'startDate' },
                { text: 'End Date', value: 'endDate' },
                { text: 'Collaborators', value: 'collaborators' },
                { text: 'Description', value: 'description' },
                { text: 'Comments', value: 'comments' },
            ],
        }
    },
    mounted() {
        this.axios.get('http://localhost:3001/api/posts').then((r) => {
            this.list = r.data
            console.warn(r.data)
        })
    }
}
</script>