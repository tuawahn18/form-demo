document.addEventListener('DOMContentLoaded', function() {

    const questionsContainer = document.getElementById('questions-container');
    const editDialog = document.getElementById('edit-dialog');
    const confirmDeleteDialog = document.getElementById('confirm-delete-dialog');
    const editForm = document.getElementById('edit-form');
    let currentEditIndex = null;

    function renderQuestions() {
        questionsContainer.innerHTML = ''; 

        questions.forEach((question, index) => {
            const details = document.createElement('details');
            const summary = document.createElement('summary');
            summary.textContent = `Question ${index + 1}: ${question.question}`;
            details.appendChild(summary);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', function() {
                openEditDialog(index);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function() {
                openConfirmDeleteDialog(index);
            });

            details.appendChild(editButton);
            details.appendChild(deleteButton);

            question.answers.forEach((answer) => {
                const answerText = document.createElement('p');
                answerText.textContent = `${answer.answer} ${answer.is_correct ? '(Correct)' : ''}`;
                details.appendChild(answerText);
            });

            questionsContainer.appendChild(details);
        });
    }

    function openEditDialog(index) {
        currentEditIndex = index;
        const question = questions[index];

        document.getElementById('question-number').value = index + 1;
        document.getElementById('question-text').value = question.question;

        const optionsContainer = document.getElementById('edit-options-container');
        optionsContainer.innerHTML = ''; 

        question.answers.forEach((answer, answerIndex) => {
            const input = document.createElement('input');
            input.type = 'text';
            input.name = `option-${answerIndex}`;
            input.value = answer.answer;

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'correct_answer';
            radio.value = answerIndex;
            if (answer.is_correct) {
                radio.checked = true;
            }

            optionsContainer.appendChild(input);
            optionsContainer.appendChild(radio);

            const label = document.createElement('span');
            label.textContent = ' Is correct answer';
            optionsContainer.appendChild(label);

            const br = document.createElement('br');
            optionsContainer.appendChild(br);
        });

        editDialog.style.display = 'block'; 
    }

    function closeEditDialog() {
        editDialog.style.display = 'none'; 
    }

    function openConfirmDeleteDialog(index) {
        currentEditIndex = index;
        confirmDeleteDialog.style.display = 'block'; 
    }

    function closeConfirmDeleteDialog() {
        confirmDeleteDialog.style.display = 'none'; 
    }

    document.getElementById('submit-edit').addEventListener('click', function() {
        const questionText = document.getElementById('question-text').value;
        const options = Array.from(document.querySelectorAll('#edit-options-container input[type="text"]')).map(input => input.value);
        const correctAnswerIndex = document.querySelector('input[name="correct_answer"]:checked').value;

        questions[currentEditIndex].question = questionText;
        questions[currentEditIndex].answers = options.map((option, index) => ({
            answer: option,
            is_correct: index == correctAnswerIndex
        }));

        closeEditDialog();
        renderQuestions(); 
        alert('Edit successful!');
    });

    document.getElementById('confirm-delete').addEventListener('click', function() {
        questions.splice(currentEditIndex, 1); 
        closeConfirmDeleteDialog();
        renderQuestions(); 
        alert('Question deleted successfully!');
    });

    document.getElementById('cancel-delete').addEventListener('click', function() {
        closeConfirmDeleteDialog();
    });

    document.querySelector('.close').addEventListener('click', closeEditDialog);

    renderQuestions();
});
