var app = new Vue({
  el:"#myapp",
  data:{stories:[], page:"storylist", currentStoryIndex:null, words:[] },
  methods:{ openStory(){
            this.currentStoryIndex=event.target.id; this.page="story";
            },
            openStoryList(){
              this.page="storylist";
            },
            hightlighttoggle(){
              event.target.className= event.target.className=="hightlight"?"":"hightlight"
            },
            savewords(){
              Array.from(document.querySelectorAll(".hightlight")).forEach(a=>{
                var [word]= a.innerText.toLowerCase().match(/[a-z]+/);
                wordAlreadyInList = this.words.find(a=>a.word==word);
                if(!wordAlreadyInList)
              this.words.push({word: word, meaning:"", storyid:this.currentStoryIndex, state:"new"});
              })
            },
            newword(value){
              var matches = value.match(/[a-z]+/);
              if(matches)
               matchedword = this.words.find(a=>a.word==matches[0]);
              if(matchedword){return matchedword.state =="new"? true: false;}
              return false;
            },
            totatwords(){

            }
        },
  filters: {


            },
  computed:{
          paras(): function(){ return this.stories[this.currentStoryIndex].paragraphs.map(a=>a.split(" ").map(a=>a+" ")); },
          currentStory: function(){return this.stories[this.currentStoryIndex]}
  }
});

if(localStorage.stories) app.stories = JSON.parse(localStorage.stories);
else
fetch("https://sekhoniqbal.ddns.net:3000/stories").then(a=>a.json()).then(a=>{app.stories = a; localStorage.stories = json.stringify(a)});
