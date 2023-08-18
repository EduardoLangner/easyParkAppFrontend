const BASE_API = 'http://192.168.129.148:3000'

export default {

    // refreshToken: async (token) => {
    //     const req = await fetch(`${BASE_API}/refreshToken`, {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             authorization: `Bearer ${token}`
    //         }
    //     })
    //     const json = await req.json()
    //     return json
    // },

    signIn: async (email, password) => {
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