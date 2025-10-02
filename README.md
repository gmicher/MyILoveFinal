# Tutorial - MyILove

## Processo de Ideação
O projeto MyILove nasceu com o objetivo de criar um espaço digital para casais registrarem, planejarem e celebrarem seus momentos especiais.  
Na fase de ideação, foram levantadas as seguintes necessidades:  
- Organizar eventos importantes (datas comemorativas, aniversários, encontros).  
- Registrar anotações com ideias, memórias e pensamentos.  
- Criar uma lista de desejos (viagens, experiências, objetivos).  
- Guardar fotos com histórias.  
- Controlar viagens planejadas, em andamento e realizadas.  
- Reunir conquistas já realizadas em formato de linha do tempo.  
- Personalizar o sistema com configurações próprias do casal.  

---

## Caráter Extensionista
O caráter extensionista do projeto se manifesta em:  
- Criar um sistema web de fácil acesso, com foco em inclusão digital e experiência do usuário.  
- Possibilitar que outros casais utilizem a ferramenta para organizar suas vidas afetivas.  
- Fornecer um ambiente de memórias digitais que pode ser expandido para áreas como bem-estar emocional e integração com comunidades.  

---

## Explicação do Código (Tutorial)

O projeto é estruturado em HTML, CSS e JavaScript, dividido em módulos por página.

### Estrutura HTML
Cada página segue o mesmo padrão:  
- Sidebar de navegação (menu lateral com ícones).  
- Conteúdo principal com cards, listas e botões interativos.  
- Modais para criação e edição de dados.  

Exemplo (viagens.html):
```html
<!-- Cabeçalho -->
<div class="page-header">
  <h2>Nossas Viagens</h2>
  <button class="add-btn" onclick="openTripModal()">
    <i data-lucide="plus"></i> Nova Viagem
  </button>
</div>
```

### Estilo CSS
Todo o estilo está centralizado em `style.css`:  
- Reset inicial para padronizar navegadores.  
- Variáveis CSS para facilitar troca de cores (--pink, --purple, etc).  
- Layout flex e grid para responsividade.  
- Classes utilitárias como `.page-header`, `.add-btn`, `.modal`.  

Exemplo (botões principais):
```css
.add-btn {
  background: var(--pink);
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
}
.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(214, 51, 132, 0.3);
}
```

### JavaScript
Cada funcionalidade é controlada por scripts específicos:  
- eventos.js → lógica do calendário e lista de eventos.  
- anotacoes.js → criação, edição e filtro de anotações.  
- desejos.js → manipulação de lista de desejos.  
- fotos.js → galeria e upload de imagens.  
- viagens.js → controle de viagens (planejadas, atuais, concluídas).  
- realizadas.js → conquistas gamificadas.  
- config.js → configurações de perfil, aparência e exportação de dados.  
- script.js → comportamentos globais (sidebar, inicialização, etc).  

Exemplo (eventos.js - adicionar evento):
```javascript
document.getElementById("eventForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const title = document.getElementById("eventTitle").value;
  const date = document.getElementById("eventDate").value;
  // Cria e insere o evento na lista
  addEventToList(title, date);
  closeEventModal();
});
```

---

## Conclusão e Aprendizados
O desenvolvimento do MyILove proporcionou:  
- Aprendizado em planejamento de software e ideação de produto.  
- Prática em HTML semântico, CSS responsivo e JavaScript modularizado.  
- Experiência em criar interfaces intuitivas com modais, filtros e dashboards.  
- Compreensão do caráter extensionista da computação aplicada ao cotidiano.  

---
Algumas imagens: 

<img width="1920" height="1080" alt="homepage" src="https://github.com/user-attachments/assets/7462c215-7b56-4e43-9512-94c92acc0714" />

<img width="1920" height="1080" alt="eventos" src="https://github.com/user-attachments/assets/f7bb152f-be81-4f02-859e-34a35b53e442" />

<img width="1920" height="1080" alt="desejos" src="https://github.com/user-attachments/assets/c240dce2-840f-4a8a-a606-18eca538ed46" />

<img width="1920" height="1080" alt="anotacoes" src="https://github.com/user-attachments/assets/fd82bc3f-9422-4279-8969-27dc3d14b712" />

<img width="1920" height="1080" alt="fotos" src="https://github.com/user-attachments/assets/4b882fc6-b3f7-4e81-b901-099c61e94198" />

<img width="1920" height="1080" alt="viagens" src="https://github.com/user-attachments/assets/d5e26501-ca1e-45cc-9f43-2bcfc32aa8f1" />

<img width="1920" height="1080" alt="realizadas" src="https://github.com/user-attachments/assets/c7164366-3d3d-4242-ad0f-a614a11ebed6" />

<img width="1920" height="1080" alt="config" src="https://github.com/user-attachments/assets/025bd759-38e4-4c92-b276-e1a319cbf5d1" />



## Integrantes
- Lucas Zeferino Baracat – RA: 10396267
- Caio Mussi - RA : 10735885
- Vitor Carneiro RA : 10748048
- Gustavo Micher - RA : 10737606 
