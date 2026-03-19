const fs = require('fs');
const files = ['index.html', 'projects.html'];

const modalHtml = `
    <!-- Case Study Modal -->
    <div id="caseStudyModal" class="case-study-modal">
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="close-modal">&times;</button>
            <div class="modal-body" id="modalBody">
                <h2 id="modalTitle">Project Title</h2>
                <p class="modal-subtitle" id="modalSubtitle">Category | Year</p>
                <div class="modal-details">
                    <p id="modalDescription">Project description goes here.</p>
                    <h3>Services Provided:</h3>
                    <ul id="modalServices">
                    </ul>
                </div>
            </div>
        </div>
    </div>
`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Inject buttons
    const regex = /<div class="portfolio-overlay">([\s\S]*?)<\/div>/g;
    content = content.replace(regex, (match, inner) => {
        if (inner.includes('know-more-btn')) return match;
        const h3Match = inner.match(/<h3[^>]*>(.*?)<\/h3>/);
        const id = h3Match ? h3Match[1].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'unknown';
        return '<div class="portfolio-overlay">' + inner + '\n                            <button class="btn btn-outline know-more-btn" data-case="' + id + '">Know More</button>\n                        </div>';
    });

    // Inject modal
    if (!content.includes('caseStudyModal')) {
        content = content.replace('</body>', modalHtml + '\n</body>');
    }

    fs.writeFileSync(file, content);
});
console.log('Done injecting buttons and modal HTML.');
