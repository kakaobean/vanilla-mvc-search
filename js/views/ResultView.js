import View from './View.js'

const tag = '[ResultView]'

const ResultView = Object.create(View)

ResultView.message = {
    NO_RESULT : '검색 결과가 없습니다.'
}

ResultView.setup = function (el){
    this.init(el)
}

ResultView.render = function(data = []){
    console.log(tag, 'render()', data)
    this.el.innerHTML = data.length ? this.getSearchResultsHtml(data) : this.message.NO_RESULT
    this.show()
}

ResultView.getSearchResultsHtml = function (data){
    return JSON.stringify(data);
   // debugger
}

export default ResultView