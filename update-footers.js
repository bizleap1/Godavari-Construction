const fs = require('fs');
const path = require('path');

const files = [
    'index.html',
    'about.html',
    'projects.html',
    'services.html',
    'contact.html'
];

const newSocialLinks = `
                    <div class="social-links" style="display: flex; gap: 15px; margin-top: 20px;">
                        <a href="#" style="color: var(--primary); transition: color 0.3s ease;" title="Instagram">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        <a href="#" style="color: var(--primary); transition: color 0.3s ease;" title="LinkedIn">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </a>
                        <a href="mailto:info@godavari.com" style="color: var(--primary); transition: color 0.3s ease;" title="Email Us">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </a>
                    </div>`;

files.forEach(file => {
    const filePath = path.join('c:\\Users\\indra\\OneDrive\\Desktop\\Godavari Construction', file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf-8');
        
        // Match the old social links block
        const regex = /<div class="social-links" style="display:\s*flex;\s*gap:\s*15px;\s*margin-top:\s*20px;">\s*<span style="color:\s*var\(--primary\);">FB<\/span>\s*<span style="color:\s*var\(--primary\);">IG<\/span>\s*<span style="color:\s*var\(--primary\);">LN<\/span>\s*<\/div>/g;
        
        if (regex.test(content)) {
            content = content.replace(regex, newSocialLinks.trim());
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`Successfully updated footer social links in ${file}`);
        } else {
            console.log(`Could not find the target social links block in ${file}`);
        }
    }
});
