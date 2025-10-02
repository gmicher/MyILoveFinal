// Sistema de Anotações em JavaScript

// Recupera as notas armazenadas no navegador (LocalStorage) ou inicia com um array vazio
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Filtro atual (ex.: todas, por categoria específica, etc.)
let currentFilter = 'all';

// Quando a página estiver carregada, exibe as notas salvas
document.addEventListener('DOMContentLoaded', () => {
  displayNotes();
});


// 1. Controle do Modal de Anotações

// Abre o modal para criar uma nova anotação
function openNoteModal() {
  document.getElementById('noteModal').style.display = 'flex';
  document.getElementById('modalTitle').textContent = 'Nova Anotação';
  document.getElementById('editingId').value = ''; // Limpa ID para indicar nova nota
}

// Fecha o modal e limpa o formulário
function closeNoteModal() {
  document.getElementById('noteModal').style.display = 'none';
  document.getElementById('noteForm').reset();
  document.getElementById('editingId').value = '';
  clearMoodSelection(); // Reseta seleção de humor para o padrão
}

// 2. Controle de Humor (Mood)

// Marca o humor selecionado pelo usuário
function selectMood(mood) {
  document.querySelectorAll('.mood').forEach(m => m.classList.remove('selected'));
  document.querySelector(`[data-mood="${mood}"]`).classList.add('selected');
  document.getElementById('noteMood').value = mood; // Atribui o valor escondido do formulário
}

// Define o humor padrão como "happy" ao abrir/criar nota
function clearMoodSelection() {
  document.querySelectorAll('.mood').forEach(m => m.classList.remove('selected'));
  document.querySelector('[data-mood="happy"]').classList.add('selected');
  document.getElementById('noteMood').value = 'happy';
}

// 3. Formulário de Notas (Criar / Editar)

// Evento de envio do formulário de anotações
document.getElementById('noteForm').addEventListener('submit', (e) => {
  e.preventDefault(); // Evita recarregar a página

  // Captura se é uma edição ou criação de nova nota
  const editingId = document.getElementById('editingId').value;

  // Estrutura da anotação (dados vindos do formulário)
  const noteData = {
    title: document.getElementById('noteTitle').value,
    content: document.getElementById('noteContent').value,
    category: document.getElementById('noteCategory').value,
    mood: document.getElementById('noteMood').value,
    updatedAt: new Date().toISOString() // Última modificação
  };

  if (editingId) {
    // Caso de edição: encontra a nota e atualiza seus campos
    const index = notes.findIndex(note => note.id == editingId);
    if (index !== -1) {
      notes[index] = { ...notes[index], ...noteData };
    }
  } else {
    // Caso de nova nota: cria ID único e registra data de criação
    const note = {
      id: Date.now(), // Identificador único baseado em timestamp
      ...noteData,
      createdAt: new Date().toISOString()
    };
    notes.unshift(note); // Adiciona no início da lista
  }

  // Persiste os dados no LocalStorage
  localStorage.setItem('notes', JSON.stringify(notes));

  // Atualiza interface e fecha modal
  displayNotes();
  closeNoteModal();
});

// 4. Filtros e Busca

// Filtra as notas por categoria
function filterNotes(category) {
  currentFilter = category;

  // Atualiza visual de botão ativo
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  displayNotes();
}

// Busca notas por título ou conteúdo
function searchNotes() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  displayNotes(query);
}

// 5. Renderização das Notas na Tela

function displayNotes(searchQuery = '') {
  const grid = document.getElementById('notesGrid');
  let filteredNotes = notes;

  // Aplica filtro por categoria
  if (currentFilter !== 'all') {
    filteredNotes = filteredNotes.filter(note => note.category === currentFilter);
  }

  // Aplica filtro por busca textual
  if (searchQuery) {
    filteredNotes = filteredNotes.filter(note =>
      note.title.toLowerCase().includes(searchQuery) ||
      note.content.toLowerCase().includes(searchQuery)
    );
  }

  // Caso não existam notas após filtros
  if (filteredNotes.length === 0) {
    grid.innerHTML = '<p class="empty-state">Nenhuma anotação encontrada. Que tal registrar uma memória especial? 💭</p>';
    return;
  }

  // Monta os cards dinamicamente com HTML
  grid.innerHTML = filteredNotes.map(note => `
    <div class="note-card">
      <div class="note-header">
        <div class="note-mood">${getMoodEmoji(note.mood)}</div>
        <div class="note-category">${getCategoryIcon(note.category)}</div>
      </div>
      <h4>${note.title}</h4>
      <p class="note-content">${truncateText(note.content, 150)}</p>
      <div class="note-footer">
        <span class="note-date">${formatDate(note.createdAt)}</span>
        <div class="note-actions">
          <button onclick="editNote(${note.id})" title="Editar">
            <i data-lucide="edit-2"></i>
          </button>
          <button onclick="deleteNote(${note.id})" title="Excluir">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Recria ícones SVG (biblioteca Lucide)
  lucide.createIcons();
}

// 6. Utilitários de Interface

// Retorna emoji representando o humor da nota
function getMoodEmoji(mood) {
  const moods = {
    happy: '😊',
    love: '😍',
    excited: '🤩',
    peaceful: '😌',
    thoughtful: '🤔'
  };
  return moods[mood] || '😊';
}

// Retorna ícone baseado na categoria da nota
function getCategoryIcon(category) {
  const icons = {
    memories: '💭',
    ideas: '💡',
    important: '⭐'
  };
  return icons[category] || '📝';
}

// Limita o tamanho do texto para caber no card
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Formata data no padrão brasileiro (dd/mm/aaaa)
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
}

// 7. Funções de Ação (Editar / Excluir)

// Carrega dados de uma nota no modal para edição
function editNote(id) {
  const note = notes.find(n => n.id === id);
  if (note) {
    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteContent').value = note.content;
    document.getElementById('noteCategory').value = note.category;
    document.getElementById('editingId').value = note.id;
    selectMood(note.mood);

    document.getElementById('modalTitle').textContent = 'Editar Anotação';
    document.getElementById('noteModal').style.display = 'flex';
  }
}

// Exclui uma nota permanentemente
function deleteNote(id) {
  if (confirm('Tem certeza que deseja excluir esta anotação?')) {
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
  }
}

// 8. Inicialização Padrão

// Define o humor inicial como "feliz"
document.addEventListener('DOMContentLoaded', () => {
  clearMoodSelection();
});
