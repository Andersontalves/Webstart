/**
 * WEBSTART - MAIN JS
 * Lógica para front-end, navbar, animações de scroll e integrações visuais.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efeito de Scroll na Navbar
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Menu Mobile (Hamburger)
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');

    if(hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Troca o ícone (Menu para X)
            // Recria todos os ícones para limpar o atual, o método createIcons lida com isso se reiniciado as tags.
            // Para simplicidade na versão sem framework, faremos via innerHTML
            if(navMenu.classList.contains('active')){
                hamburgerBtn.innerHTML = '<i data-lucide="x"></i>';
            } else {
                hamburgerBtn.innerHTML = '<i data-lucide="menu"></i>';
            }
            lucide.createIcons();
        });
    }

    // Fecha o menu ao clicar num link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburgerBtn.innerHTML = '<i data-lucide="menu"></i>';
                lucide.createIcons();
            }
        });
    });

    // 3. Smooth Scroll Habilitado via CSS html { scroll-behavior: smooth; }

    // 4. Integração Formulário WhatsApp
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nome = document.getElementById('nome_input')?.value || 'Cliente';
            const whats = document.getElementById('whats_input')?.value || '';
            const tipo = document.getElementById('tipo_input')?.value || 'Indefinido';
            const desc = document.getElementById('desc_input')?.value || '';
            
            // Formatando o texto de envio automático
            const text = `Olá equipe WebStart! 👋\n\nMeu nome é *${nome}*.\nMeu WhatsApp é: ${whats}.\n\nTenho interesse em: *${tipo}*.\n\n*Detalhes do meu projeto:*\n"${desc}"\n\nGostaria de entender melhor como vocês podem me ajudar!`;
            
            // Redireciona para o número de WhatsApp oficial
            const numeroDestino = "5515996696096";
            
            const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
        });
    }

});
