const url = "https://poll-nodeserver.onrender.com"

// Cards
const cardsJs = (value) =>{
    const container = document.querySelector('#cardscontainer')
                
    const enquetCard = document.createElement('div')
    const titleCard = document.createElement('p')
    const divAvaliation = document.createElement('div')
    const uidCard = document.createElement('span')
    const buttonAvaliationLike = document.createElement('button')
    const buttonAvaliationUnLike = document.createElement('button')
    const iconsAvaliationUnlike = document.createElement('i')
    const iconsAvaliationLike = document.createElement('i')
    const buttonshowvotes = document.createElement('button')

    enquetCard.classList.add('card','d-flex', 'justify-content-around', 'p-3', 'cardEnquets')
    titleCard.classList.add('card-title', 'questionTitle')
    divAvaliation.classList.add('d-flex', 'gap-5')
    uidCard.classList.add('span-uid')
    buttonAvaliationLike.classList.add('progress-box', 'btn', 'btn-like')
    buttonAvaliationUnLike.classList.add('progress-box', 'btn', 'btn-unlike')
    
    iconsAvaliationUnlike.classList.add('fa-regular', 'fa-thumbs-down')
    iconsAvaliationLike.classList.add('fa-regular', 'fa-thumbs-up')
    
    buttonshowvotes.classList.add('btn', 'btn-primary')
    buttonAvaliationLike.setAttribute('data-toggle', 'modal')
    buttonAvaliationLike.setAttribute('data-target', '#modalFinalizado')

    buttonAvaliationUnLike.setAttribute('data-toggle', 'modal')
    buttonAvaliationUnLike.setAttribute('data-target', '#modalFinalizado')

    buttonshowvotes.setAttribute('data-toggle','modal')
    buttonshowvotes.setAttribute('data-target', '#modalEnquete')
    buttonshowvotes.setAttribute('type', 'button')

    titleCard.textContent = value.Question
    buttonshowvotes.textContent = "Votos"

    divAvaliation.append(buttonAvaliationLike)
    divAvaliation.append(buttonAvaliationUnLike)

    buttonAvaliationLike.append(uidCard)
    buttonAvaliationUnLike.append(uidCard)
    
    buttonAvaliationLike.append(iconsAvaliationLike)
    buttonAvaliationUnLike.append(iconsAvaliationUnlike)
   
    enquetCard.append(titleCard)
    enquetCard.append(divAvaliation)
    enquetCard.append(buttonshowvotes)

    container.append(enquetCard)

    LikeButton(buttonAvaliationLike, value)
    UnLikeButton(buttonAvaliationUnLike, value)

    showVotes(buttonshowvotes, value.uid)
}
//Endpoints
const update = async (uid, votesLike, votesUnlike) =>{
    await axios.put(url + "/enquets/" + uid, {
        like: votesLike,
        unlike: votesUnlike,
    }) 
    .then(res => console.log(res.data))
}

const getDoc = async (id) =>{

    const votesLike = document.querySelector("#like-votes")
    const votesUnLike = document.querySelector("#dontlike-votes")

    var data;
    await axios.get(url + "/enquets/" + id)
        .then(res => {data = res.data } )
        .catch()
    votesLike.textContent = data.votesLike
    votesUnLike.textContent = data.votesUnlike

}

const getDocs = async () => {
    var data;
    
    await axios.get(url + "/enquets") 
        .then(res => {data = res.data})
        .catch()

    
    data.map(item => {
        cardsJs(item)
    })
}
// Functions
const LikeButton = (btn, data) => {
   btn.addEventListener("click", function(){
        var sum = data.votesLike + 1 
        update(data.uid, sum, data.votesUnlike)
   })
    
}

const UnLikeButton = (btn, data) => {

    btn.addEventListener("click", function(){
        console.log("Chegou data" + data.votesUnlike)
        var sum = data.votesUnlike + 1 
        console.log('teste' + data.votesUnlike)
        update(data.uid, data.votesLike, sum)
         //adicionar o modal
    })
 }
const showVotes = (btn, id) => {
    var data
    btn.addEventListener("click", function(){
       data = getDoc(id)
    })
 }

const reloadPage = () =>{
    location.reload()
}

getDocs()
