// Global variables to store ratings and radio selections
let ratings = {};
let radioSelections = {};

// Function to update ratings when a checkbox is clicked
function updateRating(checkbox, name) {
    // Uncheck other checkboxes in the same row
    const checkboxName = checkbox.name;
    const checkboxes = document.querySelectorAll(`input[name="${checkboxName}"]`);
    
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] !== checkbox) {
            checkboxes[i].checked = false;
        }
        checkboxes[i].parentElement.classList.remove('selected-cell');
    }
    
    // Make sure the clicked checkbox is checked
    checkbox.checked = true;
    
    // Add selected-cell class to the parent of the clicked checkbox
    if (checkbox.parentElement) {
        checkbox.parentElement.classList.add('selected-cell');
    }
    
    // Store the rating
    ratings[name] = checkbox.value;
    
    // Save to local storage automatically
    saveTemplateToLocalStorage();
}

// Function to handle radio button selection
function handleRadioSelection(radio) {
    // Store the radio selection
    radioSelections[radio.name] = radio.value;
    
    // Save to local storage automatically
    saveTemplateToLocalStorage();
}

// Function to save the template data to local storage
function saveTemplateToLocalStorage() {
    const data = {
        ratings: ratings,
        radioSelections: radioSelections,
        inputs: {}
    };
    
    // Save text inputs, textareas, selects, and dates
    document.querySelectorAll('input[type="text"], textarea, select, input[type="date"]').forEach(input => {
        data.inputs[input.id] = input.value;
    });
    
    // Save to local storage
    localStorage.setItem('360-feedback-template', JSON.stringify(data));
}

// Function to save the template data to local storage with confirmation
function saveTemplate() {
    saveTemplateToLocalStorage();
    alert('Je 360-graden feedback template is opgeslagen in je browser. Je kunt later terugkomen om verder te gaan.');
}

// Function to load the template data from local storage
function loadTemplate() {
    const savedData = localStorage.getItem('360-feedback-template');
    
    if (savedData) {
        const data = JSON.parse(savedData);
        
        // Restore ratings
        ratings = data.ratings || {};
        
        // Restore checkbox states based on ratings
        for (const [name, value] of Object.entries(ratings)) {
            const checkbox = document.querySelector(`input[name="${name}"][value="${value}"]`);
            if (checkbox) {
                checkbox.checked = true;
                checkbox.parentElement.classList.add('selected-cell');
            }
        }
        
        // Restore radio selections
        radioSelections = data.radioSelections || {};
        
        // Restore radio button states based on selections
        for (const [name, value] of Object.entries(radioSelections)) {
            const radio = document.querySelector(`input[name="${name}"][value="${value}"]`);
            if (radio) {
                radio.checked = true;
            }
        }
        
        // Restore text inputs, textareas, selects, and dates
        for (const [id, value] of Object.entries(data.inputs)) {
            const input = document.getElementById(id);
            if (input) {
                input.value = value;
            }
        }
        
        alert('Je opgeslagen 360-graden feedback template is geladen.');
    } else {
        alert('Er is geen opgeslagen 360-graden feedback template gevonden.');
    }
}

// Function to reset the template
function resetTemplate() {
    if (confirm('Weet je zeker dat je de template wilt resetten? Alle ingevulde gegevens worden gewist.')) {
        // Reset ratings and radio selections
        ratings = {};
        radioSelections = {};
        
        // Uncheck all checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
            if (checkbox.parentElement.classList.contains('checkbox-container')) {
                checkbox.parentElement.classList.remove('selected-cell');
            }
        });
        
        // Uncheck all radio buttons
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });
        
        // Clear all text inputs, textareas, selects, and dates
        document.querySelectorAll('input[type="text"], textarea, select, input[type="date"]').forEach(input => {
            input.value = '';
        });
        
        // Remove from local storage
        localStorage.removeItem('360-feedback-template');
    }
}

// Function to print the template
function printTemplate() {
    window.print();
}

// Function to set the current date
function setCurrentDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    
    const dateElements = document.querySelectorAll('#current_date');
    dateElements.forEach(element => {
        element.textContent = formattedDate;
    });
}

// Initialize the template when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    setCurrentDate();
    
    // Add event listeners to radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            handleRadioSelection(this);
        });
    });
    
    // Add event listeners to buttons
    const saveButton = document.getElementById('save-button');
    if (saveButton) {
        saveButton.addEventListener('click', saveTemplate);
    }
    
    const loadButton = document.getElementById('load-button');
    if (loadButton) {
        loadButton.addEventListener('click', loadTemplate);
    }
    
    const resetButton = document.getElementById('reset-button');
    if (resetButton) {
        resetButton.addEventListener('click', resetTemplate);
    }
    
    const printButton = document.getElementById('print-button');
    if (printButton) {
        printButton.addEventListener('click', printTemplate);
    }
    
    // Check if there's saved data
    if (localStorage.getItem('360-feedback-template')) {
        if (confirm('Er is een opgeslagen 360-graden feedback template gevonden. Wil je deze laden?')) {
            loadTemplate();
        }
    }
});
