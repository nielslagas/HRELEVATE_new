// Global variables
let responsibilityCount = 1; // Start with one responsibility
let qualificationCount = 1; // Start with one qualification

// Function to add a new responsibility
function addResponsibility() {
    responsibilityCount++;
    
    const responsibilitiesContainer = document.getElementById('responsibilities-container');
    
    // Create a new responsibility container
    const responsibilityContainer = document.createElement('div');
    responsibilityContainer.className = 'responsibility-container';
    responsibilityContainer.id = `responsibility-${responsibilityCount}`;
    
    // Set the HTML content for the new responsibility
    responsibilityContainer.innerHTML = `
        <div class="form-group">
            <label for="responsibility_${responsibilityCount}">Verantwoordelijkheid ${responsibilityCount}:</label>
            <textarea id="responsibility_${responsibilityCount}" class="text-input" placeholder="Beschrijf een specifieke verantwoordelijkheid of taak die bij de functie hoort."></textarea>
        </div>
        
        <button class="remove-item-button" onclick="removeResponsibility(${responsibilityCount})">Verwijder</button>
    `;
    
    // Add the new responsibility to the container
    responsibilitiesContainer.appendChild(responsibilityContainer);
    
    // Save to local storage automatically
    saveTemplateToLocalStorage();
}

// Function to remove a responsibility
function removeResponsibility(responsibilityId) {
    if (responsibilityCount <= 1) {
        alert('Er moet minimaal één verantwoordelijkheid zijn.');
        return;
    }
    
    const responsibilityElement = document.getElementById(`responsibility-${responsibilityId}`);
    if (responsibilityElement) {
        responsibilityElement.remove();
        
        // Renumber the remaining responsibilities
        const responsibilityElements = document.querySelectorAll('.responsibility-container');
        responsibilityCount = responsibilityElements.length;
        
        responsibilityElements.forEach((element, index) => {
            const responsibilityNumber = index + 1;
            element.id = `responsibility-${responsibilityNumber}`;
            
            // Update the label
            const label = element.querySelector('label');
            if (label) {
                label.textContent = `Verantwoordelijkheid ${responsibilityNumber}:`;
                label.setAttribute('for', `responsibility_${responsibilityNumber}`);
            }
            
            // Update the textarea
            const textarea = element.querySelector('textarea');
            if (textarea) {
                textarea.id = `responsibility_${responsibilityNumber}`;
            }
            
            // Update the remove button
            const removeButton = element.querySelector('.remove-item-button');
            if (removeButton) {
                removeButton.setAttribute('onclick', `removeResponsibility(${responsibilityNumber})`);
            }
        });
        
        // Save to local storage automatically
        saveTemplateToLocalStorage();
    }
}

// Function to add a new qualification
function addQualification() {
    qualificationCount++;
    
    const qualificationsContainer = document.getElementById('qualifications-container');
    
    // Create a new qualification container
    const qualificationContainer = document.createElement('div');
    qualificationContainer.className = 'qualification-container';
    qualificationContainer.id = `qualification-${qualificationCount}`;
    
    // Set the HTML content for the new qualification
    qualificationContainer.innerHTML = `
        <div class="form-group">
            <label for="qualification_${qualificationCount}">Kwalificatie ${qualificationCount}:</label>
            <textarea id="qualification_${qualificationCount}" class="text-input" placeholder="Beschrijf een specifieke kwalificatie, vaardigheid of ervaring die vereist is voor de functie."></textarea>
        </div>
        
        <button class="remove-item-button" onclick="removeQualification(${qualificationCount})">Verwijder</button>
    `;
    
    // Add the new qualification to the container
    qualificationsContainer.appendChild(qualificationContainer);
    
    // Save to local storage automatically
    saveTemplateToLocalStorage();
}

// Function to remove a qualification
function removeQualification(qualificationId) {
    if (qualificationCount <= 1) {
        alert('Er moet minimaal één kwalificatie zijn.');
        return;
    }
    
    const qualificationElement = document.getElementById(`qualification-${qualificationId}`);
    if (qualificationElement) {
        qualificationElement.remove();
        
        // Renumber the remaining qualifications
        const qualificationElements = document.querySelectorAll('.qualification-container');
        qualificationCount = qualificationElements.length;
        
        qualificationElements.forEach((element, index) => {
            const qualificationNumber = index + 1;
            element.id = `qualification-${qualificationNumber}`;
            
            // Update the label
            const label = element.querySelector('label');
            if (label) {
                label.textContent = `Kwalificatie ${qualificationNumber}:`;
                label.setAttribute('for', `qualification_${qualificationNumber}`);
            }
            
            // Update the textarea
            const textarea = element.querySelector('textarea');
            if (textarea) {
                textarea.id = `qualification_${qualificationNumber}`;
            }
            
            // Update the remove button
            const removeButton = element.querySelector('.remove-item-button');
            if (removeButton) {
                removeButton.setAttribute('onclick', `removeQualification(${qualificationNumber})`);
            }
        });
        
        // Save to local storage automatically
        saveTemplateToLocalStorage();
    }
}

