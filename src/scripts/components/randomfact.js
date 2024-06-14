class RandomFact extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({ mode: 'open' });

    const factContainer = document.createElement('div');
    factContainer.setAttribute('id', 'random-fact');

    const style = document.createElement('style');
    style.textContent = `
            #random-fact {
                margin: 20px 50px;
                font-size: 12px;
                padding: 10px;
                border: 1px solid #948979;
                border-radius: 25px;
                display: flex;
                align-items: center;
            }
            
            box-icon {
                margin-right: 10px;
            }

            @media screen and (min-width: 576px) {
                #random-fact {
                    font-size: 14px
                }
            }
            @media screen and (min-width: 1000px) {
                #random-fact {
                    font-size: 18px;
                }
            }
        `;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(factContainer);

    this.displayRandomFact();
  }

  randomFacts = [
    'Nasi goreng, hidangan khas Indonesia yang terdiri dari nasi yang digoreng bersama bumbu, telur, dan bahan lainnya, diakui sebagai makanan terpopuler di dunia oleh CNN pada tahun 2011.',
    'Di Danau Sentani, Papua, terdapat rumah makan terapung yang menawarkan pengalaman makan unik dengan pemandangan danau yang indah. Pengunjung dapat menikmati hidangan khas Papua sambil menikmati keindahan alam.',
    'Dieng Plateau di Jawa Tengah adalah kawasan pegunungan tinggi yang terkenal dengan festival tahunan <b>Festival Dieng Culture!</b>',
    'Danau Toba di Sumatera Utara adalah danau kawah terbesar di dunia yang terbentuk dari letusan gunung api raksasa.',
    'Masakan Betawi, seperti Soto Betawi dan Kerak Telor, mencerminkan perpaduan budaya dari berbagai etnis yang tinggal di Jakarta.'
  ];

  displayRandomFact () {
    const factContainer = this.shadowRoot.querySelector('#random-fact');
    const randomIndex = Math.floor(Math.random() * this.randomFacts.length);
    const fact = this.randomFacts[randomIndex];

    factContainer.innerHTML = `
            <div>
                <box-icon type='solid' name='bulb' color='#FFC100' size='2rem'></box-icon>
            </div>
            <div class='fact-text' tabindex=0><b>Did you know? </b>${fact}</div>
        `;
  }
}

customElements.define('random-fact', RandomFact);
