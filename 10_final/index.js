import './style.css'
import TaskLists from './components/task-lists'

const components = [
    {
        class: TaskLists,
        selector: '.contentContainer'
    }
]

components.forEach(component => {
    const node = document.querySelector(component.selector)
    if (node !== null) {
        new component.class(node, component.options)
    }
})