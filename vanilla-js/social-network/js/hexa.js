let session = new Session()
session_id = session.getSession()
let data = null
if(session_id !==''){
    async function populateData(){
        let user = new User()
        data = await  user.get(session_id)
        document.querySelector('#email_profile').innerText = data.email
        document.querySelector('#username_profile').innerText = data.username
    }
    populateData()
    //alert('You logged in!')
}
else{
    window.location.href = '/'
}
document.querySelector('#out-btn').addEventListener('click',(e)=>{
    e.preventDefault()
    session.destroySession()
    window.location.href = '/'
})
let modal = document.querySelector('.custom-modal')
document.querySelector('#edit-btn').addEventListener('click',(e)=>{
    e.preventDefault()
    modal.style.display = 'block'
    document.querySelector('#username_edit').setAttribute('value',data.username)
    document.querySelector('#email_edit').setAttribute('value',data.email)
})
document.querySelector('#closeModal').addEventListener('click',(e) =>{
    e.preventDefault()
    modal.style.display = 'none'
})
document.querySelector('#edit-form').addEventListener('submit', e => {
    e.preventDefault()
    let user = new User();
    user.username = document.querySelector('#username_edit').value
    user.email = document.querySelector('#email_edit').value
    //user.password = document.querySelector('#password_edit').value
    user.update()
})
document.querySelector('#delete-profile').addEventListener('click', e =>{
    e.preventDefault()
    let user = new User()
    user.delete()
})
async function fetchPost(){
    let post = new Post()
    post.postContent = document.querySelector('#postContent').value
    post = await post.create()
    let currentUser = new User()
    currentUser = await currentUser.get(session_id)
    let deletePostElement = '';
    //console.log(post.userId,session_id)
    let postHtml = document.querySelector('.all-posts').innerHTML
    if(session_id === post.userId) {
        deletePostElement = '<button id="remove-btn" onclick="removeMyPost()">Remove</button>'
    }
    document.querySelector('.all-posts').innerHTML =
        `<div class="single-post" data-post_id="${post.id}">
            <div class="post-content">${post.postContent}
            </div>
                <div class="post-actions">
                    <p>Autor:</> ${currentUser.username}</p>
                    <div>
                        <button onclick="likePost(this)" class="likePost like-btn"><span>${post.likes}</span>Likes</button>
                        <button onclick="commentPost(this)" id="comment-btn">Comments</button>
                        ${deletePostElement}
                    </div>
        </div>
        <div class="post-comments">
            <form onsubmit="commentPostSubmit(event)" class="form-comment">
                <input type="text" id="comment-input" placeholder="Write comment...">
                <button id="post-btn" >Comment</button>
            </form>
        </div>
       </div>
       `+ postHtml
    console.log(post)
}
document.querySelector('#postForm').addEventListener('submit', e =>{
    e.preventDefault()
    fetchPost()
})
const commentPost =  btn => {
    //console.log(btn)
    let mainPost = btn.closest('.single-post')
    let postId = mainPost.getAttribute('data-post_id')
    mainPost.querySelector('.post-comments').style.display = 'block'
}
const removeMyPost = () => {

}
const likePost = (btn) => {
    console.log(btn)
}
const commentPostSubmit = e => {
    e.preventDefault()
    let btn = e.target
    let mainPost = btn.closest('.single-post')
    let postId = mainPost.getAttribute('data-post_id')
    let commentValue = mainPost.querySelector('input').value
    mainPost.querySelector('.post-comments').innerHTML += `<div class="single-comment">${commentValue}</div>`
    mainPost.querySelector('input').value = ''
    createPost(postId,commentValue).then( res => console.log(res))
}
async function createPost(postId,commentValue){
    let comment = new Comment()
    comment.content = commentValue
    comment.postId = postId
    console.log(comment.content)
    return await comment.create()
}
async function getAllCommentsByPost(postId){
    return await comment.getAllByPostId(postId)
}
async function getAllPosts(){
    let allPosts = new Post()
    return await allPosts.getAll()
}
getAllPosts().then(
    allPost => {
        allPost.forEach(post => {
            async function getPostUser() {
                let user  = new User()
                user = await  user.get(post.userId)
                let postHtml = document.querySelector('.all-posts').innerHTML
                let deletePostElement = '';
                let commentElement = '';
                let comment = new Comment()
                console.log(post.id)
                let comments = await comment.getAllByPostId(post.id)
                if(comments.length > 0){
                    comments.forEach( comment =>{
                        commentElement += `<div class="single-comment">${comment.content} </div>`
                    })
                }
                console.log(comments)
                let commentHtml = ''
                if(session_id === post.userId) {
                    deletePostElement = '<button id="remove-btn" onclick="removeMyPost()">Remove</button>'
                }
                document.querySelector('.all-posts').innerHTML = `<div class="single-post" data-post_id="${post.id}">
                        <div class="post-content">${post.postContent}
                            </div>
                            <div class="post-actions">
                                <p>Autor:</> ${user.username}</p>
                                <div>
                                    <button onclick="likePost(this)" class="likePost like-btn"><span>${post.likes}</span>Likes</button>
                                    <button onclick="commentPost(this)" id="comment-btn">Comments</button>
                                    ${deletePostElement}
                                </div>
                            </div>
                            <div class="post-comments">
                                <form onsubmit="commentPostSubmit(event)">
                                <input type="text" id="comment-input" placeholder="Write comment...">
                                <button id="post-btn">Comment</button>
                                </form>
                                ${commentElement}
                            </div>
                           </div>
                 ` + postHtml
            }
            getPostUser()
        }
        )
    }
)

