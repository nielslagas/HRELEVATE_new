// Global variables to store scores
let scores = {
    deel1: 0,
    deel2: 0,
    deel3: 0,
    deel4: 0,
    deel5: 0,
    total: 0
};

// Debug function to log information
function debugLog(message, data) {
    if (window.console && console.log) {
        if (data) {
            console.log(message, data);
        } else {
            console.log(message);
        }
    }
}

// Function to update scores when a checkbox is clicked
function updateScore(checkbox, section, value) {
    try {
        debugLog("updateScore called with:", { checkbox: checkbox, section: section, value: value });
        
        if (!checkbox || !section) {
            debugLog("Error: Missing parameters in updateScore");
            return;
        }
        
        // Uncheck other checkboxes in the same row
        const name = checkbox.name;
        var checkboxes = document.querySelectorAll('input[name="' + name + '"]');
        debugLog("Found checkboxes with same name:", checkboxes.length);
        
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i] !== checkbox) {
                checkboxes[i].checked = false;
            }
            checkboxes[i].parentElement.classList.remove('selected-cell');
        }
        
        // Make sure the clicked checkbox is checked (fix for checkbox not checking)
        checkbox.checked = true;
        debugLog("Checkbox checked state set to:", checkbox.checked);
        
        // Add selected-cell class to the parent of the clicked checkbox
        if (checkbox.parentElement) {
            checkbox.parentElement.classList.add('selected-cell');
            debugLog("Added selected-cell class to parent");
        } else {
            debugLog("Warning: Checkbox has no parent element");
        }
        
        // Calculate the score for the section
        recalculateScore(section);
        
        // Update the total score
        updateTotalScore();
        
        // Update the interpretation
        updateInterpretation();
        
        // Save to local storage automatically
        saveWorksheetToLocalStorage();
    } catch (error) {
        debugLog("Error in updateScore:", error.message);
    }
}

// Function to recalculate the score for a section
function recalculateScore(section) {
    try {
        debugLog("recalculateScore called for section:", section);
        let sectionScore = 0;
        
        // Get all checked checkboxes for this section
        // Fix the selector to properly match the section pattern
        const sectionNumber = section.replace('deel', '');
        debugLog("Section number:", sectionNumber);
        
        // Use a more compatible selector that matches the actual checkbox names (q1_1, q2_1, etc.)
        var selector = 'input[name^="q' + sectionNumber + '_"]:checked';
        var checkboxes = document.querySelectorAll(selector);
        debugLog("Found checked checkboxes:", checkboxes.length);
        
        // Sum up the values
        for (var i = 0; i < checkboxes.length; i++) {
            var value = parseInt(checkboxes[i].value) || 0;
            sectionScore += value;
            debugLog("Added value to score:", value);
        }
        
        // Update the score in the global object
        scores[section] = sectionScore;
        debugLog("Updated scores object:", scores);
        
        // Update the display
        var scoreElementId = section + '_score';
        var scoreElement = document.getElementById(scoreElementId);
        if (scoreElement) {
            scoreElement.textContent = sectionScore;
            debugLog("Updated score display for", scoreElementId);
        } else {
            debugLog("Warning: " + scoreElementId + " element not found, skipping display update");
        }
    } catch (error) {
        debugLog("Error in recalculateScore:", error.message);
    }
}

// Function to update the total score
function updateTotalScore() {
    // Log the current scores for debugging
    console.log("Current scores before total calculation:", JSON.stringify(scores));
    
    // Calculate the total score
    scores.total = scores.deel1 + scores.deel2 + scores.deel3 + scores.deel4 + scores.deel5;
    console.log("Calculated total score:", scores.total);
    
    // Update the display
    const totalScoreElement = document.getElementById('total_score');
    if (totalScoreElement) {
        totalScoreElement.textContent = scores.total;
        console.log("Updated total score display to:", scores.total);
    } else {
        console.log('Total score element not found, skipping total score update');
    }
}

// Function to update all score displays
function updateScoreDisplays() {
    // Update section scores
    ['deel1', 'deel2', 'deel3', 'deel4', 'deel5'].forEach(section => {
        const scoreElement = document.getElementById(`${section}_score`);
        if (scoreElement) {
            scoreElement.textContent = scores[section];
        } else {
            console.log(`${section} score element not found, skipping update`);
        }
    });
    
    // Update total score
    const totalScoreElement = document.getElementById('total_score');
    if (totalScoreElement) {
        totalScoreElement.textContent = scores.total;
    } else {
        console.log('Total score element not found, skipping total score update');
    }
}

