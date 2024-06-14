class LoadingIndicator extends HTMLElement {
  constructor () {
    super();

    this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `
        .loading-container {
          display: none;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(255, 255, 255, 0.8);
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          z-index: 1000;
        }
  
        .loading-text {
          font-size: 18px;
          text-align: center;
        }
  
        .loader {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #3498db;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }
  
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;

    const loadingContainer = document.createElement('div');
    loadingContainer.classList.add('loading-container');

    const loadingText = document.createElement('div');
    loadingText.textContent = 'Loading...';
    loadingText.classList.add('loading-text');

    const loader = document.createElement('div');
    loader.classList.add('loader');

    loadingContainer.appendChild(loadingText);
    loadingContainer.appendChild(loader);

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(loadingContainer);

    this.loading = false;
  }

  showLoading (text = 'Loading...') {
    const loadingContainer = this.shadowRoot.querySelector('.loading-container');
    if (loadingContainer) {
      loadingContainer.querySelector('.loading-text').textContent = text;
      loadingContainer.style.display = 'block';
      this.loading = true;
    }
  }

  hideLoading () {
    const loadingContainer = this.shadowRoot.querySelector('.loading-container');
    if (loadingContainer) {
      loadingContainer.style.display = 'none';
      this.loading = false;
    }
  }
}

customElements.define('loading-indicator', LoadingIndicator);
export default LoadingIndicator;
