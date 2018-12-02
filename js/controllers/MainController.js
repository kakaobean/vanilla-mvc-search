import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'
import SearchModel from '../models/SearchModel.js'
import KeywordView from '../views/KeywordView.js';
import KeywordModel from '../models/KeywordModel.js';

const tag = '[MainController]'


export default{
    init(){
        
        FormView.setup(document.querySelector('form'))
          .on('@submit', e=> this.onSubmit(e.detail.input))
          .on('@reset',e=> this.onReset())

        TabView.setup(document.querySelector('#tabs'))
            .on('@change', e => this.onCahngeTab(e.detail.tabName))

        KeywordView.setup(document.querySelector('#search-keyword'))
            .on('@click', e => this.onClickKeyword(e.detail.keyword))
           //.on('@right', e=> this.onChange())
        

        ResultView.setup(document.querySelector('#search-result'))

        this.selectedTab = '추천 검색어'
        this.renderView()
        
    },
    

    renderView(){
        console.log(tag, 'renderView()')
        TabView.setActiveTab(this.selectedTab)

        if(this.selectedTab === '추천 검색어'){
           this.fetchSearchKeword()
        }else {
            
        }
        ResultView.hide()
    },
    fetchSearchKeword(){

        KeywordModel.list().then(data => {
            KeywordView.render(data)
        })
    },

    search(query){
        console.log(tag, 'search()', query)
        // search api
        SearchModel.list(query).then(data => {
            this.onSearchResult(data)
        })
    },

    onSubmit(input){
        console.log(tag, 'onSubmit()', input)
        this.search(input)
    },

    onReset(){
        ResultView.hide();
        console.log(tag, 'onReset()')
    },

    onSearchResult(data){
        TabView.hide()
        KeywordView.hide()
        ResultView.render(data)
    },

    onCahngeTab(tabName){
        console.log(tabName)
    },

    onClickKeyword(keyword){
        this.search(keyword)
        console.log('aa'+keyword)
        FormView.placeholderView(keyword)
    }
    
}