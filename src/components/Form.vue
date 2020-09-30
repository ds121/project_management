<template>
    <v-container class="grey lighten-5">
        <v-row no-gutters :elevation="20">
            <v-col md="8" offset-md="2">
                <v-card class="pa-2" outlined :elevation="24">
                    <v-form method="post">
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <h2 class="text-center">
                                        Enter Project Details
                                    </h2>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="form.projectTitle" :rules="nameRules" label="Project Title" required></v-text-field>
                                </v-col>
    
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="form.projectOwner" :rules="nameRules" label="Project Owner" required></v-text-field>
                                </v-col>
                            </v-row>
    
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="form.collaborators" label="Collaborators" required></v-text-field>
                                </v-col>
    
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="form.description" :rules="nameRules" label="Description" required></v-text-field>
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
                                <v-col cols="12" md="10" offset-md="1">
                                    <v-textarea v-model="form.comments" label="Message" auto-grow outlined rows="3" row-height="35"></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6" offset-cols="3" md="2">
                                    <v-btn color="primary" large x-large type="submit" class="mr-4" v-on:click="submitForm" width=100%>
                                        Submit
                                    </v-btn>
                                </v-col>
                                <v-col cols="6" offset-cols="3" md="2">
                                    <v-btn color="error" large x-large type="reset" class="mr-4" width="100%">
                                        Reset Form
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
export default {
    name: "Form",
    data() {
        return{
            form: {
                projectTitle: null,
                projectOwner: null,
                collaborators: null,
                description: null,
                startDate: null,
                endDate: null,
                comments: [],
            },
            menu: false,
            menu2: false,
            nameRules: [
                v => !!v || 'Name is required',
            ],
        }
    },
    methods: {
        submitForm(e) {
            e.preventDefault();
            // console.warn(this.form)
            this.axios.post('http://localhost:3001/api/posts', this.form).then((r) => {
                console.warn(r)
            })
        },

    }
}
</script>