export class BadError extends Error {}

export class EmailAlreadyExist extends  Error{
   
     constructor(){
        super('E-mail já existe na plataforma')
    }
}

export class InvalidCredentials extends Error {
    constructor(){
        super('❌Credential inválida❗')
    }
}

export class ResourceNotFoundError extends Error {
    constructor(){
        super('Recurso não encontrado❌')
    }
}