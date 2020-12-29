<template>
    <div>
        <v-container class="grey lighten-5" fluid>
            <v-row no-gutters>
                <v-container class="grey lighten-5">
                    <v-row no-gutters>
                        <v-col md="12" cols="12" elevation="2">
                            <v-card>
                                <v-card-title>
                                    Project Details
                                    <v-spacer></v-spacer>
                                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                                </v-card-title>
                                <v-data-table :headers="headers" :items="list" :search="search">
                                    <template v-slot:item="col">
                                            <tr>
                                                <td>
                                                    {{ col.index+1 }}
                                                </td>
                                                <td>
                                                    {{ col.item.projectTitle }}
                                                </td>
                                                <td>
                                                    {{ col.item.projectOwner }}
                                                </td>
                                                <td>
                                                    {{ col.item.startDate }}
                                                </td>
                                                <td>
                                                    {{ col.item.endDate }}
                                                </td>
                                                <td>
                                                    {{ col.item.collaborators }}
                                                </td>
                                                <td>
                                                    {{ col.item.description }}
                                                </td>
                                                <td>
                                                    {{ col.item.comments }}
                                                </td>
                                                <td>
                                                    <tr>
                                                        <td>
                                                            <v-dialog v-model="dialog" max-width="600" min-width="100">
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn class="mx-1" fab dark x-small color="indigo" v-bind="attrs" v-on="on">
                                                                        <v-icon dark>mdi-plus</v-icon>
                                                                    </v-btn>
                                                                </template>
                                                                <v-card>
                                                                <v-card-title class="headline grey lighten-2">
                                                                    Add Comments
                                                                </v-card-title>
                                                                <v-card-text>
                                                                    <v-form>
                                                                        <v-container>
                                                                            <v-row>
                                                                                <v-col cols="12">
                                                                                    {{ form.comment }}
                                                                                    <v-textarea label="Type Your Comments" v-modal="form.comment" auto-grow outlined rows="6" row-height="30"></v-textarea>
                                                                                </v-col>
                                                                            </v-row>
                                                                        </v-container>
                                                                            <v-divider></v-divider>
                                                                            <v-card-actions>
                                                                            <v-spacer></v-spacer>
                                                                                <v-btn color="primary" text @click="[dialog = false, addComment(col.item._id,col.index)]">Save</v-btn>
                                                                            </v-card-actions>
                                                                    </v-form>
                                                                </v-card-text>
                                                                </v-card>
                                                            </v-dialog>
                                                
                                                        </td>
                                                        <td>
                                                            <v-dialog v-model="EditFormDialog" persistent max-width="1000">
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn color="cyan" dark fab x-small v-bind="attrs" v-on="on">
                                                                        <v-icon dark>mdi-pencil</v-icon>
                                                                    </v-btn>
                                                                </template>
                                                                <v-card>
                                                                    <v-card-title class="headline cyan lighten-2">
                                                                        Change Project Details
                                                                    </v-card-title>
                                                                <v-card-text>
                                                                    <v-container>
                                                                        <v-row>
                                                                            <v-col cols="12">
                                                                                <!-- <Edit /> -->
                                                                                <v-form>
                                                                                    <v-container>
                                                                                        <v-row>
                                                                                            <v-col cols="12" md="6">
                                                                                                <v-text-field v-model="form.projectTitle" label="Project Title"></v-text-field>
                                                                                            </v-col>
                                                                            
                                                                                            <v-col cols="12" md="6">
                                                                                                <v-text-field v-model="form.projectOwner" label="Project Owner"></v-text-field>
                                                                                            </v-col>
                                                                                        </v-row>
                                                                                        <v-row>
                                                                                            <v-col cols="12" md="6">
                                                                                                <v-text-field v-model="form.collaborators" label="Collaborators"></v-text-field>
                                                                                            </v-col>
                                                                                            <v-col cols="12" md="6">
                                                                                                <v-text-field v-model="form.description" label="Description"></v-text-field>
                                                                                            </v-col>
                                                                                        </v-row>
                                                                                        <v-row>
                                                                                            <v-col cols="12" md="6">
                                                                                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="form.startDate" transition="scale-transition" offset-y min-width="290px">
                                                                                                    <template v-slot:activator="{ on, attrs }">
                                                                                                        <v-text-field
                                                                                                        v-model="form.startDate"
                                                                                                        label="Start Date"
                                                                                                        prepend-icon="mdi-calendar"
                                                                                                        readonly
                                                                                                        v-bind="attrs"
                                                                                                        v-on="on"
                                                                                                        ></v-text-field>
                                                                                                    </template>
                                                                                                    <v-date-picker
                                                                                                        v-model="form.startDate"
                                                                                                        no-title
                                                                                                        scrollable
                                                                                                        >
                                                                                                        <v-spacer></v-spacer>
                                                                                                        <v-btn
                                                                                                        text
                                                                                                        color="primary"
                                                                                                        @click="menu = false"
                                                                                                        >
                                                                                                        Cancel
                                                                                                        </v-btn>
                                                                                                        <v-btn
                                                                                                        text
                                                                                                        color="primary"
                                                                                                        @click="$refs.menu.save(form.startDate)"
                                                                                                        >
                                                                                                        OK
                                                                                                        </v-btn>
                                                                                                    </v-date-picker>
                                                                                            </v-menu>
                                                                                            </v-col>
                                                                                            <v-col cols="12" md="6">
                                                                                                <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :return-value.sync="form.endDate" transition="scale-transition" offset-y min-width="290px">
                                                                                                <template v-slot:activator="{ on, attrs }">
                                                                                                    <v-text-field v-model="form.endDate" label="End Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on">
                                                                                                    </v-text-field>
                                                                                                </template>
                                                                                                <v-date-picker
                                                                                                    v-model="form.endDate"
                                                                                                    no-title
                                                                                                    scrollable
                                                                                                >
                                                                                                    <v-spacer></v-spacer>
                                                                                                    <v-btn
                                                                                                    text
                                                                                                    color="primary"
                                                                                                    @click="menu2 = false"
                                                                                                    >
                                                                                                    Cancel
                                                                                                    </v-btn>
                                                                                                    <v-btn
                                                                                                    text
                                                                                                    color="primary"
                                                                                                    @click="$refs.menu2.save(form.endDate)"
                                                                                                    >
                                                                                                    OK
                                                                                                    </v-btn>
                                                                                                </v-date-picker>
                                                                                                </v-menu>
                                                                                            </v-col>
                                                                                        </v-row>
                                                                                        <v-row>
                                                                                            <v-col cols="12" md="2">
                                                                                                <v-btn color="primary" large x-large type="submit" class="mr-4"  width=100%>
                                                                                                    Submit
                                                                                                </v-btn>
                                                                                                <!-- <v-text-field v-model="form.description" label="Description"></v-text-field> -->
                                                                                            </v-col>
                                                                            
                                                                                            <v-col cols="12" md="2">
                                                                                                <v-btn color="error" large x-large type="reset" class="mr-4"  width=100%>
                                                                                                    Reset Form
                                                                                                </v-btn>
                                                                                                <!-- <v-text-field v-model="lastname" :counter="10" label="Last name"></v-text-field> -->
                                                                                            </v-col>
                                                                                        </v-row>
                                                                                    </v-container>
                                                                                </v-form>
                                                                            </v-col>
                                                                        </v-row>
                                                                    </v-container>
                                                                </v-card-text>
                                                                    <v-card-actions>
                                                                        <v-spacer></v-spacer>
                                                                        <v-btn color="teal darken-1"  tile @click="EditFormDialog = false" >Cancel</v-btn>
                                                                    </v-card-actions>
                                                                </v-card>
                                                            </v-dialog>
                                                        </td>
                                                        <td>
                                                            <v-btn class="mx-1" fab dark x-small @click="deleteOne(col.item._id)">
                                                                <v-icon dark>mdi-delete</v-icon>
                                                            </v-btn>
                                                        </td>
                                                    </tr>
                                                </td>    
                                            </tr>                                
                                    </template>
                                </v-data-table>
                            </v-card>
    
                        </v-col>
                    </v-row>
                </v-container>
            </v-row>
        </v-container>
        <!-- <Edit /> -->
    </div>
