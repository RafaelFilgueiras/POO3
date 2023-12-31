import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from "crypto";
import { Time } from "./time";


export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User | undefined {
        return this.users.find(user => { return user.email === email })
    }
    async registerUser(user: User): Promise<string> {
        if (this.users.some(rUser => { return rUser.email === user.email })) {
            throw new Error('User with the same email already registered.')
        }
        await user.setPassword(user.password); // Chame setPassword antes de adicionar o usuário
        const newId = crypto.randomUUID()
        user.id = newId
        this.users.push(user);
        return newId
    }
    
    registerBike(bike: Bike): string {
        const newId = crypto.randomUUID()
        bike.id = newId
        this.bikes.push(bike)
        return newId
    }


    rentBike(bikeId: string, userEmail: string, start: Time): void {
        const bike = this.bikes.find(bike => bike.id === bikeId)
        if (!bike) {
            throw new Error('Bike not found.')
        }
        const user = this.findUser(userEmail)
        if (!user) {
            throw new Error('User not found.')
        }
       
        const newRent = Rent.create(bike, user,start)
        this.rents.push(newRent)
    }



    removeUser(email: string): void {
        const userIndex = this.users.findIndex(user => user.email === email)
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1)
            return
        }
        throw new Error('User does not exist.')
    }



    returnBike(bikeId: string, userEmail: string,returnTime: Time, start: Time): Number {
        const rent = this.rents.find(rent =>
            rent.bike.id === bikeId &&
            rent.user.email === userEmail
        )
        if (rent) {
            rent.end = returnTime
            rent.valor = rent.valorTot(start, returnTime)
            return rent.valorTot(start, returnTime)
        }
        throw new Error('Rent not found.')
    }

    listUsers(): User[] {
        if(this.users.length === 0){
            throw new Error("Nenhum usuário cadastrado")
        }
        return this.users;
    }

    listRent(): Rent[]{
        if(this.rents.length === 0){
            throw new Error("Nenhum aluguel cadastrado")
        }
        return this.rents;
    }

    listBikes(): Bike[]{
        if(this.bikes.length === 0){
            throw new Error("Nenhuma bike cadastrada")
        }
        return this.bikes;
    }

    async authenticateUser(userEmail: string, password: string): Promise<boolean> {
        const user = this.findUser(userEmail);
        if (user) {
            const passwordMatch = await user.checkPassword(password);
            return passwordMatch;
        }
        return false;
    }


}

// import {Bike} from "./bike";
// import {Rent} from "./rent";
// import {User} from "./user";

// export class App{
//     users: User[] = []
//     bikes: Bike[] = []
//     rents: Rent[] = []

//     // register bike
//     // remove user
//     // rent bike
//     // return bike
    
//     findUser(email: string): User | undefined{
//         return this.users.find(user =>{ return user.email === email})
//     }

//     addUser(user: User):void{
//         for(var j = 0;j<this.users.length;j++){
//             if(this.users[j].email===user.email){
//                 throw new Error('duplicate user')

//             }
//         }
        
//         this.users.push(user)
//     }
// }

    
//     //     for(const rUser of this.users){
//     //         if(rUser.email===user.email){ ->>>>>>>>>>>(serve para comparar tipo e valor os ===)
//     //             throw new Error('duplicate user')

//     //         }
//     //     }
        
//     //     this.users.push(user)
//     // }

// //     //addUser(user: User){
// //         //for(const rUser of this.users){
// //             //if(rUser.email === user.email){
// //                 throw new Error('User already registered')
// //             }
// //         }
// //         this.users.push(user)
// //     }
    
// // }


