// URL base da API
const API_URL = 'http://localhost:3000';

// Função para obter todos os dados (GET)
async function fetchData() {
    try {
        const response = await fetch(`${API_URL}/post`);
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Função para enviar dados (POST)
async function createData(titulo, descricao, url) {
    try {
        const response = await fetch(`${API_URL}/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ titulo, descricao, url }),
        });
        const data = await response.json();
        console.log('Data created:', data);
        fetchData(); // Atualizar a lista de dados
    } catch (error) {
        console.error('Error creating data:', error);
    }
}

// Função para excluir dados (DELETE)
async function deleteData(id) {
    try {
        const response = await fetch(`${API_URL}/post/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            console.log('Data deleted');
            fetchData(); // Atualizar a lista de dados
        } else {
            console.error('Error deleting data:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting data:', error);
    }
}

// Função para exibir dados no HTML
function displayData(data) {
    const dataList = document.getElementById('data-list');
    dataList.innerHTML = '';
    data.forEach(item => {
        const photoDiv = document.createElement('div');
        photoDiv.className = 'photo';

        const img = document.createElement('img');
        img.src = item.url;
        img.alt = item.titulo;

        const title = document.createElement('p');
        title.textContent = item.titulo;

        photoDiv.appendChild(img);
        photoDiv.appendChild(title);
        dataList.appendChild(photoDiv);
    });
}

// Event listeners
document.getElementById('create-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('titulo').value;
    const description = document.getElementById('descricao').value;
    const url = document.getElementById('url').value;
    createData(title, description, url);
});

document.getElementById('read-button').addEventListener('click', fetchData);

document.getElementById('delete-button').addEventListener('click', () => {
    const id = document.getElementById('delete-id').value;
    deleteData(id);
});
