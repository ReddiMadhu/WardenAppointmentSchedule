const prisma = require('../prisma/db');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) 
        return res.status(400).json({ 'message': 'Username, Password and E-Mail are required.' });

    const duplicateUser = await prisma.users.findUnique({
        where: {
            username: username
        }
    });
    
    if(duplicateUser) 
        return res.status(400).json({ 'message': 'Username already exits' });

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        async function createUser(username, password){
            try{
                const newUser = await prisma.users.create({
                    data:{
                        username,
                        password
                    }
                });
                console.log("New user created:", newUser);
                return new Promise ((resolve, reject) =>{
                    res.status(201).json({ 'success': `New user ${newUser.username} created!` });
                    resolve();
                })
            }catch(error){
                console.error('Error occured during user creation: ', error);
                res.status(500).json({ 'message': error });
            }
        }
        createUser(username, hashedPassword);
        
        
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };