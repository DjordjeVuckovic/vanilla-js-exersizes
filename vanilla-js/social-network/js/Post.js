class Post {
    postId = ''
    postContent = ''
    userId = ''
    likes = ''
    api_url = 'https://632d9d4b519d17fb53c23888.mockapi.io/'
     async create(){
        let session = new Session()
        const session_id = session.getSession()
        let data = {
            userId : session_id,
            postContent : this.postContent,
            likes:0
        }
        data = JSON.stringify(data)
        console.log(data)
        let response  = await  fetch(this.api_url + '/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:data
        })
        return await response.json()
    }

    async getAll() {
        let response = await fetch(this.api_url + '/posts')
        return await response.json();
    }
}