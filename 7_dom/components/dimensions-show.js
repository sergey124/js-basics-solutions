export default class ShowDimensions {
    constructor() {
        let widthElem = document.querySelector('#width')
        let heightElem = document.querySelector('#height')

        function reportWindowSize() {
            widthElem.textContent = 'width: ' + window.innerWidth
            heightElem.textContent = 'height: ' + window.innerHeight
        }

        window.onresize = reportWindowSize
    }
}