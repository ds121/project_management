<template>
    <div>
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
    </div>
</template>

<script>
export default {
    name: "Edit",
    data() {
        return {
            list: [],
            form: {
                projectTitle: "",
                projectOwner: "",
                collaborators: "",
                description: "",
                startDate:"",
                endDate:""
            },
            menu: false,
            menu2: false,
        }
    },
    mounted() {
        this.axios.get('http://localhost:3001/api/posts').then((r) => {
            this.list = r.data
            this.form.projectTitle = this.list[0].projectTitle
            this.form.projectOwner = this.list[0].projectOwner
            this.form.collaborators = this.list[0].collaborators
            this.form.description = this.list[0].description
            this.form.startDate = this.list[0].startDate
            this.form.endDate = this.list[0].endDate
            // console.warn(this.list)
        })
    }
}
</script>