// Function to generate a preview of the job description
function generatePreview() {
    // Get all the form values
    const jobTitle = document.getElementById('job_title').value || '[Functietitel]';
    const companyDescription = document.getElementById('company_description').value || '';
    const departmentDescription = document.getElementById('department_description').value || '';
    const jobSummary = document.getElementById('job_summary').value || '';
    const preferredQualifications = document.getElementById('preferred_qualifications').value || '';
    const benefits = document.getElementById('benefits').value || '';
    const applicationProcess = document.getElementById('application_process').value || '';
    const contactInfo = document.getElementById('contact_info').value || '';
    
    // Get all responsibilities
    const responsibilities = [];
    for (let i = 1; i <= responsibilityCount; i++) {
        const responsibility = document.getElementById(`responsibility_${i}`);
        if (responsibility && responsibility.value.trim() !== '') {
            responsibilities.push(responsibility.value);
        }
    }
    
    // Get all qualifications
    const qualifications = [];
    for (let i = 1; i <= qualificationCount; i++) {
        const qualification = document.getElementById(`qualification_${i}`);
        if (qualification && qualification.value.trim() !== '') {
            qualifications.push(qualification.value);
        }
    }
    
    // Update the preview
    document.getElementById('preview-title').textContent = `Functieomschrijving: ${jobTitle}`;
    document.getElementById('preview-company').textContent = companyDescription;
    document.getElementById('preview-department').textContent = departmentDescription;
    document.getElementById('preview-summary').textContent = jobSummary;
    
    // Update responsibilities list
    const responsibilitiesList = document.getElementById('preview-responsibilities');
    responsibilitiesList.innerHTML = '';
    responsibilities.forEach(responsibility => {
        const li = document.createElement('li');
        li.textContent = responsibility;
        responsibilitiesList.appendChild(li);
    });
    
    // Update qualifications list
    const qualificationsList = document.getElementById('preview-qualifications');
    qualificationsList.innerHTML = '';
    qualifications.forEach(qualification => {
        const li = document.createElement('li');
        li.textContent = qualification;
        qualificationsList.appendChild(li);
    });
    
    document.getElementById('preview-preferred').textContent = preferredQualifications;
    document.getElementById('preview-benefits').textContent = benefits;
    document.getElementById('preview-application').textContent = applicationProcess;
    document.getElementById('preview-contact').textContent = contactInfo;
    
    // Show the preview container
    document.getElementById('preview-container').style.display = 'block';
    
    // Scroll to the preview
    document.getElementById('preview-container').scrollIntoView({ behavior: 'smooth' });
}

// Function to save the template data to local storage
function saveTemplateToLocalStorage() {
    const data = {
        inputs: {},
        responsibilities: [],
        qualifications: []
    };
    
    // Save text inputs, textareas, selects, and dates
    document.querySelectorAll('input[type="text"], textarea, select, input[type="date"]').forEach(input => {
        data.inputs[input.id] = input.value;
    });
    
    // Save responsibilities
    for (let i = 1; i <= responsibilityCount; i++) {
        const responsibility = document.getElementById(`responsibility_${i}`);
        if (responsibility) {
            data.responsibilities.push({
                id: i,
                text: responsibility.value
            });
        }
    }
    
    // Save qualifications
    for (let i = 1; i <= qualificationCount; i++) {
        const qualification = document.getElementById(`qualification_${i}`);
        if (qualification) {
            data.qualifications.push({
                id: i,
                text: qualification.value
            });
        }
    }
    
    // Save to local storage
    localStorage.setItem('job-description-template', JSON.stringify(data));
}

// Function to save the template data to local storage with confirmation
function saveTemplate() {
    saveTemplateToLocalStorage();
    alert('Je functieomschrijving template is opgeslagen in je browser. Je kunt later terugkomen om verder te gaan.');
}

