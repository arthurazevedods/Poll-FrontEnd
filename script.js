const socket = io('http://localhost:8000');

const progressBoxes = document.querySelectorAll('.progress-box');
const percentTags = document.querySelectorAll('.percent-tag')
const totalVotesElem = document.getElementById('totalVotes');
let votos_like1 = document.getElementById('votos-like-1')
let votos_dontlike1 = document.getElementById('votos-like-1')


for (let i = 0; i < progressBoxes.length; i++) {
    const elem = progressBoxes[i];
    elem.addEventListener('click',()=>{
        console.log(elem, elem.id)
        addVote(elem,elem.id)
    })
    
}

let vote = false;

const addVote = (elem,id) =>{
    let voteTo = id;
    socket.emit('send-vote',voteTo);
    vote = true;
    //todo: fazer com que somente um seja ativado
    elem.classList.add('active');
}

socket.on('receive-vote', data => {
    updatePolls(data)
})

socket.on('update', data => {
    updatePolls(data)
})

const updatePolls = (data) =>{
    let votingObject = data.votingPolls;
    let totalVotes = data.totalVotes;
    totalVotesElem.innerHTML = totalVotes
    console.log(votingObject)
    votos_like1 = votingObject['dont-like']
    votos_dontlike1 = votingObject['like']
    for (let i = 0; i < percentTags.length; i++) {
        let vote = votingObject[progressBoxes[i].id];
        let setWidth = Math.round(vote / totalVotes * 100);
        const elem = document.querySelector(`#${progressBoxes[i].id}`).querySelector('.percent-tag');
        //elem.setAttribute('data',`${!setWidth? 0: setWidth}%`);
        //elem.style.width = `${!setWidth? 0: setWidth}%`
        //console.log(elem);
    
    }
}