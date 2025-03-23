// Map of ebook names to their chapter files (in order) with titles
const ebookChapters = {
  'medewerkerparticipatie': [
    { file: '00_inleiding.md', title: 'Inleiding: De Kracht van Medewerkerparticipatie' },
    { file: '01_wat_is_medewerkerparticipatie.md', title: 'Wat is Medewerkerparticipatie?' },
    { file: '02_waarom_belangrijk.md', title: 'Waarom is Medewerkerparticipatie Belangrijk?' },
    { file: '03_waar_toepassen.md', title: 'Waar kun je Medewerkerparticipatie Toepassen?' },
    { file: '04_hoe_starten.md', title: 'Hoe Start je met Medewerkerparticipatie?' },
    { file: '05_traject_opbouw.md', title: 'De Structuur en Dynamiek van een Participatietraject' },
    { file: '06_valkuilen.md', title: 'Valkuilen en Oplossingen' },
    { file: '07_rol_leidinggevende.md', title: 'De Rol van de Leidinggevende' },
    { file: '08_praktische_tools.md', title: 'Praktische Tools en Methoden' },
    { file: '09_succes_meten.md', title: 'Hoe Meet je Succes?' },
    { file: '10_samenvatting.md', title: 'Samenvatting' }
  ],
  'zelfsturende-teams': [
    { file: '00_Inleiding - De Kracht van Zelfsturende Teams.md', title: 'Inleiding: De Kracht van Zelfsturende Teams' },
    { file: '01_Wat zijn Zelfsturende Teams.md', title: 'Wat zijn Zelfsturende Teams?' },
    { file: '02_De Psychologie achter Zelfsturende Teams.md', title: 'De Psychologie achter Zelfsturende Teams' },
    { file: '03_Waarom Zelfsturende Teams Implementeren.md', title: 'Waarom Zelfsturende Teams Implementeren?' },
    { file: '04_Strategische Overwegingen.md', title: 'Strategische Overwegingen' },
    { file: '05_Het Implementatieproces - Van Visie naar Realiteit.md', title: 'Het Implementatieproces: Van Visie naar Realiteit' },
    { file: '06_Rollen en Verantwoordelijkheden - Een Nieuwe Dynamiek.md', title: 'Rollen en Verantwoordelijkheden: Een Nieuwe Dynamiek' },
    { file: '07_Communicatie en Besluitvorming - De Hartslag van Zelfsturing.md', title: 'Communicatie en Besluitvorming: De Hartslag van Zelfsturing' },
    { file: '08_Coaching en Ondersteuning - De Katalysatoren van Zelfsturing.md', title: 'Coaching en Ondersteuning: De Katalysatoren van Zelfsturing' },
    { file: '09_Meten van Succes - Voorbij de Traditionele Metrics.md', title: 'Meten van Succes: Voorbij de Traditionele Metrics' },
    { file: '10_Organisatiestructuur en Kostenefficiëntie - De Transformatieve Impact van Zelfsturende Teams.md', title: 'Organisatiestructuur en Kostenefficiëntie: De Transformatieve Impact van Zelfsturende Teams' },
    { file: '11_Toekomstperspectief en Conclusie - De Blijvende Relevantie van Zelfsturende Teams.md', title: 'Toekomstperspectief en Conclusie: De Blijvende Relevantie van Zelfsturende Teams' }
  ]
};

