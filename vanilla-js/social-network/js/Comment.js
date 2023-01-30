class Comment {
    postId = ''
    userId = ''
    content = ''
    api_url = 'https://632d9d4b519d17fb53c23888.mockapi.io/'
    async  create(){
        let session = new Session()
        const session_id = session.getSession()
        let data = {
            userId : session_id,
            postId : this.postId,
            content: this.content
        }
        data = JSON.stringify(data)
        console.log(data)
        let response  = await  fetch(this.api_url + '/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:data
        })
        return await response.json()
    }
    async getAllByPostId(postId) {
        let session = new Session()
        let response = await fetch(this.api_url + '/comments')
        let comments = await response.json()
        let newComments = []
        let i=0
        comments.forEach(comment => {
            if(comment.postId == postId){
                newComments[i] = comment
                i++;
            }
        })
        //let newComments = comments.filter(comment => comment.postId === postId)
        return newComments;
    }
}