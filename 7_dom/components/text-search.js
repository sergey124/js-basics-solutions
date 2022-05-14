export default class TextSearch {
    searchedTextElem = document.querySelector('.searchedText')
    text = ''
    query

    constructor() {
        document.querySelector('.sourceText').addEventListener('input', (event) => {
            this.text = this.sanitize(event.target.value)
            this.redrawSearchedText()
        })

        document.querySelector('.searchQuery').addEventListener('input', (event) => {
            this.query = this.sanitize(event.target.value)
            this.redrawSearchedText()
        })
    }

    redrawSearchedText() {
        const boldText = document.createElement('b')
        boldText.textContent = this.query
        console.log(this.text)
        this.searchedTextElem.innerHTML = this.text.split(this.query).join(boldText.outerHTML)
    }

    sanitize(string) {
        return string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    }
}