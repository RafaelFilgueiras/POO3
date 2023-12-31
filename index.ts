import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { Time } from "./time";
import { User } from "./user";

const app = new App()
async function registerAndPrintUsers() {
    try {
        const bike = new Bike('caloi mountain', 'mountain bike', 100, 200, 150.5, 'My bike', 5, []);
        const bikeId = app.registerBike(bike);

        // Registrar um usuário com senha criptografada
        const user = new User('Jose', 'jose@mail.com', '1234')
        const user1 = new User('Pedro', 'pedro@mail.com', 'senha')
        await app.registerUser(user)
        await app.registerUser(user1)

        const email = 'pedro@mail.com';
        const password = 'senha';

        // Autenticar o usuário
        const isAuthenticated = await app.authenticateUser(email, password)
        if (isAuthenticated) {
            console.log('Usuário autenticado com sucesso.')
        } else {
            console.log('Credenciais inválidas. Autenticação falhou.')
        }
        // Listar os usuários
        const users = app.listUsers()
        // console.log('List of users:', users)

        // Realizar um aluguel de bicicleta
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1)
        const time1 = new Time(0,0)
        const time2 = new Time(30,1)
        await app.rentBike(bikeId, user.email, time1)
        const aluguel = await app.returnBike(bikeId, user.email,time2,time1)

        // Listar os aluguéis
        const rents = app.listRent()
        console.log("Aluguel de bicicleta", rents)
        console.log('valor do aluguel', aluguel)


        // Listar as bicicletas
        const bikes = app.listBikes()
        // console.log('Lista de bicicletas:', bikes)

    } catch (error) {
        console.error('deu ruim:', error)
    }
}

registerAndPrintUsers();

// import { App } from "./app"
// import { Bike } from "./bike"
// import { Rent } from "./rent"
// import { User } from "./user"

// const app = new App()
// const u1 = new User('Joao', 'joao@mail.com', '1234')
// app.addUser(u1)
// app.addUser(u1)