async function loadEbookContent(ebookName) {
  try {
    // Check if this is a multi-chapter ebook
    if (ebookChapters[ebookName]) {
      // Load all chapters and concatenate them
      let fullContent = '';
      let chapters = [];
      
      for (const chapter of ebookChapters[ebookName]) {
        // Get the directory name based on the ebook name
        let directoryName;
        if (ebookName === 'zelfsturende-teams') {
          directoryName = 'Zelfsturende teams';
        } else {
          directoryName = ebookName.charAt(0).toUpperCase() + ebookName.slice(1);
        }
        
        console.log(`Loading chapter from directory: ${directoryName}`);
        console.log(`Chapter file: ${chapter.file}`);
        
        // Encode the URL to handle spaces and special characters
        const encodedDirectoryName = encodeURIComponent(directoryName);
        const encodedFileName = encodeURIComponent(chapter.file);
        console.log(`Encoded URL: ebooks/markdown/${encodedDirectoryName}/${encodedFileName}`);
        
        const response = await fetch(`ebooks/markdown/${encodedDirectoryName}/${encodedFileName}`);
        if (!response.ok) {
          throw new Error(`Could not load chapter: ${chapter.file}`);
        }
        const chapterContent = await response.text();
        
        // Create a sanitized ID for the chapter
        const chapterId = chapter.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        // Add chapter title as an anchor for navigation
        fullContent += `<div class="chapter" id="${chapterId}">`;
        
        // Pre-process chapter content to fix Markdown headers with "Hoofdstuk"
        console.log("Pre-processing chapter content to fix Markdown headers");
        // Replace all Markdown headers with HTML headers
        let processedContent = chapterContent.replace(/^# (.+)$/gm, '<h1 class="chapter-title">$1</h1>');
        // Also replace level 2 headers (##)
        processedContent = processedContent.replace(/^## (.+)$/gm, '<h2 class="section-title">$1</h2>');
        console.log("Processed content:", processedContent.substring(0, 100));
        
        fullContent += processedContent;
        fullContent += '</div>\n\n';
        
        // Store chapter info for table of contents
        chapters.push({
          id: chapterId,
          title: chapter.title
        });
      }
      
      // Store chapters in a global variable for the table of contents
      window.ebookChapters = chapters;
      
      // Parse markdown to HTML with custom renderer for headers
      const renderer = new marked.Renderer();
      const originalHeadingRenderer = renderer.heading;
      
      // Override the heading renderer to properly handle chapter headers
      renderer.heading = function(text, level, raw, slugger) {
        // Check if this is a chapter header (level 1 heading that contains "Hoofdstuk")
        if (level === 1 && raw.includes('Hoofdstuk')) {
          return `<h1 class="chapter-title">${text}</h1>`;
        }
        // Use the original renderer for other headings
        return originalHeadingRenderer.call(this, text, level, raw, slugger);
      };
      
      // Use the custom renderer and configure marked to handle raw HTML
      marked.setOptions({ 
        renderer,
        headerIds: false,
        mangle: false,
        headerPrefix: '',
        gfm: true,
        breaks: true,
        sanitize: false,
        smartLists: true,
        smartypants: true,
        xhtml: false
      });
      
      // Parse markdown to HTML
      let htmlContent = marked.parse(fullContent);
      
      // Process the HTML to render Mermaid diagrams
      return processMermaidDiagrams(htmlContent);
    } else {
      // Handle single file ebooks (legacy support)
      const response = await fetch('ebooks/markdown/' + ebookName + '.md');
      if (!response.ok) {
        throw new Error('Could not load ebook: ' + ebookName + '.md');
      }
      const markdown = await response.text();
      return processMermaidDiagrams(marked.parse(markdown));
    }
  } catch (error) {
    console.error(error);
    return '<p>Ebook niet gevonden.</p>';
  }
}

// Function to process Mermaid diagrams in the HTML content
function processMermaidDiagrams(htmlContent) {
  console.log('Processing Mermaid diagrams...');
  
  // Replace Mermaid code blocks with div elements that Mermaid can render
  // Also wrap them in a container div for better styling
  const processedContent = htmlContent.replace(
    /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g, 
    (match, p1) => {
      console.log('Found Mermaid diagram:', p1.substring(0, 50) + '...');
      // Extract figure caption if it exists (usually in the format *Figuur X: Description*)
      const nextLine = match.split('\n')[1];
      let caption = '';
      
      if (nextLine && nextLine.includes('*Figuur')) {
        caption = nextLine.replace(/\*/g, '').trim();
      }
      
      return `<div class="mermaid-container">
                <div class="mermaid">${p1}</div>
                ${caption ? `<div class="mermaid-title">${caption}</div>` : ''}
              </div>`;
    }
  );
  
  // Process tables to make them more readable
  const contentWithTables = processedContent.replace(
    /<table>([\s\S]*?)<\/table>/g,
    (match) => {
      // Add responsive wrapper and styling
      return `<div class="table-responsive">${match}</div>`;
    }
  );
  
  // Schedule Mermaid initialization after the content is added to the DOM
  setTimeout(() => {
    console.log('Initializing Mermaid diagrams...');
    if (typeof mermaid !== 'undefined') {
      try {
        // Configure mermaid with better settings for readability
        mermaid.initialize({
          startOnLoad: true,
          theme: 'default',
          flowchart: { 
            useMaxWidth: false,
            htmlLabels: true,
            curve: 'basis'
          },
          securityLevel: 'loose',
          fontFamily: 'Arial, sans-serif',
          fontSize: 16,
          themeVariables: {
            primaryColor: '#3a5199',
            primaryTextColor: '#fff',
            primaryBorderColor: '#7C0000',
            lineColor: '#333333',
            secondaryColor: '#006100',
            tertiaryColor: '#fff'
          }
        });
        
        // Reset any existing diagrams
        document.querySelectorAll('.mermaid').forEach(el => {
          console.log('Found diagram element:', el.textContent.substring(0, 30) + '...');
        });
        
        // Initialize Mermaid with a delay to ensure DOM is ready
        setTimeout(() => {
          mermaid.init(undefined, '.mermaid');
        }, 500);
      } catch (e) {
        console.error('Error initializing Mermaid diagrams:', e);
      }
    } else {
      console.error('Mermaid library not found!');
    }
  }, 1000);
  
  return contentWithTables;
}

function addTableOfContentsNavigation(contentDiv) {
  const toc = document.getElementById('toc');
  if (!toc || !contentDiv) return;

  // Initialize table of contents HTML
  let tocHTML = '';
  
  // Then add regular chapter links
  if (window.ebookChapters && window.ebookChapters.length > 0) {
    tocHTML += '<div class="toc-chapters">';
    window.ebookChapters.forEach(chapter => {
      tocHTML += `<li class="chapter-link"><a href="#${chapter.id}">${chapter.title}</a></li>`;
    });
    tocHTML += '</div>';
  }

  // Then add section links within each chapter
  tocHTML += '<div class="toc-sections">';
  const headers = contentDiv.querySelectorAll('h2, h3');
  headers.forEach(header => {
    // Create a sanitized ID for the header
    const id = header.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    header.id = id;
    
    // Add different styling for h2 vs h3
    const headerClass = header.tagName.toLowerCase() === 'h2' ? 'section-link' : 'subsection-link';
    tocHTML += `<li class="${headerClass}"><a href="#${id}">${header.textContent}</a></li>`;
  });
  tocHTML += '</div>';

  toc.innerHTML = tocHTML;
  
  // Add click event listeners to all TOC links
  toc.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const ebookName = urlParams.get('ebook');
  const ebookContentDiv = document.getElementById('ebook-content');

  if (ebookName && ebookContentDiv) {
    // Add a loading indicator
    ebookContentDiv.innerHTML = '<div class="loading">Ebook laden...</div>';
    
    try {
      // Configure Mermaid first
      if (typeof mermaid !== 'undefined') {
        console.log('Configuring Mermaid...');
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          flowchart: { useMaxWidth: true },
          securityLevel: 'loose',
          fontFamily: 'Arial, sans-serif'
        });
      }
      
      // Load the ebook content
      const content = await loadEbookContent(ebookName);
      ebookContentDiv.innerHTML = content;
      
      // Add table of contents navigation
      addTableOfContentsNavigation(ebookContentDiv);
      
      // Add ebook title to the page
      if (ebookChapters[ebookName] && ebookChapters[ebookName].length > 0) {
        const ebookTitle = document.createElement('h1');
        ebookTitle.className = 'ebook-title';
        ebookTitle.textContent = ebookChapters[ebookName][0].title.split(':')[0]; // Use first part of first chapter title
        ebookContentDiv.insertBefore(ebookTitle, ebookContentDiv.firstChild);
      }
      
      // Add styling to improve readability
      improveContentStyling(ebookContentDiv);
      
      // Initialize Mermaid diagrams again after content is loaded
      setTimeout(() => {
        if (typeof mermaid !== 'undefined') {
          try {
            console.log('Re-initializing Mermaid diagrams after content load...');
            mermaid.init(undefined, '.mermaid');
          } catch (e) {
            console.error('Error re-initializing Mermaid diagrams:', e);
          }
        }
      }, 1000);
    } catch (error) {
      console.error('Error loading ebook:', error);
      ebookContentDiv.innerHTML = `<p>Er is een fout opgetreden bij het laden van het ebook: ${error.message}</p>`;
    }
  } else {
    ebookContentDiv.innerHTML = '<p>Ebook niet gevonden.</p>';
  }
});

// Function to improve content styling
function improveContentStyling(contentDiv) {
  // Add classes to elements for better styling
  contentDiv.querySelectorAll('h1').forEach(h1 => h1.classList.add('chapter-title'));
  contentDiv.querySelectorAll('h2').forEach(h2 => h2.classList.add('section-title'));
  contentDiv.querySelectorAll('h3').forEach(h3 => h3.classList.add('subsection-title'));
  contentDiv.querySelectorAll('p').forEach(p => p.classList.add('content-paragraph'));
  contentDiv.querySelectorAll('ul, ol').forEach(list => list.classList.add('content-list'));
  contentDiv.querySelectorAll('blockquote').forEach(quote => quote.classList.add('content-quote'));
  
  // Add figure captions
  contentDiv.querySelectorAll('em').forEach(em => {
    if (em.textContent.startsWith('Figuur')) {
      em.classList.add('figure-caption');
    }
  });
}
