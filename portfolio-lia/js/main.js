const typingText = document.getElementById('typing-text');

if (typingText) {

    const names = [
        'Lia Rarasari',
        'Web Developer',
        'Mahasiswa Sistem Informasi'
    ];

    let nameIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {

        const currentName = names[nameIndex];

        if (isDeleting) {

            typingText.textContent =
                currentName.substring(0, charIndex - 1);

            charIndex--;

        } else {

            typingText.textContent =
                currentName.substring(0, charIndex + 1);

            charIndex++;
        }

        let delay = isDeleting ? 50 : 100;

        if (!isDeleting &&
            charIndex === currentName.length) {

            delay = 2000;
            isDeleting = true;

        } else if (
            isDeleting &&
            charIndex === 0
        ) {

            isDeleting = false;

            nameIndex =
                (nameIndex + 1) % names.length;

            delay = 500;
        }

        setTimeout(typeEffect, delay);
    }

    typeEffect();
}


const projects = [

    {
        title: 'Website Portfolio',

        desc:
            'Website portfolio pribadi menggunakan HTML, CSS, dan JavaScript.',

        image:
            'images/project-portfolio.png',

        link:
            'portfolio.html'
    },

    {
        title: 'Kalkulator JavaScript',

        desc:
            'Kalkulator sederhana yang dibuat dengan JavaScript.',

        image:
            'images/project-kalkulator.png',

        link:
            'kalkulator.html'
    },

    {
        title: 'UI/UX Design',

        desc:
            'Rancangan tampilan antarmuka website yang menarik dan mudah digunakan.',

        image:
            'images/project-uiux.png',

        link:
            'uiux.html'
    }

];


const projectGrid =
    document.getElementById('project-grid');

if (projectGrid) {

    projects.forEach(project => {

        const card =
            document.createElement('div');

        card.className =
            'project-card';

        card.innerHTML = `

            <img
                src="${project.image}"
                alt="${project.title}"
            >

            <h3>
                ${project.title}
            </h3>

            <p>
                ${project.desc}
            </p>

        `;

        card.addEventListener(
            'click',
            () => {

                window.location.href =
                    project.link;

            }
        );

        projectGrid.appendChild(card);

    });

}


const contactForm =
    document.getElementById('contact-form');

if (contactForm) {

    contactForm.addEventListener(
        'submit',
        function (event) {

            event.preventDefault();

            const nama =
                document.getElementById('nama').value;

            const email =
                document.getElementById('email').value;

            const pesan =
                document.getElementById('pesan').value;

            if (
                nama === '' ||
                email === '' ||
                pesan === ''
            ) {

                alert(
                    'Semua data harus diisi.'
                );

            } else {

                alert(
                    'Terima kasih, ' +
                    nama +
                    '. Pesan Anda berhasil dikirim.'
                );

                contactForm.reset();
            }

        }
    );

}