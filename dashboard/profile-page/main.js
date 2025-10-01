document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-link');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Get the target tab's ID from the data-tab attribute
            const targetId = tab.dataset.tab;
            const targetContent = document.getElementById(targetId);

            // Remove active class from all tabs and content
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Add active class to the clicked tab and corresponding content
            tab.classList.add('active');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});
