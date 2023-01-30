class User {
    // constructor(username,password,email) {
    //     this.username = username
    //     this.password = password
    //     this.email = email
    // }
    id = '';
    username = '';
    email = '';
    password = '';
    api_url = 'https://632d9d4b519d17fb53c23888.mockapi.io/';
    create(){
        let data = {
            username: this.username,
            email:this.email,
            password:this.password
        }
        data = JSON.stringify(data);
        console.log(data)
        fetch(this.api_url + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:data
        })
            .then(response  => response.json())
            .then(
            data => {
                //console.log('Created user:',data)
                let session = new Session()
                session.user_id = data.id
                session.startSession()
                window.location.href = 'hexa.html'
            }
        )
    }
    login(){
        fetch(this.api_url + '/users')
            .then(response  => response.json())
            .then(
            data => {
                //console.log('Created user:',data)
                let success = false
                for (const db_user of data) {
                   if( db_user.email === this.email && db_user.password === this.password){
                       let session = new Session()
                       session.user_id = db_user.id
                       session.startSession()
                       window.location.href = 'hexa.html'
                       success = true
                       break
                   }
                }
                if(!success){
                    alert('Wrong credential')
                }
            }
        )

    }

    async get(user_id) {
        let response = await fetch(this.api_url + 'users/' + user_id)
        return await response.json()
        // fetch(this.api_url +'users/'+ user_id)
        //     .then(response => response.json())
        //     .then(data => {
        //         return data
        //     })
    }

    update() {
        let data = {
            username: this.username,
            email:this.email,
        }
        data = JSON.stringify(data);
        let session = new Session()
        let session_id = session.getSession()
        console.log(session_id)
        fetch(this.api_url + '/users/' + session_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:data
        })
            .then(response  => response.json())
            .then(
                data => {
                    console.log('Created user:',data)
                    window.location.href = 'hexa.html'
                }
            )

    }
    delete(){
        let session = new Session()
        let session_id = session.getSession()
        fetch(this.api_url + '/users/' + session_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response  => response.json())
            .then(
                data => {
                    console.log('Created user:',data)
                    session.destroySession()
                    window.location.href = 'index.html'
                })

    }
}