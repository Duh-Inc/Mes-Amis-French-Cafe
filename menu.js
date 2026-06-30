/* =============================================
   Mes Amis Café — Menu Data & Rendering
   Images live in images/ folder.
   Filename listed on each item as `img`.
   ============================================= */

'use strict';

const MENU = {

  /* ── Savory Crêpes (Galette) ── */
  'crepes-savoury': [
    { id: 'cv1', name: 'Florentine',   img: 'florentine.png',   desc: 'Goat cheese, sautéed spinach, honey.',                                           price: 18.00 },
    { id: 'cv2', name: 'Complete',     img: 'complete.png',     desc: 'Egg, French ham, cheese.',                                                       price: 18.00 },
    { id: 'cv3', name: 'Parisienne',   img: 'parisienne.png',   desc: 'French ham, sautéed mushrooms, cheese.',                                         price: 16.80 },
    { id: 'cv4', name: 'Bretonne',     img: 'bretonne.png',     desc: 'French ham, cheese.',                                                            price: 15.00 },
    { id: 'cv5', name: 'Salmon',       img: 'salmon.png',       desc: 'Homemade cream cheese, salmon, fresh dill, lemon juice.',                        price: 19.20 },
    { id: 'cv6', name: 'Biquette',     img: 'biquette.png',     desc: 'Homemade cream cheese, bacon bites, goat cheese, glazed walnuts, drizzle honey.', price: 19.20 },
    { id: 'cv7', name: 'Ratatouille',  img: 'ratatouille.png',  desc: 'Roasted vegetables, cheese.',                                                    price: 15.00 },
  ],

  /* ── Sweet Crêpes ── */
  'crepes-sweet': [
    { id: 'cs1', name: 'Organic Jam',                    img: 'organic_jam.png',       desc: 'Strawberry, or seasonal fruits.',  price: 10.20 },
    { id: 'cs2', name: 'Cannelle',                       img: 'cannelle.png',          desc: 'Butter, sugar, cinnamon.',         price:  7.80 },
    { id: 'cs3', name: 'Ti Punch',                       img: 'ti_punch.png',          desc: 'Lemon, sugar, butter.',            price:  9.00 },
    { id: 'cs4', name: 'Nutella',                        img: 'nutella.png',           desc: '',                                 price: 10.20 },
    { id: 'cs5', name: 'Homemade Salted Butter Caramel', img: 'salted_caramel.png',    desc: '',                                 price: 10.20 },
    { id: 'cs6', name: 'Beurre Sucre',                   img: 'beurre_sucre.png',      desc: 'Sugar, butter.',                   price:  7.20 },
  ],

  /* ── Mini Quiches ── */
  'quiche': [
    { id: 'q1', name: 'Smoked Salmon & Fresh Dill', img: 'quiche_salmon.png',    desc: '',                               price: 9.00 },
    { id: 'q2', name: 'Florentine',                 img: 'quiche_florentine.png', desc: 'Goat cheese, spinach and honey.', price: 9.60 },
    { id: 'q3', name: 'Veggie',                     img: 'quiche_veggie.png',    desc: 'Roasted vegetables and cheese.', price: 9.00 },
    { id: 'q4', name: 'Lorraine',                   img: 'quiche_lorraine.png',  desc: 'Bacon and cheese.',              price: 7.20 },
  ],

  /* ── Sandwiches ── */
  'sandwiches': [
    { id: 'sw1', name: 'Salmon',                            img: 'sandwich_salmon.png',      desc: 'Smoked salmon, butter, lemon juice, fresh dill.',   price: 15.00 },
    { id: 'sw2', name: 'Croque-Monsieur — Jambon de Paris', img: 'croque_monsieur.png',      desc: 'Ham, cheese, béchamel sauce.',                      price: 15.00 },
    { id: 'sw3', name: 'Croque Madame',                     img: 'croque_madame.png',        desc: 'Croque-Monsieur with egg.',                         price: 17.40 },
    { id: 'sw4', name: 'Jambon Brie — Jambon de Paris',     img: 'jambon_brie.png',          desc: 'Ham, brie cheese, cornichons.',                     price: 15.00 },
    { id: 'sw5', name: 'SBC',                               img: 'sbc.png',                  desc: 'Dried sausage, butter, cornichon pickles.',         price: 15.00 },
    { id: 'sw6', name: 'Jambon Beurre — Jambon de Paris',   img: 'jambon_beurre.png',        desc: 'Ham, butter.',                                      price:  9.00 },
    { id: 'sw7', name: 'Jambon-Fromage — Jambon de Paris',  img: 'jambon_fromage.png',       desc: 'Ham, Emmental cheese, butter.',                     price: 10.20 },
    { id: 'sw8', name: 'Thon Maison',                       img: 'thon_maison.png',          desc: 'Homemade tuna rillette.',                           price: 15.00 },
    { id: 'sw9', name: 'Briard',                            img: 'briard.png',               desc: 'Brie, arugula, prunes, balsamic vinegar.',          price: 15.00 },
  ],

  /* ── Coffee ── */
  'coffee': [
    { id: 'cf1',  name: 'Espresso',         img: 'espresso.png',         desc: '', price: 3.60 },
    { id: 'cf2',  name: 'Double Espresso',  img: 'double_espresso.png',  desc: '', price: 6.24 },
    { id: 'cf3',  name: 'Macchiato',        img: 'macchiato.png',        desc: '', price: 5.40 },
    { id: 'cf4',  name: 'Americano Medium', img: 'americano.png',        desc: '', price: 4.80 },
    { id: 'cf5',  name: 'Americano Large',  img: 'americano.png',        desc: '', price: 5.40 },
    { id: 'cf6',  name: 'Drip Medium',      img: 'drip_coffee.png',      desc: '', price: 3.00 },
    { id: 'cf7',  name: 'Drip Large',       img: 'drip_coffee.png',      desc: '', price: 4.20 },
    { id: 'cf8',  name: 'Cappuccino',       img: 'cappuccino.png',       desc: '', price: 6.00 },
    { id: 'cf9', name: 'Latte',            img: 'latte.png',            desc: '', price: 7.50 },
    { id: 'cf10', name: 'Mocha',            img: 'mocha.png',            desc: '', price: 7.80 },
  ],

  /* ── Other Drinks ── */
  'drinks': [
    { id: 'dr1', name: 'Freshly Squeezed Orange Juice', img: 'orange_juice.png',   desc: '', price: 8.40 },
    { id: 'dr2', name: 'Hot Chocolate',                 img: 'hot_chocolate.png',  desc: '', price: 6.00 },
    { id: 'dr3', name: 'Hot Tea',                       img: 'hot_tea.png',        desc: '', price: 3.60 },
  ],
};

