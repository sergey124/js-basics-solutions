export default class Table {
    table = document.querySelector('.table')
    constructor() {
        document.querySelector('#addRowBtn').addEventListener('click', this.addRow.bind(this))

        this.table.addEventListener('click', this.onTableClick.bind(this))
        this.table.addEventListener('keyup', this.handleEnter.bind(this))
        this.table.addEventListener('dblclick', this.handleShowEditor.bind(this))
    }

    addRow(event) {
        const row = this.table.insertRow()
        row.insertCell(0).classList.add('dataCell')
        row.insertCell(1).classList.add('dataCell')
        row.insertCell(2).classList.add('removeBtn')
        event.target.scrollIntoView()
    }

    onTableClick(event) {
        const target = event.target

        this.removePreviousEditor(target)

        if (target.classList.contains('removeBtn')) {
            this.handleRemoveBtn(target)
        }
    }

    removePreviousEditor(dataCell) {
        const lastEdited = document.querySelector('.editedCell')
        if (lastEdited && dataCell != lastEdited) {
            lastEdited.parentElement.textContent = lastEdited.value
        }
    }

    removePreviousEditorOnKeyup() {
        const lastEdited = document.querySelector('.editedCell')
        if (lastEdited) {
            lastEdited.parentElement.textContent = lastEdited.value
        }
    }

    handleRemoveBtn(removeBtnNode) {
        const row = removeBtnNode.parentNode
        row.parentNode.deleteRow(row.rowIndex)
    }

    handleEnter(event) {
        if (event.keyCode == 13) {
            this.removePreviousEditorOnKeyup()
        }
    }

    handleShowEditor(event) {
        const target = event.target
        if (target.classList.contains('dataCell')) {
            const textInput = this.createTextInput(target)
            target.innerHTML = ''
            target.appendChild(textInput)
            textInput.focus()

            textInput.addEventListener('change', (event) => {
                const target = event.target
                target.parentElement.textContent = target.value
            })
        }
    }

    createTextInput(dataCell) {
        const cellContent = dataCell.textContent
        const textInput = document.createElement('input')

        textInput.type = 'text'
        textInput.setAttribute('placeholder', 'Enter text...')
        textInput.size = cellContent ? cellContent.length - 1 : 5
        textInput.classList.add('editedCell')
        textInput.value = cellContent

        return textInput
    }
}