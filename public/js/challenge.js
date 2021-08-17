const challengeBtn = document.querySelector('.challengeBtn');


function challengeUser(event) {
    event.preventDefault

    var answers = ['yes', 'no']
    var index = Math.floor(Math.random() * answers.length);
    var userChoice = answers[index]
    console.log(userChoice)

if (userChoice === 'yes'){
    window.alert('Challenge Accepted')
} else {
    window.alert('Challenge Denied')
}
 return;
}

challengeBtn.addEventListener('click', challengeUser)