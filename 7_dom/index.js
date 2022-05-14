import './style.css'
import ShowDimensions from './components/dimensions-show'
import TextSearch from './components/text-search'
import Slider from './components/slider.js'
import Table from './components/table.js'

const components = [
    {
        class: ShowDimensions,
        selector: '#width'
    },
    {
        class: TextSearch,
        selector: '.sourceText'
    },
    {
        class: Slider,
        selector: '#slider'
    },
    {
        class: Table,
        selector: '.table'
    }
]

components.forEach(component => {
    const node = document.querySelector(component.selector)
    if (node !== null) {
        new component.class(node, component.options)
    }
})