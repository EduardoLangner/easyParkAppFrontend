const BASE_API = 'http://192.168.0.19:3000'
const BASE_ASAAS = 'https://sandbox.asaas.com/api/v3'

export default {

    // refreshToken: async (token) => {
    //     const req = await fetch(`${BASE_API}/refreshToken`, {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',k
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

    signUp: async (name, cpf, email, password) => {
        const req = await fetch(`${BASE_API}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, cpf, email, password})
        })
        const json = await req.json()
        return json
    },

    getUserByID: async (userID, token) => {
        const req = await fetch(`${BASE_API}/users/${userID}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}` 
            }
        })
        const json = await req.json()
        return json
    },

    updateUserByID: async (userId, asaas_id, token) => {
        const req = await fetch(`${BASE_API}/users/${userId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}` 
            },
            body: JSON.stringify({ asaas_id })
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
    },

    createCustomer: async (userName, userCPF, token) => {
        const requestBody = { name: userName, cpfCnpj: userCPF }

        console.log(requestBody)
        
        const req = await fetch(`${BASE_ASAAS}/customers`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-Type': 'application/json',
                'access_token': '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNjgyNjc6OiRhYWNoXzE1YmNkNGJjLTlmMmQtNDcxZi05ODhkLWNjM2VmODQwMzVhZA==',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(requestBody), 
        });
    
        const json = await req.json();
        return json;
    },

    createCreditCard: async (customer, billingType, dueDate, value, holderName, number, expiryMonth, expiryYear, ccv, name, email, cpfCnpj, postalCode, addressNumber, phone, authorizeOnly, token) => {

        const requestBody = {
            customer,
            billingType,
            dueDate,
            value,
            creditCard: {
                holderName,
                number,
                expiryMonth,
                expiryYear,
                ccv
            },
            creditCardHolderInfo: {
                name,
                email,
                cpfCnpj,
                postalCode,
                addressNumber,
                phone,
            },
            authorizeOnly
        };
    
        const req = await fetch(`${BASE_ASAAS}/payments`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-Type': 'application/json',
                'access_token': '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNjgyNjc6OiRhYWNoXzE1YmNkNGJjLTlmMmQtNDcxZi05ODhkLWNjM2VmODQwMzVhZA==',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(requestBody),
        });
    
        const json = await req.json();
        return json;
    },

    addCreditCard: async (idCartaoAsaas, numberCreditCard, holderName, tokenCreditCard, userID, token) => {
        
        const req = await fetch(`${BASE_API}/creditcard`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}` 
            },
            body: JSON.stringify({ asaas_creditcard_id: idCartaoAsaas, credit_card_number: numberCreditCard, credit_card_name: holderName, credit_card_token: tokenCreditCard, user_id: userID }),
        });
        const json = await req.json();
        return json;
    },

    getCreditCardByUserId: async (userID, token) => {
        const req = await fetch(`${BASE_API}/creditcardbyuser/${userID}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}` 
            }
        });
        const json = await req.json();
        return json;
    },

    createPayment: async (customer, billingType, value, dueDate, creditCardToken, token) => {

        const requestBody = {
            customer,
            billingType,
            value,
            dueDate,
            creditCardToken
        };

        const req = await fetch(`${BASE_ASAAS}/payments`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-Type': 'application/json',
                'access_token': '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNjgyNjc6OiRhYWNoXzE1YmNkNGJjLTlmMmQtNDcxZi05ODhkLWNjM2VmODQwMzVhZA==',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(requestBody),
        });
    
        const json = await req.json();
        return json;
    },

    updateAccountBalanceUserByID: async (userId, account_balance, token) => {
        const req = await fetch(`${BASE_API}/users/${userId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}` 
            },
            body: JSON.stringify({ account_balance })
        })
        const json = await req.json()
        return json
    },
}