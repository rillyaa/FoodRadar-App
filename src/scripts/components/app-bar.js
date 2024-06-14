class AppBar extends HTMLElement {
  constructor () {
    super();

    const style = document.createElement('style');
    style.textContent = `
        nav {
            display: flex;
            position: fixed;
            background-color: #FFC94A;
            justify-content: space-between;
            padding: 10px 30px;
            top: 0;
            left: 0;
            right: 0;
            transition: 0.5s linear;
            z-index: 100;
            flex-wrap: wrap;
        }
        
        nav .scrolled {
            background-color: #FFC94A;
        }
        
        nav ul {
            display: flex;
            list-style: none;
            align-items: center;
            gap: 1.25rem;
            flex-direction: column;
            width: 100%;
        }
        
        nav ul.hidden {
            display: none;
        }
        
        nav li {
            text-decoration: none;
        }
        
        nav ul li a, nav ul li button {
            color: black;
            font-weight: 500;
            font-size: 12px;
            text-decoration: none;
            min-width: 44px;
            min-height: 44px;
            padding: 15px; 
            display: inline-block;
            width: auto; 
        }
        
        .nav-logo {
            display: flex;
            align-items: center;
        }
        
        .nav-logo a {
            display: flex;
            align-items: center;
            font-weight: 700;
            font-size: 14px;
            margin-top: 5px;
            color: black;
            text-decoration: none;
        }
        
        .menu-icon {
            display: flex;
            align-items: center;
            min-width: 44px;
            min-height: 44px;
            max-height: 44px;
        }

        button {
            background-color: #FFC94A;
            border: none;
        }
        
        /* Navbar Hover */
        .line {
            display: inline;
            position: relative;
        }
        
        .line::after {
            content: "";
            position: absolute;
            bottom: -5px;
            border-bottom: 3px solid var(--primary, #322653);
            transform: scaleX(0);
            transition: transform 0.5s ease;
        }
        
        .line:hover:after {
            left: 0;
            width: 100%;
            transform: scaleX(1);
        }

        nav.scrolled ul li:hover .line::after {
            border-bottom-color: black;
        }
    
        nav:not(.scrolled) ul li:hover .line::after {
            border-bottom-color: #FFC94A;
        }
        
        @media screen and (min-width: 576px) {
            nav {
                flex-wrap: unset;
            }

            .nav-logo a {
                font-size: 20px;
            }
        
            nav ul {
                flex-direction: initial;
                justify-content: flex-end;
            }
        
            nav ul li a, nav ul li button {
                font-size: 14px;
            }

            nav ul.hidden {
                display: flex;
            }
        
            .menu-icon {
                font-size: 20px;
                display: none;
                min-width: 44px;
                min-height: 44px;
            }
                
        }
        
        @media screen and (min-width: 1000px) {
            .nav-logo a {
                font-size: 22px;
            }
        
            nav ul li a, nav ul li button {
                font-size: 18px;
            }
        }
        `;

    const nav = document.createElement('nav');
    nav.innerHTML = `
            <div class="nav-logo">
                <a href="#">FoodRadar.</a>
            </div>
            <button id="menu-icon" class="menu-icon" aria-label="Toggle Navigation Menu"> <!-- Changed to button -->
                <box-icon name='menu'></box-icon>
            </button>
            <ul id="nav-list" class="hidden">
                <!-- Hamburger Menu -->
                <li class="list-item">
                    <a href="#" class="line">Home</a>
                </li>
                <li class="list-item">
                    <a href="#favorites" class="line">Favorite</a>
                </li>
                <li class="list-item">
                    <a href="https://www.linkedin.com/in/cherillyaa/" target="blank" class="line">About Us</a>
                </li>
            </ul> 
        `;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(nav);

    // Menambahkan event listener setelah elemen tersedia dalam shadow DOM
    this.shadowRoot.querySelector('#menu-icon').addEventListener('click', () => {
      this.shadowRoot.querySelector('#nav-list').classList.toggle('hidden');
    });

    // Event Listener untuk membuka menu dengan keyboard 'enter'
    this.shadowRoot.querySelector('#menu-icon').addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.shadowRoot.querySelector('#nav-list').classList.toggle('hidden');
      }
    });

    const navElement = this.shadowRoot.querySelector('nav');
    const navLogo = this.shadowRoot.querySelector('.nav-logo')
    const navList = this.shadowRoot.querySelector('#nav-list');
    const menuIcon = this.shadowRoot.querySelector('.menu-icon');
    const button = this.shadowRoot.querySelector('button');
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;

      if (scrollPos > scrollThreshold) {
        navElement.style.backgroundColor = '#FFC94A';
        navElement.style.color = 'black'
        navElement.classList.add('scrolled');

        navList.querySelectorAll('a').forEach(a => {
          a.style.color = 'black';
        });

        navLogo.querySelectorAll('a').forEach(a => {
          a.style.color = 'black';
        });

        menuIcon.querySelector('box-icon').setAttribute('color', 'black');
      } else {
        navElement.style.backgroundColor = 'transparent';
        navElement.style.color = '#FFC94A';
        navElement.classList.remove('scrolled');

        navList.querySelectorAll('a').forEach(a => {
          a.style.color = '#FFC94A';
        });

        navLogo.querySelectorAll('a').forEach(a => {
          a.style.color = '#FFC94A';
        });

        menuIcon.querySelector('box-icon').setAttribute('color', '#FFC94A');

        button.style.backgroundColor = 'transparent';
      }
    });
  }
}

customElements.define('app-bar', AppBar);
