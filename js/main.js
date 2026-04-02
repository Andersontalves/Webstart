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

    // 1.1. Máscara de Telefone (DDD + 8 ou 9 dígitos)
    const phoneInputs = document.querySelectorAll('input[type="tel"], input[placeholder*="(00)"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                // Adiciona parênteses no DDD
                if (value.length <= 2) {
                    value = `(${value}`;
                } else if (value.length <= 3) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                } else if (value.length <= 7) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}`;
                } else {
                    // 9 dígitos (com hífen)
                    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
                }
            }
            
            e.target.value = value;
        });
        
        // Validação ao sair do campo
        input.addEventListener('blur', () => {
            const value = input.value.replace(/\D/g, '');
            if (value.length < 10 || value.length > 11) {
                input.setCustomValidity('Digite um telefone válido com DDD');
                input.reportValidity();
            } else {
                input.setCustomValidity('');
            }
        });
    });

    // 1.2. Validação de E-mail
    const emailInputs = document.querySelectorAll('input[type="email"]');
    
    emailInputs.forEach(input => {
        input.addEventListener('blur', () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.setCustomValidity('Digite um e-mail válido (exemplo@dominio.com)');
                input.reportValidity();
            } else {
                input.setCustomValidity('');
            }
        });
        
        // Remove mensagem de erro enquanto digita
        input.addEventListener('input', () => {
            input.setCustomValidity('');
        });
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
