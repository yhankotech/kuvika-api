import { send } from './emailAdapter'

const sendEmail = (to: string, subject:string, fullName: string, code?: number) => {
    let link, res;
    switch (subject) {
        case "Cadastro":
             link=` Olá <b>${fullName}</b>,

             <p> Bem-vindo(a) à Kuvica! Estamos muito felizes em tê-lo(a) connosco. </p>
             
            <p> Por favor, utilize o código de ativação abaixo.</p>
             
             <h2> Código de activação : <h2>${code}</h2></h2>
             
             <p> Por favor, insira este código na tela de ativação para concluir o processo de registro.</p>
             
            <p> Se você não solicitou este código, por favor, ignore este email ou entre em contato com o suporte ao cliente.</p>
             
             <p>
             <b> Atenciosamente,</b>  
             <b> Equipa de suporte Kuvica</b>
             <b>geral@kuvicagmail.com </b>
             <b> Whatsapp:+244943558106</b>
             </p> 
         `
             res = send(to,"Cadastomento na plataforma",link)
           return res
        break;
        case "Serviço":
            link=` Olá <b>${fullName}</b>,          
            
            <p> Tem notificaçóes sobre serviço.</p>
            
            <p>
            <b> Atenciosamente,</b>  
             <b> Equipa de suporte Kuvica</b>
            <b>geral@gmail.com </b>
            <b> Whatsapp:+244943558106</b>
            </p> 
        `
            res = send(to,"Serviço",link)
          return res
       break;
        case "Mensagens":
            link=` Olá <b>${fullName}</b>,

            <p> Tem uma mensagem nova na caixa de entrada.</p>
        
            <b> Atenciosamente,</b>  
            <b> Equipa de suporte Kuvica</b>
            <b>geral@kuvicagmail.com </b>
            <b> Whatsapp:+244943558106</b>
            </p> 
            `
                res = send(to,"Novasmensagens recebidas",link)
             return res
        break;
        case "Avaliação":
            link=` Olá <b>${fullName}</b>,

            <p> Tem nova avaliação de um cliente. </p>
                
            <p>
            <b> Atenciosamente,</b>  
            <b> Equipa de suporte Kuvica</b>
            <b>geral@kuvicagmail.com </b>
            <b> Whatsapp:+244943558106</b>
            </p> 
            `
                res = send(to,"Avaliações deixadas",link)
             return res
        break;    
    }

}

export { sendEmail }