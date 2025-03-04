i18next
    .use(i18nextBrowserLanguageDetector)
    .init({
        fallbackLng: 'en',
        resources: {
            en: {
                translation: {
                    title: 'Multi-Language Example',
                    description: 'This is a multi-language website.',
                    button: 'Test Button',
                    verifyEmail: 'OTP sent to your email.',
                    verifyPhone: 'OTP sent to your phone.'
                }
            },
            es: {
                translation: {
                    title: 'Ejemplo de Multi-Idioma',
                    description: 'Este es un sitio web multi-idioma.',
                    button: 'Botón de prueba',
                    verifyPhone: 'OTP enviado a su telefono.'
                }
            },
            hi: {
                translation: {
                    title: 'बहु-भाषा उदाहरण',
                    description: 'यह एक बहु-भाषा वेबसाइट है।',
                    button: 'परीक्षण बटन',
                    verifyPhone: 'ओटीपी आपके फ़ोन पर भेजा गया है।'
                }
            },
            pt: {
                translation: {
                    title: 'Exemplo de Multi-Idioma',
                    description: 'Este é um site multi-idioma.',
                    button: 'Botão de teste',
                    verifyPhone: 'OTP enviado para o seu telefone.'
                }
            },
            zh: {
                translation: {
                    title: '多语言示例',
                    description: '这是一个多语言网站。',
                    button: '测试按钮',
                    verifyPhone: '验证码已发送到您的手机。'
                }
            },
            fr: {
                translation: {
                    title: 'Exemple Multilingue',
                    description: 'Ceci est un site web multilingue.',
                    button: 'Bouton de test',
                    verifyEmail: 'OTP envoyé à votre email.'
                }
            }
        }
    }, () => {
        updateContent();
    });

document.getElementById('languageSelector').addEventListener('change', (event) => {
    const selectedLanguage = event.target.value;
    i18next.changeLanguage(selectedLanguage, () => {
        if (selectedLanguage === 'fr') {
            verifyEmail();
        } else {
            verifyPhone();
        }
        updateContent();
    });
});

function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        element.textContent = i18next.t(element.getAttribute('data-i18n'));
    });
}

function verifyEmail() {
     alert(i18next.t('verifyEmail'));  //  sending an OTP to email
}

function verifyPhone() {    
    alert(i18next.t('verifyPhone'));  // sending an OTP to phone
}