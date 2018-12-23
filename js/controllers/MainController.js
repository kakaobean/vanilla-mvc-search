import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'
import SearchModel from '../models/SearchModel.js'
import KeywordView from '../views/KeywordView.js';
import KeywordModel from '../models/KeywordModel.js';
import HistoryView from '../views/HistoryView.js';
import HistoryModel from '../models/HistoryModel.js';
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
        HistoryView.setup(document.querySelector('#search-history'))
        .on('@click', e => this.onClickHistory(e.detail.keyword))
        .on('@remove', e => this.onRemoveHistory(e.detail.keyword))

        ResultView.setup(document.querySelector('#search-result'));

        this.selectedTab = '추천 검색어'
        this.renderView()
        
    },
    

    renderView(){
        TabView.setActiveTab(this.selectedTab)

        if(this.selectedTab === '추천 검색어'){
           this.fetchSearchKeword()
           HistoryView.hide()
        }else {
            this.fetchSearchHistory()
            KeywordView.hide()
        }

        ResultView.hide()
    },

    fetchSearchKeword(){
        KeywordModel.list().then(data => {
            KeywordView.render(data)
        })
    },

    fetchSearchHistory(){
        HistoryModel.list().then(data => {
            HistoryView.render(data).bindRemoveBtn();
        })
    },

    search(query){
        console.log(tag, 'search()', query)
        FormView.setValue(query);

        // search api
        SearchModel.list(query).then(data => {
            this.onSearchResult(data)
        })
        HistoryModel.add(query)
    },
   
    onSubmit(input){
        this.search(input)
    },

    onReset(){
        TabView.show();
        this.renderView()
        
    },

    onSearchResult(data){
        TabView.hide()
        KeywordView.hide()
        HistoryView.hide()
        ResultView.render(data)
    },

    onCahngeTab(tabName){
        this.selectedTab = tabName;
        this.renderView()
    },

    onClickKeyword(keyword){
        this.search(keyword)
    },

    onClickHistory(keyword){
        //HistoryModel.remove(keyword);
        this.search(keyword)
        
    },
    onRemoveHistory(keyword){
        HistoryModel.remove(keyword)
        this.renderView()
    }
}