/* ── Render items ── */
function renderItems(items, containerId) {
  const el = document.getElementById(containerId);
  if (!el || !items || items.length === 0) return;
  el.innerHTML = items.map(item => `
    <article class="menu-item" aria-label="${item.name}">
      <div class="menu-item__img-wrap">
        <img
          src="images/${item.img}"
          alt="${item.name}"
          class="menu-item__img"
          loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        />
        <div class="menu-item__img-placeholder" aria-hidden="true" style="display:none;">
          <span>${item.img}</span>
        </div>
      </div>
      <div class="menu-item__body">
        <div class="menu-item__info">
          <h4 class="menu-item__name">${item.name}</h4>
          ${item.desc ? `<p class="menu-item__desc">${item.desc}</p>` : ''}
        </div>
        <div class="menu-item__right">
          <span class="menu-item__price">$${item.price.toFixed(2)}</span>
          <button class="add-btn" aria-label="Add ${item.name} to cart"
            data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">+</button>
        </div>
      </div>
    </article>
  `).join('');
}

/* ── Cart delegation ── */
function initCartButtons() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.add-btn');
    if (!btn) return;
    const { id, name, price } = btn.dataset;
    window.MesAmis.Cart.add({ id, name, price: parseFloat(price) });
    window.MesAmis.showToast(`"${name}" added to cart`);
  });
}

/* ── Tab switching ── */
function initTabs() {
  const tabs   = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      panels.forEach(p => { p.classList.remove('active'); p.hidden = true; });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      if (panel) { panel.classList.add('active'); panel.hidden = false; }
    });
    tab.addEventListener('keydown', e => {
      const list = [...tabs];
      const idx = list.indexOf(tab);
      if (e.key === 'ArrowRight') { list[(idx + 1) % list.length].focus(); e.preventDefault(); }
      if (e.key === 'ArrowLeft')  { list[(idx - 1 + list.length) % list.length].focus(); e.preventDefault(); }
      if (e.key === 'Home')       { list[0].focus(); e.preventDefault(); }
      if (e.key === 'End')        { list[list.length - 1].focus(); e.preventDefault(); }
    });
  });

  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const target = document.querySelector(`[aria-controls="panel-${hash}"]`);
    if (target) target.click();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderItems(MENU['crepes-savoury'], 'crepes-savoury');
  renderItems(MENU['crepes-sweet'],   'crepes-sweet');
  renderItems(MENU['sandwiches'],     'sandwiches');
  renderItems(MENU['quiche'],         'quiche');
  renderItems(MENU['coffee'],         'coffee');
  renderItems(MENU['drinks'],         'drinks');
  initTabs();
  initCartButtons();
});
