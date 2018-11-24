import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'

import SearchModel from '../models/SearchModel.js'

const tag = '[MainController]'


export default{
    init(){
        
        FormView.setup(document.querySelector('form'))
          .on('@submit', e=> this.onSubmit(e.detail.input))
          .on('@reset',e=> this.onReset())

        ResultView.setup(document.querySelector('#search-result'))
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
        console.log(tag, 'onReset()')
    },

    onSearchResult(data){
        ResultView.render(data)
    }
}