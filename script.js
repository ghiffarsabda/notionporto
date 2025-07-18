document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const transitionDelay = 300; // milliseconds

    const navigateTo = (pageId, pushState = true) => {
        const currentPage = document.querySelector('.page.active');
        const nextPage = document.getElementById(pageId);

        if (currentPage) {
            currentPage.classList.add('fade-out');
            setTimeout(() => {
                currentPage.classList.remove('active', 'fade-out');
                nextPage.classList.add('active');
                if (pushState) {
                    history.pushState({page: pageId}, null, `#${pageId}`);
                }
            }, transitionDelay);
        } else {
            nextPage.classList.add('active');
            if (pushState) {
                history.pushState({page: pageId}, null, `#${pageId}`);
            }
        }
    };

    // Initial page load
    const initialPage = window.location.hash.substring(1) || 'hello-page';
    navigateTo(initialPage, false);

    // Navigation events
    document.getElementById('hello-page').addEventListener('click', () => navigateTo('options-page'));
    document.getElementById('portfolio-btn').addEventListener('click', () => navigateTo('porto-page'));
    document.getElementById('talk-btn').addEventListener('click', () => navigateTo('contact-page'));

    // Browser back button
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.page) {
            navigateTo(e.state.page, false);
        } else { // Fallback for initial page
            navigateTo('hello-page', false);
        }
    });
});