const addIncomeButton = document.querySelector('#incomeAddButton')
const addExpenseButton = document.querySelector('#expenseAddButton')
const incomesDiv = document.querySelector('.incomes')
const expensesDiv = document.querySelector('.expenses')
const incomes = []
const expenses = []

// Hozzáadjuk a kattintás eseményfigyelőt


addIncomeButton.addEventListener('click', function () {
    addIncome()
})
addExpenseButton.addEventListener('click', function () {
    addExpense()
})




class Income {
    constructor(incomeDiv, parentDiv, containerList) {
        this.parentDiv = parentDiv
        this.incomeDiv = incomeDiv
        this.containerList = containerList

        const deleteButton = incomeDiv.querySelector('.deleteButton');

        deleteButton.addEventListener('click', () => {
            this.selfDelete()
        })
    }


    selfDelete() {
        this.parentDiv.removeChild(this.incomeDiv)
        this.incomeDiv = null
        let index = this.containerList.findIndex(income => income.incomeDiv === null)
        console.log(index)
        this.containerList.splice(index)
        
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
    
    incomes.push(new Income(newIncome, incomesDiv, incomes))
    console.log(incomes.length)
}

function addExpense() {
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
        <label>Kiadás típúsa: </label>
        <input type="text" placeholder="Mire költötted a pénzt?">
        <label>Kiadás nagysága: </label>
        <input type="number" placeholder="Mennyit költöttél?" min="0" step="1">

        <button class="deleteButton">Törlés</button>
`

    expensesDiv.appendChild(newIncome);
    
    expenses.push(new Income(newIncome, expensesDiv, expenses))
    console.log(expenses.length)
}


addIncome()
addExpense()



document.getElementById('showButton').addEventListener('click', function () {
    let dataToSend = [];

    const incomeRows = incomesDiv.getElementsByClassName('input-container');
    for (let row of incomeRows) {
        const inputs = row.getElementsByTagName('input');
        let year = parseInt(inputs[0].value);


        let month = row.getElementsByTagName('select')[0].value;
        let type = inputs[1].value;
        let amount = parseInt(inputs[2].value);


        if (!isNaN(year) && !isNaN(month) && !isNaN(amount)) {
            dataToSend.push({
                year: year,
                month: month,
                amount: amount,
                isExpense: false
            });
        }
    }

    expenseRows = expensesDiv.getElementsByClassName('input-container');
    for (let row of expenseRows) {
        const inputs = row.getElementsByTagName('input');
        let year = parseInt(inputs[0].value);


        let month = row.getElementsByTagName('select')[0].value;
        let type = inputs[1].value;
        let amount = parseInt(inputs[2].value);


        if (!isNaN(year) && !isNaN(month) && !isNaN(amount)) {
            dataToSend.push({
                year: year,
                month: month,
                amount: amount,
                isExpense: true
            });
        }
    }

    // Küldés API-ra
    fetch('http://localhost:5000/api/statistics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
        .then(data => {
            //console.log("Beérkezett adatok:", data);
            ShowStatistics(data);
        })
    .catch(error => console.error('Hiba:', error));
});


const Colors = {
    RED: 'red',
    GREEN: 'green',
    WHITE: 'white'
};

function ShowStatistics(datas)
{
    const diagram = document.querySelector('.diagram-container');
    if (diagram) {
        diagram.remove();
    }
    const statisticsContainer = document.createElement('div');
    statisticsContainer.classList.add('section-container');
    statisticsContainer.classList.add('diagram-container');





    const upperGridContainer = document.createElement('div');
    upperGridContainer.classList.add('grid-container');


    datas.forEach(data => {
        if (data.totalAmount > 0) {
            addColumn(upperGridContainer, Colors.GREEN, data.totalAmount / 1000)
        }
        else {
            addColumn(upperGridContainer, Colors.WHITE, data.totalAmount / 1000)
        }

    });


    statisticsContainer.appendChild(upperGridContainer)






    const line = document.createElement('div');
    line.classList.add('line')
    statisticsContainer.appendChild(line)





    const lowerGridContainer = document.createElement('div');
    lowerGridContainer.classList.add('grid-container');



    datas.forEach(data => {
        if (data.totalAmount < 0) {
            addColumn(lowerGridContainer, Colors.RED, data.totalAmount / 1000)
        }
        else {
            addColumn(lowerGridContainer, Colors.WHITE, data.totalAmount / 1000)
        }

    });


    /*
    datas.filter(data => data.totalAmount < 0).forEach(data => {
        addColumn(lowerGridContainer, false, -data.totalAmount / 1000)
    });*/


    statisticsContainer.appendChild(lowerGridContainer)





    document.body.appendChild(statisticsContainer)
}

function addColumn(grid, color, amount) {
    const column = document.createElement('div');
    if (color == Colors.RED) {
        column.classList.add('lowerColumn')
    }
    else if (color == Colors.GREEN) {
        column.classList.add('upperColumn')
    }
    else
    {
        column.classList.add('emptyColumn')
    }
    grid.appendChild(column)
}