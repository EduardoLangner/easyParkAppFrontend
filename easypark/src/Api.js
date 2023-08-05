const BASE_API = 'http://192.168.113.125:3000'

export default {

    checkToken: async (token) => {
    },

    signIn: async (email, password) => {
        console.log('email: ' + email + ' password: ' + password)
        const req = await fetch(`${BASE_API}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        const json = await req.json()
        return json
    },

    signUp: async (name, email, cpf, password) => {
        const req = await fetch(`${BASE_API}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, cpf, password})
        })
        const json = await req.json()
        return json
    }
}