import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({

  host:process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const configEmail = (to: string, subject:string, body: string) => {

    return {
    from:process.env.EMAIL_USER, 
    to:  to, 
    subject: subject, 
    text: "Código de Activação", 
    html: body}

  }

 export const send = (to: string, subject: string, body: string) => { 
    
    
  console.log(subject,body)  
  
  transporter
  .sendMail(configEmail(to,subject,body))
  .then((res) => {
       
    transporter.close();  return {data:res, success:true} })
  .catch((error) => {
    console.log('email nao enviado',error)
    transporter.close();
      return {data:error, success:false} })
}