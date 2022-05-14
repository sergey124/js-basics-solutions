export default class TaskLists {
    todoTable = document.querySelector('#todoTable')
    doneTable = document.querySelector('#doneTable')
    todoList = Array()
    doneList = Array()

    constructor() {
        document.querySelector('#addNewTaskBtn').addEventListener('click', this.addItem.bind(this))
        document.querySelector('#clearTodoList').addEventListener('click', this.clearTodoList.bind(this))
        document.querySelector('#clearDoneList').addEventListener('click', this.clearDoneList.bind(this))
        document.querySelector('#main').addEventListener('click', this.onContentClick.bind(this))
        document.querySelector('#main').addEventListener('dblclick', this.handleShowEditor.bind(this))
        document.querySelector('#main').addEventListener('keyup', this.handleEnter.bind(this))

        document.querySelector('.searchField').addEventListener('input', (event) => {
            const query = this.sanitize(event.target.value)

            this.filterTables(query)
        })

        this.initListsFromStorage();
    }

    filterTables(query) {
        const filteredTodoList = this.filterList(this.todoList, query)
        const filteredDoneList = this.filterList(this.doneList, query)

        this.fillTablesFromLists(filteredTodoList, filteredDoneList)
    }

    filterList(list, query) {
        if (query !== '') {
            return list.filter(item => {
                return item.text.toLowerCase().includes(query.toLowerCase())
            })
        } else {
            return list
        }
    }

    sanitize(string) {
        return string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    }

    initListsFromStorage() {
        const storedTodoList = localStorage.getItem('todoList')

        if (storedTodoList) {
            this.restoreFromStorage();
        } else {
            this.initListsFromTemplate()
            this.populateStorage();
        }

        this.fillTablesFromLists(this.todoList, this.doneList)
    }

    initListsFromTemplate() {
        this.todoList.push({
            text: 'Do homework',
            startDate: this.getDateFromAmPmString('7:53 PM')
        })

        this.doneList.push({
            text: 'Report current day work in time journal',
            startDate: this.getDateFromAmPmString('9:00 AM')
        })
    }

    populateStorage() {
        console.log('populated: ')
        console.log(this.todoList)
        console.log(this.doneList)
        localStorage.setItem('todoList', JSON.stringify(this.todoList))
        localStorage.setItem('doneList', JSON.stringify(this.doneList))
    }

    restoreFromStorage() {
        this.todoList = JSON.parse(localStorage.getItem('todoList'))
        this.doneList = JSON.parse(localStorage.getItem('doneList'))
        console.log('restored: ')
        console.log(this.todoList)
        console.log(this.doneList)
    }

    fillTablesFromLists(todoList, doneList) {
        this.fillTableFromList(this.todoTable, todoList)
        this.fillTableFromList(this.doneTable, doneList)
    }

    fillTableFromList(table, list) {
        this.clearTable(table)
        list.forEach(item => {
            this.addTodoItem(item, table)
        })
    }

    getDateFromAmPmString(timeStr) {
        const today = new Date()
        let [hours, minutes] = timeStr.substr(0, timeStr.length - 2).split(":").map(Number)
        if (timeStr.includes('PM') && hours !== 12) hours += 12
        today.setHours(hours)
        today.setMinutes(minutes)
        return today
    }

    addItem(event) {
        const newTaskInput = document.querySelector('#newTaskInput')
        const item = {
            text: newTaskInput.value,
            startDate: new Date()
        }
        newTaskInput.value = ''

        this.todoList.push(item)
        this.populateStorage()
        this.addTodoItem(item, this.todoTable)
    }

    addTodoItem(item, table) {
        const inputText = item.text

        const newRow = table.insertRow()
        newRow.classList.add('todoItem')
        const todoText = newRow.insertCell()
        todoText.classList.add('todoText')

        const checkbox = document.createElement('input')
        checkbox.classList.add('todoCheckbox')
        checkbox.type = 'checkbox'
        todoText.appendChild(checkbox)

        const textElement = document.createElement('span')
        textElement.textContent = inputText
        todoText.appendChild(textElement)

        const dateCell = newRow.insertCell()
        dateCell.classList.add('todoDateCell')
        this.addDateContent('todoDate', item.startDate, dateCell)
        if (table.id == 'doneTable') {
            checkbox.checked = true
            let endDate = item.endDate ? item.endDate : new Date()
            this.addDateContent('doneDate', endDate, dateCell)
        }

        const removeBtn = newRow.insertCell()
        removeBtn.classList.add('removeBtn')
    }

    addDateContent(contentClass, date, dateCell) {
        const dateDiv = document.createElement('div')
        if (typeof date == 'string') {
            date = new Date(date)
        }
        dateDiv.textContent = this.formatDate(date)
        dateDiv.classList.add(contentClass)

        dateCell.appendChild(dateDiv)
    }

    formatDate(date) {
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var ampm = hours >= 12 ? 'PM' : 'AM'
        hours = hours % 12
        hours = hours ? hours : 12
        minutes = minutes < 10 ? '0' + minutes : minutes
        var strTime = hours + ':' + minutes + ' ' + ampm
        return strTime
    };

    clearTodoList() {
        this.todoList = new Array()
        this.populateStorage()
        this.clearTable(this.todoTable)
    }

    clearDoneList() {
        this.doneList = new Array()
        this.populateStorage()
        this.clearTable(this.doneTable)
    }

    clearTable(table) {
        const tableBody = table.getElementsByTagName('tbody')[0]
        if (tableBody) {
            tableBody.innerHTML = ""
        }
    }
    onContentClick(event) {
        const target = event.target

        this.removePreviousEditor(target)

        if (target.classList.contains('todoCheckbox')) {
            this.moveTask(event)
        }
        if (target.classList.contains('removeBtn')) {
            this.handleRemoveBtn(target)
        }
    }

    moveTask(event) {
        const checkbox = event.target
        const row = checkbox.parentNode.parentNode
        const rowIndex = row.rowIndex
        const done = row.parentNode.parentNode.id == 'todoTable'
        checkbox.checked = done
        let targetTable
        if (done) {
            const doneItem = this.todoList.splice(rowIndex, 1)[0]
            doneItem.endDate = new Date()
            this.doneList.push(doneItem)
            this.populateStorage();
            targetTable = this.doneTable
            const dateCell = row.querySelector('.todoDateCell')
            this.addDateContent('doneDate', new Date(), dateCell)
        } else {
            const deletedItems = this.doneList.splice(rowIndex, 1)
            this.todoList.push(...deletedItems)
            this.populateStorage();
            targetTable = this.todoTable
            const doneDate = row.querySelector('.doneDate')
            if (doneDate) {
                doneDate.remove()
            }
        }
        targetTable.getElementsByTagName('tbody')[0].appendChild(row)
    }

    handleRemoveBtn(removeBtnNode) {
        const row = removeBtnNode.parentNode
        row.parentNode.deleteRow(row.rowIndex)
    }

    handleShowEditor(event) {
        const target = event.target
        if (target.classList.contains('todoText')) {
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

    handleEnter(event) {
        if (event.keyCode == 13) {
            this.removePreviousEditorOnKeyup()
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
}