</template>

<script>
// import Edit from './Edit'
export default {
    name: 'Entries',
    components: {
        // Edit,
    },
    data() {
        return {
            list: [],
            search: '',
            headers: [
                { text: 'Sr. No.', value: 'Index' },
                {
                    text: 'Project Title',
                    align: 'start',
                    sortable: false,
                    value: 'projectTitle',
                },
                { text: 'Project Owner', value: 'projectOwner' },
                { text: 'Start Date', value: 'startDate' },
                { text: 'End Date', value: 'endDate' },
                { text: 'Collaborators', value: 'collaborators' },
                { text: 'Description', value: 'description' },
                { text: 'Comments', value: 'comments' },
                { text: 'Actions', value: 'action' }
            ],
            form:{
                projectTitle: '',
                projectOwner: '',
                collaborators: '',
                description: '',
                startDate:'',
                endDate: '',
            },
            comment: '',
            dialog: false,
            Editdialog: false,
            EditFormDialog: false,
            menu: false,
            menu2: false,
        }
    },
    methods:{
        getEntries(){
            this.axios.get('http://localhost:3001/api/posts').then((r) =>{
                this.list = r.data
            // console.warn('getEntries: ',this.list[1].comments)
            })
        },
        deleteOne(id){
            this.axios.delete('http://localhost:3001/api/posts/'+ id).then(() => {
                // this.list = r.data
                this.getEntries()
                console.warn('One has deleted')
            })
        },
        addComment(id){
            this.axios.put('http://localhost:3001/api/posts/'+ id).then(() => {
                // this.list[index].comments.push(this.form.comment)
                // console.warn(this.form.comment)

            })
        }
    },
    mounted() {
        this.axios.get('http://localhost:3001/api/posts').then((r) => {
            this.list = r.data
            // console.warn(r.data)
        }),
        this.getEntries()
    }
}
</script>