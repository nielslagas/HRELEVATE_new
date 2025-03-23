// Global variables
let goalCount = 1; // Start with one goal

// Function to add a new goal
function addGoal() {
    goalCount++;
    
    const goalsContainer = document.getElementById('goals-container');
    
    // Create a new goal container
    const goalContainer = document.createElement('div');
    goalContainer.className = 'goal-container';
    goalContainer.id = `goal-${goalCount}`;
    
    // Set the HTML content for the new goal
    goalContainer.innerHTML = `
        <h3>Doel ${goalCount}</h3>
        
        <div class="form-group">
            <label for="goal_description_${goalCount}">Doelomschrijving:</label>
            <textarea id="goal_description_${goalCount}" class="text-input" placeholder="Beschrijf het specifieke doel dat de medewerker moet bereiken."></textarea>
        </div>
        
        <div class="form-group">
            <label for="expected_results_${goalCount}">Verwachte resultaten:</label>
            <textarea id="expected_results_${goalCount}" class="text-input" placeholder="Beschrijf de specifieke, meetbare resultaten die worden verwacht."></textarea>
        </div>
        
        <div class="form-group">
            <label for="action_steps_${goalCount}">Actiestappen:</label>
            <textarea id="action_steps_${goalCount}" class="text-input" placeholder="Beschrijf de specifieke stappen die de medewerker moet nemen om het doel te bereiken."></textarea>
        </div>
        
        <div class="form-group">
            <label for="measurement_${goalCount}">Meting en evaluatie:</label>
            <textarea id="measurement_${goalCount}" class="text-input" placeholder="Beschrijf hoe de voortgang zal worden gemeten en geëvalueerd."></textarea>
        </div>
        
        <div class="form-row">
            <div class="form-col">
                <div class="form-group">
                    <label for="goal_start_date_${goalCount}">Startdatum:</label>
                    <input type="date" id="goal_start_date_${goalCount}" class="date-input">
                </div>
            </div>
            <div class="form-col">
                <div class="form-group">
                    <label for="goal_end_date_${goalCount}">Einddatum:</label>
                    <input type="date" id="goal_end_date_${goalCount}" class="date-input">
                </div>
            </div>
        </div>
        
        <button class="remove-goal-button" onclick="removeGoal(${goalCount})">Verwijder doel</button>
    `;
    
    // Add the new goal to the container
    goalsContainer.appendChild(goalContainer);
    
    // Save to local storage automatically
    saveTemplateToLocalStorage();
}

// Function to remove a goal
function removeGoal(goalId) {
    if (goalCount <= 1) {
        alert('Er moet minimaal één doel zijn.');
        return;
    }
    
    const goalElement = document.getElementById(`goal-${goalId}`);
    if (goalElement) {
        goalElement.remove();
        
        // Renumber the remaining goals
        const goalElements = document.querySelectorAll('.goal-container');
        goalCount = goalElements.length;
        
        goalElements.forEach((element, index) => {
            const goalNumber = index + 1;
            element.id = `goal-${goalNumber}`;
            
            // Update the heading
            const heading = element.querySelector('h3');
            if (heading) {
                heading.textContent = `Doel ${goalNumber}`;
            }
            
            // Update the remove button
            const removeButton = element.querySelector('.remove-goal-button');
            if (removeButton) {
                removeButton.setAttribute('onclick', `removeGoal(${goalNumber})`);
            }
        });
        
        // Save to local storage automatically
        saveTemplateToLocalStorage();
    }
}

// Function to save the template data to local storage
function saveTemplateToLocalStorage() {
    const data = {
        inputs: {},
        goals: []
    };
    
    // Save text inputs, textareas, selects, and dates
    document.querySelectorAll('input[type="text"], textarea, select, input[type="date"]').forEach(input => {
        data.inputs[input.id] = input.value;
    });
    
    // Save goals
    const goalElements = document.querySelectorAll('.goal-container');
    goalElements.forEach((element, index) => {
        const goalNumber = index + 1;
        const goal = {
            id: goalNumber,
            description: document.getElementById(`goal_description_${goalNumber}`)?.value || '',
            expected_results: document.getElementById(`expected_results_${goalNumber}`)?.value || '',
            action_steps: document.getElementById(`action_steps_${goalNumber}`)?.value || '',
            measurement: document.getElementById(`measurement_${goalNumber}`)?.value || '',
            start_date: document.getElementById(`goal_start_date_${goalNumber}`)?.value || '',
            end_date: document.getElementById(`goal_end_date_${goalNumber}`)?.value || ''
        };
        
        data.goals.push(goal);
    });
    
    // Save to local storage
    localStorage.setItem('performance-improvement-plan', JSON.stringify(data));
}

// Function to save the template data to local storage with confirmation
function saveTemplate() {
    saveTemplateToLocalStorage();
    alert('Je Performance Improvement Plan is opgeslagen in je browser. Je kunt later terugkomen om verder te gaan.');
}

