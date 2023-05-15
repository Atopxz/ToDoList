// Seleção de elementos
const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")
const search = document.querySelector("#search")
//pega o primeiro elemento DOM com base no seletor CSS

let oldInputValue //p armazena texto antigo

//Funções

//função p criar outra toDO
const saveTodo = (text) => {
    const todo = document.createElement("div") //Cria um elemento no HTML
    todo.classList.add("todo") // Adiciona a classe desse elemento
    todo.id = "list" // Adiciona o id desse elemento

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text //Colocou o texto que o usuario digitou como h3
    todo.appendChild(todoTitle) //Coloca o h3 dentro da div

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>' //coloca esse código
    todo.appendChild(doneBtn)
    
    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>' //coloca esse código
    todo.appendChild(editBtn)
    
    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = '<i class="fa-solid fa-remove"></i>' //coloca esse código
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo)
    todoInput.value = '' //Limpa o inputs dps de add
    todoInput.focus() //Mantém o | no input

}

//função de voltar
const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}

//função de editar
const updateTodo = (text) => {
    const todos = document.querySelectorAll("#todo")

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3") //pega o título atual

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text
        }
    })
}


//   quando o usuario utiliza a busca
function searchTodo() {
    const searchValue = document.getElementById("search-input").value.toLowerCase() // Obtém o valor do input em letras minúsculas
    const todos = document.querySelectorAll("#list")

    todos.forEach((div) => {
        const todoTitle = div.querySelector("h3").innerText.toLowerCase()
        
        if (todoTitle.includes(searchValue)) {
            div.style.display = "flex"; // Exibe a tarefa correspondente
          } else {
            div.style.display = "none"; // Oculta as tarefas não correspondentes
          }
    });
}

//Eventos

//quando o usuário aperta p criar nova toDO
todoForm.addEventListener("submit", (e) => {
    e.preventDefault(); //Evita que o site recarregue quando enviar o formulário
    
    const inputValue = todoInput.value //Pega o que o usuário digitou e armazena
    if(inputValue){
        saveTodo(inputValue)
    }
})

//quando aperta nos botões do ToDo
document.addEventListener("click", (e) => {
    const targetEl = e.target //Captura o alvo do click
    const parentEl = targetEl.closest('div') //Captura o div mais próximo
    let todoTitle 


    if(parentEl && parentEl.querySelector('h3')) { //garante que o que pegou é o h3 e que é a div mais perto
        todoTitle = parentEl.querySelector('h3').innerText 
    }

    if(targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle('done') //vê se tem ou não a classe pra saber o que fazer(tirar ou colocar)
        parentEl.classList.toggle('todo') //vê se tem ou não a classe pra saber o que fazer(tirar ou colocar)
    }
    
    if(targetEl.classList.contains("remove-todo")) {
        parentEl.remove() //Remove a div mais proxima
    
    }
    
    if(targetEl.classList.contains("edit-todo")) {
        toggleForms()

        editInput.value = todoTitle //muda o valor do input
        oldInputValue = todoTitle //salva o valor anterior
    }

    cancelEditBtn.addEventListener('click', (e) => {
        e.preventDefault() //n recarrega a pag
        toggleForms() 

    })

// quandfo o usuario clica em editar
    editForm.addEventListener("submit", (e) => {
        e.preventDefault()

        const editInputValue = editInput.value //valor novo p ser trocado

        if(editInputValue){ //p não aceitar se tiver vazio
            updateTodo(editInputValue)// função p atualiza
            
        }

        toggleForms()
    })
})

//quando o usuario usa o filtro
document.addEventListener("change", (e) => {
    const filterValue = document.querySelector(".filter-select").value
    const todos = document.querySelectorAll("#list")
  
    todos.forEach((div) => {
      if (filterValue === "all") {
        div.style.display = "flex"; // Exibe todas as tarefas
      } else if (div.classList.contains(filterValue)) {
        div.style.display = "flex"; // // Exibe as tarefas que contem o valor como classe
      } else {
        div.style.display = "none"; // Esconde as que não correspondem
      }
    });
  });

//quando o usuario aperta o botão p apagar na pesquisa 
search.addEventListener('click', (e) => {
    e.preventDefault() //n recarrega a pag

    let searchInput = document.getElementById("search-input");
    let searchValue = searchInput.value;
    console.log(searchValue)

    if (searchValue.length > 0) {
        const newValue = searchValue.slice(0, searchValue.length -1)
        searchInput.value = newValue
    }
})