// Function to load the template data from local storage
function loadTemplate() {
    const savedData = localStorage.getItem('job-description-template');
    
    if (savedData) {
        const data = JSON.parse(savedData);
        
        // Restore text inputs, textareas, selects, and dates
        for (const [id, value] of Object.entries(data.inputs)) {
            const input = document.getElementById(id);
            if (input) {
                input.value = value;
            }
        }
        
        // Restore responsibilities
        if (data.responsibilities && data.responsibilities.length > 0) {
            // Clear existing responsibilities
            const responsibilitiesContainer = document.getElementById('responsibilities-container');
            responsibilitiesContainer.innerHTML = '';
            
            // Add saved responsibilities
            data.responsibilities.forEach((responsibility, index) => {
                const responsibilityNumber = index + 1;
                
                // Create a new responsibility container
                const responsibilityContainer = document.createElement('div');
                responsibilityContainer.className = 'responsibility-container';
                responsibilityContainer.id = `responsibility-${responsibilityNumber}`;
                
                // Set the HTML content for the responsibility
                responsibilityContainer.innerHTML = `
                    <div class="form-group">
                        <label for="responsibility_${responsibilityNumber}">Verantwoordelijkheid ${responsibilityNumber}:</label>
                        <textarea id="responsibility_${responsibilityNumber}" class="text-input" placeholder="Beschrijf een specifieke verantwoordelijkheid of taak die bij de functie hoort.">${responsibility.text}</textarea>
                    </div>
                    
                    <button class="remove-item-button" onclick="removeResponsibility(${responsibilityNumber})">Verwijder</button>
                `;
                
                // Add the responsibility to the container
                responsibilitiesContainer.appendChild(responsibilityContainer);
            });
            
            // Update the responsibility count
            responsibilityCount = data.responsibilities.length;
        }
        
        // Restore qualifications
        if (data.qualifications && data.qualifications.length > 0) {
            // Clear existing qualifications
            const qualificationsContainer = document.getElementById('qualifications-container');
            qualificationsContainer.innerHTML = '';
            
            // Add saved qualifications
            data.qualifications.forEach((qualification, index) => {
                const qualificationNumber = index + 1;
                
                // Create a new qualification container
                const qualificationContainer = document.createElement('div');
                qualificationContainer.className = 'qualification-container';
                qualificationContainer.id = `qualification-${qualificationNumber}`;
                
                // Set the HTML content for the qualification
                qualificationContainer.innerHTML = `
                    <div class="form-group">
                        <label for="qualification_${qualificationNumber}">Kwalificatie ${qualificationNumber}:</label>
                        <textarea id="qualification_${qualificationNumber}" class="text-input" placeholder="Beschrijf een specifieke kwalificatie, vaardigheid of ervaring die vereist is voor de functie.">${qualification.text}</textarea>
                    </div>
                    
                    <button class="remove-item-button" onclick="removeQualification(${qualificationNumber})">Verwijder</button>
                `;
                
                // Add the qualification to the container
                qualificationsContainer.appendChild(qualificationContainer);
            });
            
            // Update the qualification count
            qualificationCount = data.qualifications.length;
        }
        
        alert('Je opgeslagen functieomschrijving template is geladen.');
    } else {
        alert('Er is geen opgeslagen functieomschrijving template gevonden.');
    }
}

// Function to reset the template
function resetTemplate() {
    if (confirm('Weet je zeker dat je de template wilt resetten? Alle ingevulde gegevens worden gewist.')) {
        // Clear all text inputs, textareas, selects, and dates
        document.querySelectorAll('input[type="text"], textarea, select, input[type="date"]').forEach(input => {
            input.value = '';
        });
        
        // Reset responsibilities to just one
        const responsibilitiesContainer = document.getElementById('responsibilities-container');
        responsibilitiesContainer.innerHTML = `
            <div class="responsibility-container" id="responsibility-1">
                <div class="form-group">
                    <label for="responsibility_1">Verantwoordelijkheid 1:</label>
                    <textarea id="responsibility_1" class="text-input" placeholder="Beschrijf een specifieke verantwoordelijkheid of taak die bij de functie hoort."></textarea>
                </div>
                
                <button class="remove-item-button" onclick="removeResponsibility(1)">Verwijder</button>
            </div>
        `;
        
        responsibilityCount = 1;
        
        // Reset qualifications to just one
        const qualificationsContainer = document.getElementById('qualifications-container');
        qualificationsContainer.innerHTML = `
            <div class="qualification-container" id="qualification-1">
                <div class="form-group">
                    <label for="qualification_1">Kwalificatie 1:</label>
                    <textarea id="qualification_1" class="text-input" placeholder="Beschrijf een specifieke kwalificatie, vaardigheid of ervaring die vereist is voor de functie."></textarea>
                </div>
                
                <button class="remove-item-button" onclick="removeQualification(1)">Verwijder</button>
            </div>
        `;
        
        qualificationCount = 1;
        
        // Hide the preview container
        document.getElementById('preview-container').style.display = 'none';
        
        // Remove from local storage
        localStorage.removeItem('job-description-template');
    }
}

// Function to print the template
function printTemplate() {
    // Generate the preview first if it's not already visible
    if (document.getElementById('preview-container').style.display === 'none') {
        generatePreview();
    }
    
    window.print();
}

// Initialize the template when the page loads
document.addEventListener('DOMContentLoaded', function() {
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
    if (localStorage.getItem('job-description-template')) {
        if (confirm('Er is een opgeslagen functieomschrijving template gevonden. Wil je deze laden?')) {
            loadTemplate();
        }
    }
});
