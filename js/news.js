document.addEventListener('DOMContentLoaded', function() {
    // Remover quaisquer seções de notícias existentes
    const existingNewsSections = document.querySelectorAll('.news-section');
    existingNewsSections.forEach(section => section.remove());

    // Adicionar estilos para o novo layout
    const style = document.createElement('style');
    style.textContent = `
        .news-section {
            font-family: Arial, sans-serif;
            background: #f8f8f8;
            padding: 20px;
        }
        
        .news-container {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
        }
        
        .news-card {
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
            padding: 20px;
            flex: 1;
            min-width: 300px;
        }
        
        .news-card h2 {
            font-size: 20px;
            margin-bottom: 15px;
            color: #b00000;
            border-bottom: 2px solid #b00000;
            display: inline-block;
            padding-bottom: 5px;
        }
        
        .news-item {
            display: flex;
            align-items: start;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .news-item:hover {
            background-color: #f5f5f5;
        }
        
        .news-item:last-child {
            border-bottom: none;
        }
        
        .news-item img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 6px;
            margin-right: 12px;
        }
        
        .news-content {
            flex: 1;
        }
        
        .news-content h3 {
            font-size: 16px;
            margin: 0;
            color: #222;
        }
        
        .news-caption {
            font-size: 13px;
            color: #666;
            margin: 4px 0;
        }
        
        .news-time {
            font-size: 13px;
            color: #666;
            margin: 4px 0 0;
            display: flex;
            align-items: center;
        }
        
        .news-time i {
            margin-right: 4px;
        }
        
        @media (max-width: 768px) {
            .news-container {
                flex-direction: column;
            }
            .news-card {
                min-width: 100%;
            }
        }
    `;
    document.head.appendChild(style);

    loadLatestNews();
});

function loadLatestNews() {
    try {
        // Carregar notícias do localStorage
        const newsData = localStorage.getItem('newsData');
        if (!newsData) return;

        const data = JSON.parse(newsData);
        if (!data.news || !Array.isArray(data.news)) return;

        // Ordenar por data mais recente
        const news = data.news.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        // Adicionar campo de descrição se não existir
        news.forEach(item => {
            if (!item.image_caption && !item.imageCaption && !item.caption) {
                item.image_caption = "Descrição da imagem";
            }
        });

    // Assuntos passados: 2 notícias mais recentes
    const sideNews = news.slice(0, 2);
    // Arquivo de notícias: todas as notícias (em ordem)
    const allNews = news;

        // Criar seção de notícias
        const section = document.createElement('section');
        section.className = 'news-section';
        section.innerHTML = `
            <div class="container newsletter-modern">
                <div class="newsletter-row">
                    <div class="newsletter-main">
                        <div class="newsletter-archive newsletter-archive-main">
                            <h2 class="side-title">Arquivo de notícias</h2>
                            ${allNews.map(news => `
                                <div class="archive-news-card">
                                    <div class="archive-news-img">
                                        ${news.image_data ? `<img src="${news.image_data}" alt="${news.title}">` : ''}
                                        ${news.image_caption || news.imageCaption || news.caption ? `<div class='news-caption-list'>${news.image_caption || news.imageCaption || news.caption}</div>` : ''}
                                    </div>
                                    <div class="archive-news-content">
                                        <h4>${news.title}</h4>
                                        <div class="time-info">
                                            <i class="bi bi-clock"></i>
                                            Há ${timeAgo(new Date(news.created_at))}
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="newsletter-side-group">
                        <div class="newsletter-side">
                            <h2 class="side-title">Assuntos passados</h2>
                            ${sideNews.map(news => `
                                <div class="side-news-card">
                                    <div class="side-news-img">
                                        ${news.image_data ? `<img src="${news.image_data}" alt="${news.title}">` : ''}
                                        ${news.image_caption || news.imageCaption || news.caption ? `<div class='news-caption-list'>${news.image_caption || news.imageCaption || news.caption}</div>` : ''}
                                    </div>
                                    <div class="side-news-content">
                                        <h4>${news.title}</h4>
                                        <div class="time-info">
                                            <i class="bi bi-clock"></i>
                                            Há ${timeAgo(new Date(news.created_at))}
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
            
        // Sempre inserir antes do mapa
        const mapSection = document.querySelector('.map-section');
        if (mapSection) {
            mapSection.parentNode.insertBefore(section, mapSection);
        }

        // Adicionar evento de clique para a notícia principal
            const mainNewsElement = section.querySelector('.main-news');
            if (mainNewsElement) {
                mainNewsElement.addEventListener('click', () => {
                    showNewsModal(mainNews);
                });
            }

            // Adicionar eventos de clique para as notícias laterais
            section.querySelectorAll('.news-card').forEach((card, index) => {
                if (card) {
                    card.addEventListener('click', () => {
                        showNewsModal(sideNews[index]);
                    });
                }
            });

    } catch (error) {
        console.error('Erro ao carregar notícias:', error);
    }
}

function timeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return '1 minuto';
    if (diffInSeconds < 3600) return Math.floor(diffInSeconds / 60) + ' minutos';
    if (diffInSeconds < 86400) return Math.floor(diffInSeconds / 3600) + ' horas';
    return Math.floor(diffInSeconds / 86400) + ' dias';
}

function showNewsModal(news) {
    // Remover modal antigo se existir
    const oldModal = document.getElementById('newsModal');
    if (oldModal) oldModal.remove();

    // Criar novo modal
    const modalHtml = `
        <div class="modal fade" id="newsModal" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header border-0 pb-0">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div class="modal-body text-center">
                        ${news.image_data ? `
                            <div class="modal-image-container">
                                <img src="${news.image_data}" class="img-fluid rounded mb-2" alt="${news.title}" 
                                     style="max-height: 400px; width: auto;">
                                <div class="news-caption text-start mb-4">${news.image_caption || news.imageCaption || news.caption || ''}</div>
                            </div>
                        ` : ''}
                        <h3 class="mb-4">${news.title}</h3>
                        <div class="text-start">${news.content}</div>
                        <div class="text-muted mt-4">
                            <small>
                                <i class="bi bi-calendar"></i>
                                ${new Date(news.created_at).toLocaleDateString('pt-BR', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Adicionar modal ao body
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Inicializar e mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('newsModal'));
    modal.show();
}