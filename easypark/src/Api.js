const BASE_API = 'http://192.168.46.247:3000'

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
    },

    addPlate: async (plate, userID, token) => {
        const req = await fetch(`${BASE_API}/vehicles`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}` 
            },
            body: JSON.stringify({ plate, user_id: userID }),
        });
        const json = await req.json();
        return json;
    },
    
    getPlate: async (userID, token) => {
        const req = await fetch(`${BASE_API}/vehiclesbyuser/${userID}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}` 
            }
        });
        const json = await req.json();
        return json;
    }
    
}