// Function to load the template data from local storage
function loadTemplate() {
    const savedData = localStorage.getItem('performance-improvement-plan');
    
    if (savedData) {
        const data = JSON.parse(savedData);
        
        // Restore text inputs, textareas, selects, and dates
        for (const [id, value] of Object.entries(data.inputs)) {
            const input = document.getElementById(id);
            if (input) {
                input.value = value;
            }
        }
        
        // Restore goals
        if (data.goals && data.goals.length > 0) {
            // Clear existing goals
            const goalsContainer = document.getElementById('goals-container');
            goalsContainer.innerHTML = '';
            
            // Add saved goals
            data.goals.forEach((goal, index) => {
                const goalNumber = index + 1;
                
                // Create a new goal container
                const goalContainer = document.createElement('div');
                goalContainer.className = 'goal-container';
                goalContainer.id = `goal-${goalNumber}`;
                
                // Set the HTML content for the goal
                goalContainer.innerHTML = `
                    <h3>Doel ${goalNumber}</h3>
                    
                    <div class="form-group">
                        <label for="goal_description_${goalNumber}">Doelomschrijving:</label>
                        <textarea id="goal_description_${goalNumber}" class="text-input" placeholder="Beschrijf het specifieke doel dat de medewerker moet bereiken.">${goal.description}</textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="expected_results_${goalNumber}">Verwachte resultaten:</label>
                        <textarea id="expected_results_${goalNumber}" class="text-input" placeholder="Beschrijf de specifieke, meetbare resultaten die worden verwacht.">${goal.expected_results}</textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="action_steps_${goalNumber}">Actiestappen:</label>
                        <textarea id="action_steps_${goalNumber}" class="text-input" placeholder="Beschrijf de specifieke stappen die de medewerker moet nemen om het doel te bereiken.">${goal.action_steps}</textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="measurement_${goalNumber}">Meting en evaluatie:</label>
                        <textarea id="measurement_${goalNumber}" class="text-input" placeholder="Beschrijf hoe de voortgang zal worden gemeten en geëvalueerd.">${goal.measurement}</textarea>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-col">
                            <div class="form-group">
                                <label for="goal_start_date_${goalNumber}">Startdatum:</label>
                                <input type="date" id="goal_start_date_${goalNumber}" class="date-input" value="${goal.start_date}">
                            </div>
                        </div>
                        <div class="form-col">
                            <div class="form-group">
                                <label for="goal_end_date_${goalNumber}">Einddatum:</label>
                                <input type="date" id="goal_end_date_${goalNumber}" class="date-input" value="${goal.end_date}">
                            </div>
                        </div>
                    </div>
                    
                    <button class="remove-goal-button" onclick="removeGoal(${goalNumber})">Verwijder doel</button>
                `;
                
                // Add the goal to the container
                goalsContainer.appendChild(goalContainer);
            });
            
            // Update the goal count
            goalCount = data.goals.length;
        }
        
        alert('Je opgeslagen Performance Improvement Plan is geladen.');
    } else {
        alert('Er is geen opgeslagen Performance Improvement Plan gevonden.');
    }
}

// Function to reset the template
function resetTemplate() {
    if (confirm('Weet je zeker dat je de template wilt resetten? Alle ingevulde gegevens worden gewist.')) {
        // Clear all text inputs, textareas, selects, and dates
        document.querySelectorAll('input[type="text"], textarea, select, input[type="date"]').forEach(input => {
            input.value = '';
        });
        
        // Reset goals to just one
        const goalsContainer = document.getElementById('goals-container');
        goalsContainer.innerHTML = `
            <div class="goal-container" id="goal-1">
                <h3>Doel 1</h3>
                
                <div class="form-group">
                    <label for="goal_description_1">Doelomschrijving:</label>
                    <textarea id="goal_description_1" class="text-input" placeholder="Beschrijf het specifieke doel dat de medewerker moet bereiken."></textarea>
                </div>
                
                <div class="form-group">
                    <label for="expected_results_1">Verwachte resultaten:</label>
                    <textarea id="expected_results_1" class="text-input" placeholder="Beschrijf de specifieke, meetbare resultaten die worden verwacht."></textarea>
                </div>
                
                <div class="form-group">
                    <label for="action_steps_1">Actiestappen:</label>
                    <textarea id="action_steps_1" class="text-input" placeholder="Beschrijf de specifieke stappen die de medewerker moet nemen om het doel te bereiken."></textarea>
                </div>
                
                <div class="form-group">
                    <label for="measurement_1">Meting en evaluatie:</label>
                    <textarea id="measurement_1" class="text-input" placeholder="Beschrijf hoe de voortgang zal worden gemeten en geëvalueerd."></textarea>
                </div>
                
                <div class="form-row">
                    <div class="form-col">
                        <div class="form-group">
                            <label for="goal_start_date_1">Startdatum:</label>
                            <input type="date" id="goal_start_date_1" class="date-input">
                        </div>
                    </div>
                    <div class="form-col">
                        <div class="form-group">
                            <label for="goal_end_date_1">Einddatum:</label>
                            <input type="date" id="goal_end_date_1" class="date-input">
                        </div>
                    </div>
                </div>
                
                <button class="remove-goal-button" onclick="removeGoal(1)">Verwijder doel</button>
            </div>
        `;
        
        goalCount = 1;
        
        // Reset signature dates
        setCurrentDate();
        
        // Remove from local storage
        localStorage.removeItem('performance-improvement-plan');
    }
}

// Function to print the template
function printTemplate() {
    window.print();
}

// Function to set the current date for signature fields
function setCurrentDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    
    const dateElements = document.querySelectorAll('#employee_sign_date, #manager_sign_date, #hr_sign_date');
    dateElements.forEach(element => {
        element.textContent = formattedDate;
    });
}

// Initialize the template when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set current date for signature fields
    setCurrentDate();
    
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
    if (localStorage.getItem('performance-improvement-plan')) {
        if (confirm('Er is een opgeslagen Performance Improvement Plan gevonden. Wil je deze laden?')) {
            loadTemplate();
        }
    }
});
