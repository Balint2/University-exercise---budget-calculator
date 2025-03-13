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

        const saveButton = incomeDiv.querySelector('.saveButton');
        const deleteButton = incomeDiv.querySelector('.deleteButton');

        saveButton.addEventListener('click', function () {
            console.log('Erre a gombra kattintottál:' + saveButton);
        })
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

    delete()
    {
        console.log("Delete")
    }

    change()
    {
        this.isSaved = false
    }

}




function addIncome() {
    const newIncome = document.createElement('div');
    newIncome.classList.add('input-container');
    newIncome.innerHTML = `
        <div>Bevétel típúsa: </div>
        <input type="text" placeholder="Mire kaptad a pénzt?">
        <div>Bevétel nagysága: </div>
        <input type="number" placeholder="Mennyit kaptál?">
        <button class="saveButton">Mentés</button>
        <button class="deleteButton">Törlés</button>
`;

    incomesDiv.appendChild(newIncome);

    incomes.push(new Income(newIncome))
    console.log(incomes.length)
}


addIncome()