// Function to update the interpretation based on the total score
function updateInterpretation() {
    const interpretationResult = document.getElementById('interpretation-result');
    const interpretationLevel = document.getElementById('interpretation-level');
    const interpretationText = document.getElementById('interpretation-text');
    
    // If any of the interpretation elements don't exist, return early
    if (!interpretationResult || !interpretationLevel || !interpretationText) {
        console.log('Interpretation elements not found, skipping interpretation update');
        return;
    }
    
    let level = '';
    let text = '';
    
    if (scores.total >= 160) {
        level = 'Excellent';
        text = 'Jullie hebben een volwassen participatiecultuur met sterke structuren, processen en leiderschap. Focus op het verder verfijnen en innoveren van jullie aanpak.';
    } else if (scores.total >= 120) {
        level = 'Gevorderd';
        text = 'Jullie hebben een goede basis voor participatie. Identificeer specifieke verbetergebieden en werk aan het verdiepen van participatie in meer domeinen.';
    } else if (scores.total >= 80) {
        level = 'In ontwikkeling';
        text = 'Jullie hebben eerste stappen gezet richting participatie. Versterk de basis door te investeren in leiderschapsvaardigheden en formele structuren.';
    } else if (scores.total >= 40) {
        level = 'Beginnend';
        text = 'Jullie staan aan het begin van de participatiereis. Begin met het creëren van psychologische veiligheid en experimenteer met laagdrempelige participatievormen.';
    } else {
        level = 'Uitdagend';
        text = 'Jullie organisatie heeft een traditionele, hiërarchische cultuur. Start met bewustwording bij het management en kleine pilotprojecten om de waarde van participatie te demonstreren.';
    }
    
    interpretationLevel.textContent = level;
    interpretationText.textContent = text;
    
    // Only show the interpretation if there's a score
    if (scores.total > 0) {
        interpretationResult.style.display = 'block';
    } else {
        interpretationResult.style.display = 'none';
    }
}

// Function to save the worksheet data to local storage without showing an alert
function saveWorksheetToLocalStorage() {
    const data = {
        scores: scores,
        checkboxes: {},
        textInputs: {}
    };
    
    // Save checkbox states
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        data.checkboxes[checkbox.name] = checkbox.checked;
    });
    
    // Save text inputs
    document.querySelectorAll('textarea, input[type="text"], input[type="date"]').forEach(input => {
        data.textInputs[input.id || input.name || input.placeholder] = input.value;
    });
    
    // Save to local storage
    localStorage.setItem('medewerkerparticipatie-zelfscan', JSON.stringify(data));
}

// Function to save the worksheet data to local storage with confirmation
function saveWorksheet() {
    saveWorksheetToLocalStorage();
    alert('Je zelfscan is opgeslagen in je browser. Je kunt later terugkomen om verder te gaan.');
}

// Function to load the worksheet data from local storage
function loadWorksheet() {
    const savedData = localStorage.getItem('medewerkerparticipatie-zelfscan');
    
    if (savedData) {
        const data = JSON.parse(savedData);
        
        // Restore scores
        scores = data.scores;
        
        // Update score displays
        updateScoreDisplays();
        
        // Restore checkbox states
        for (const [name, checked] of Object.entries(data.checkboxes)) {
            const checkbox = document.querySelector(`input[name="${name}"]`);
            if (checkbox) {
                checkbox.checked = checked;
            }
        }
        
        // Restore text inputs
        for (const [identifier, value] of Object.entries(data.textInputs)) {
            const input = document.querySelector(`textarea[id="${identifier}"], textarea[name="${identifier}"], textarea[placeholder="${identifier}"], input[type="text"][id="${identifier}"], input[type="text"][name="${identifier}"], input[type="text"][placeholder="${identifier}"], input[type="date"][id="${identifier}"], input[type="date"][name="${identifier}"]`);
            if (input) {
                input.value = value;
            }
        }
        
        // Update interpretation
        updateInterpretation();
        
        alert('Je opgeslagen zelfscan is geladen.');
    } else {
        alert('Er is geen opgeslagen zelfscan gevonden.');
    }
}

// Function to reset the worksheet
function resetWorksheet() {
    if (confirm('Weet je zeker dat je de zelfscan wilt resetten? Alle ingevulde gegevens worden gewist.')) {
        // Reset scores
        scores = {
            deel1: 0,
            deel2: 0,
            deel3: 0,
            deel4: 0,
            deel5: 0,
            total: 0
        };
        
        // Update score displays
        updateScoreDisplays();
        
        // Uncheck all checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Clear all text inputs
        document.querySelectorAll('textarea, input[type="text"], input[type="date"]').forEach(input => {
            input.value = '';
        });
        
        // Hide interpretation
        document.getElementById('interpretation-result').style.display = 'none';
        
        // Remove from local storage
        localStorage.removeItem('medewerkerparticipatie-zelfscan');
    }
}

// Function to print the worksheet
function printWorksheet() {
    window.print();
}

// Initialize the worksheet when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to buttons
    const saveButton = document.getElementById('save-button');
    if (saveButton) {
        saveButton.addEventListener('click', saveWorksheet);
    }
    
    const loadButton = document.getElementById('load-button');
    if (loadButton) {
        loadButton.addEventListener('click', loadWorksheet);
    }
    
    const resetButton = document.getElementById('reset-button');
    if (resetButton) {
        resetButton.addEventListener('click', resetWorksheet);
    }
    
    const printButton = document.getElementById('print-button');
    if (printButton) {
        printButton.addEventListener('click', printWorksheet);
    }
    
    // Check if there's saved data
    if (localStorage.getItem('medewerkerparticipatie-zelfscan')) {
        if (confirm('Er is een opgeslagen zelfscan gevonden. Wil je deze laden?')) {
            loadWorksheet();
        }
    }
});
