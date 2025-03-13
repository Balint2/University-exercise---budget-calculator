const addButton = document.querySelector('.addButton')
const incomesDiv = document.querySelector('.incomes')
const incomes = []

// Hozzáadjuk a kattintás eseményfigyelőt
addButton.addEventListener('click', function () {
    addIncome()
})




class Income {
    constructor(incomeDiv) {
        this.isSaved = false
        this.type = ""
        this.quantity = 0
        this.incomeDiv = incomeDiv

        //const saveButton = incomeDiv.querySelector('.saveButton');
        const deleteButton = incomeDiv.querySelector('.deleteButton');

        /*saveButton.addEventListener('click', function () {
            console.log('Erre a gombra kattintottál:' + saveButton);
        })*/
        deleteButton.addEventListener('click', function () {
            console.log('Erre a gombra kattintottál:' + deleteButton);
            incomesDiv.removeChild(incomeDiv)
        })
    }

    save(type, quantity) {
        this.isSaved = true
        this.type = type
        this.quantity = quantity
    }

    delete() {
        console.log("Delete")
    }

    change() {
        this.isSaved = false
    }

}




function addIncome() {
    const newIncome = document.createElement('div');
    newIncome.classList.add('input-container');
    newIncome.innerHTML = `
        <label>Év: </label>
        <input type="number" placeholder="Adj meg egy évszámot!" min="0" step="1">
        <label>Hónap: </label>
        <select class="montChoosing" name="montChoosing">
            <option value=1>január</option>
            <option value=1>február</option>
            <option value=3>március</option>
            <option value=4>április</option>
            <option value=5>május</option>
            <option value=6>június</option>
            <option value=7>július</option>
            <option value=8>augusztus</option>
            <option value=9>szeptember</option>
            <option value=10>október</option>
            <option value=11>november</option>
            <option value=12>december</option>
        </select>
        <label>Bevétel típúsa: </label>
        <input type="text" placeholder="Mire kaptad a pénzt?">
        <label>Bevétel nagysága: </label>
        <input type="number" placeholder="Mennyit kaptál?" min="0" step="1">

        <button class="deleteButton">Törlés</button>
`

    incomesDiv.appendChild(newIncome);

    incomes.push(new Income(newIncome))
    console.log(incomes.length)
}


addIncome()