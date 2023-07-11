const axios = require("axios")

const apic = axios.create({
    baseURL: 'https://api.unilab.edu.br/api/'
});

module.exports = {

    userget: async(newUser)=>{
        try{
            const response = await apic.get('/bond', {
                headers: {authorization: newUser}
            })

            return { error: false, data: response.data};
        }catch(err){
            return {error: true, message: "credencias erradas!"}
        }
    }
}