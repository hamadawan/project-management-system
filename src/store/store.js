import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/router'
import { auth, usersCollection, projectsCollection, bugsCollection } from '../firebase/firebase'

Vue.use(Vuex)

const initialState = {
  login: false,
  user:{},
  projects:[],
  bugs:[],
  bug:{},
  project: {
    title:'',
    details:''
  },
  developers:[],
  developer:{},
  qa:{},
  qas:[],
  loading: false,
  error:{
    isError: false,
    message: ''
  }
}

const store = new Vuex.Store({

  state: initialState,

  mutations: {
    setUser (state, payload) {
      state.user= payload
      state.login = true
    },
    addProjects(state,payload){
      state.projects = payload
    },
    addProject(state,payload){
      state.projects.push(payload)
    },

    addBug(state,payload){
      state.bugs.push(payload)
    },
    
    addDevelopers(state,payload){
      state.developers = payload
    },
    addQAs(state,payload){
      state.qas = payload
    },

    addBugs(state,payload)
    {
      state.bugs = payload
    },

    updateBugStatus(state, payload){
      state.bug.status = payload
    },
    
    setProject(state, payload){
      state.project = state.projects[payload]
    },

    setBug(state, payload){
      state.bug = state.bugs[payload]
    },

    setQa(state, payload){
      state.qa = payload
    },
    setDeveloper(state, payload){
      state.developer = payload
    },
    
    setError (state, payload) {
      state.error.message= payload.message
      state.error.isError = payload.isError
    },
    logout(state){
      state = initialState
      state.login = false
    },

    loading(state,payload)
    {
      state.loading = payload
    }

  },

  actions: {

    async fetchProjects({commit}){

      var projects = []
      var query
      if(this.state.user.role=="Manager")
      {
        query = await projectsCollection.where("mid","==", store.state.user.uid).get();
        query.forEach(doc => {
          projects.push(doc.data())
        })
      }
      else if(this.state.user.role=="Developer")
      {
        query = await projectsCollection.where("developers","array-contains", store.state.user.uid).get();
        query.forEach(doc => {
          projects.push(doc.data())
        })

      }
      else if(this.state.user.role=="QA")
      {
        query = await projectsCollection.where("qas","array-contains", store.state.user.uid).get();
        query.forEach(doc => {
          projects.push(doc.data())
        })
      }    
      commit("addProjects", projects)

    },

    async fetchUser({commit},payload){
      const query = await usersCollection.where("uid","in", payload.array).get()
      var users = []
      query.forEach(doc => {
          users.push(doc.data())
      })

      if(payload.role=="Developer")
          commit("addDevelopers", users)
      else if (payload.role == "QA")
          commit("addQAs", users)
    },

    async fetchBug({commit},payload){
      var query
      if(store.state.user.role=="Developer")
      {
        query = await bugsCollection.where("pid","==", payload)
                                    .where("did","==",store.state.user.uid)
                                    .get() 
      }
      else{
        query = await bugsCollection.where("pid","==", payload).get()
      }
      
      var bugs = []
      query.forEach(doc => {
          bugs.push(doc.data())
      })
      commit("addBugs", bugs)
    },

    async goToAddProject({commit}){
      
      router.push("/AddProject")
      
      commit("loading",true)

      var queryD = await usersCollection.where("role","==","Developer").get();
      var queryQ = await usersCollection.where("role","==","QA").get();
      
      commit("loading",false)

      var devs= []
      var qas = []

      queryD.forEach(doc => {
        devs.push(doc.data())
      })

      queryQ.forEach(doc => {
        qas.push(doc.data())
      })

      commit("addDevelopers", devs)
      commit("addQAs", qas)
      
    },

    async projectDetails({dispatch}){

      dispatch("fetchUser",{array: store.state.project.developers, role: "Developer"})
      dispatch("fetchUser",{array: store.state.project.qas, role: "QA"})
      dispatch("fetchBug",store.state.project.pid)
      
    },

    async goToCreateBug({commit}){

      router.push("/CreateBug")
      commit("loading",true)

      const query = await usersCollection.where("uid","in", this.state.project.developers).get()
      var devs= []
      query.forEach(doc => {
        devs.push(doc.data())
      })
      commit("addDevelopers", devs)
      
      commit("loading",false)

    },

    async goToBugDetails({commit},payload){

      commit("setBug",payload)
      router.push("/BugDetails")

      commit("loading",true)
      const dev = await usersCollection.doc(this.state.bug.did).get()
      const qa = await usersCollection.doc(this.state.bug.qid).get()
      
      commit("setDeveloper", dev.data())
      commit("setQa", qa.data())
      
      commit("loading",false)

    },

    async updateBugStatus({commit}, payload){
      await bugsCollection.doc(store.state.bug.bid).update({
        status: payload
      })
      commit("updateBugStatus", payload)
      router.push("/ProjectDetails")
    },

    async addProject({commit}, payload)
    {
        var ref = await projectsCollection.doc()
        var project = {
          title: payload.title,
          details: payload.details,
          developers: payload.developers,
          qas: payload.qas,
          pid:ref.id,
          mid: store.state.user.uid
        }
        await projectsCollection.doc(ref.id).set(project)
        commit("addProject", project)
        router.push("/")
    },

    async addBug({commit}, payload)
    {
        var ref = await bugsCollection.doc()
        var bug = {
          title: payload.title,
          details: payload.details,
          status: payload.status,
          did: payload.did,
          qid: payload.qid,
          pid: payload.pid,
          bid: ref.id
        }
        await bugsCollection.doc(ref.id).set(bug)
        commit("addBug", bug)
        router.push("/ProjectDetails")
    },

    setProject({commit},payload){
      commit("setProject", payload)
      router.push("/ProjectDetails")
    },

    setBug({commit},payload){
      commit("setBug", payload)
      console.log(payload, "set Bug")
      router.push("/BugDetails")
    },

    async signup({commit}, payload) {
      try{
        const {user} = await auth.createUserWithEmailAndPassword(payload.email, payload.password)
        var userData = {
          name: payload.name,
          email: payload.email,
          role: payload.role,
          uid: user.uid
        }
        await usersCollection.doc(user.uid).set(userData)
        commit('setUser', userData)
        router.push('/')
      }
      catch(error)
      {
          commit('setError', { isError: true, message:error.message})
      }
    },

    async login({commit}, payload) {
      try{
        const {user} = await auth.signInWithEmailAndPassword(payload.email, payload.password)
        var userData = await usersCollection.doc(user.uid).get()
        commit('setUser', userData.data())
        router.push('/')
      }
      catch(error)
      {
          commit('setError', { isError: true, message:error.message})
      }
    },

    logout({commit}){
      auth.signOut().then(()=>{
        commit("logout")
      })
    },

    async setUser(context,user){
      context.commit('setUser', user)
    },

    setError({commit}, payload){
      commit('setError', payload)
    }

  }
  
})

export default store
