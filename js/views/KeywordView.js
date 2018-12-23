import View from './View.js'

const tag = '[KeywordView]'

const KeywordView = Object.create(View)

KeywordView.setup = function(el){
    console.log(el)
    this.init(el)
    //return this
    
    return this
   
}

KeywordView.render = function(data = []) {
    this.el.innerHTML = data.length ? this.getKeywordHtml(data) : '추천 검색어가 없습니다.'
    console.log('kewordView'+data)

    this.bindClickEvent()
    this.show()
    return this;
}

KeywordView.getKeywordHtml = function(data){
    return data.reduce((html, item, index) => {
    html += `<li data-keyword="${item.keyword}">
    <span class="number"> ${index + 1} </span>
    ${item.keyword}
    </li>`
    return html
    }, '<ul class="list">') + '</ul>'
}

KeywordView.bindClickEvent = function(){
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        console.log(this.el)
        li.addEventListener('click', e=> this.onClickKeyword(e))
    })
}

KeywordView.onClickKeyword = function(e) {
    const {keyword}  = e.currentTarget.dataset;
    this.emit('@click', {keyword})
    
}
export default KeywordView