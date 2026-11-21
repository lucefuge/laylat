const tools = document.querySelector('.menu-tools');
const groups = [...document.querySelectorAll('.menu-group')];
const buttons = [...document.querySelectorAll('[data-filter]')];
const search = document.querySelector('#menu-search');
let selected = 'food';

function updateMenu() {
  const term = search.value.trim().toLocaleLowerCase('ru');
  let count = 0;
  groups.forEach(group => {
    const categoryMatches = term || group.dataset.kind === selected;
    let visible = 0;
    group.querySelectorAll('li').forEach(item => {
      const matches = Boolean(categoryMatches) && item.textContent.toLocaleLowerCase('ru').includes(term);
      item.hidden = !matches;
      if (matches) visible++;
    });
    group.hidden = visible === 0;
    count += visible;
  });
  document.querySelector('.empty').hidden = count > 0;
  buttons.forEach(button => button.setAttribute('aria-pressed', String(!term && button.dataset.filter === selected)));
}

buttons.forEach(button => button.addEventListener('click', () => {
  selected = button.dataset.filter;
  search.value = '';
  updateMenu();
}));
search.addEventListener('input', updateMenu);
tools.hidden = false;
updateMenu();

const original = document.querySelector('#original');
const originalButton = document.querySelector('#show-original');
originalButton.hidden = false;
originalButton.addEventListener('click', () => original.showModal());
original.addEventListener('click', event => {
  if (event.target !== original) return;
  const bounds = original.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) original.close();
});
