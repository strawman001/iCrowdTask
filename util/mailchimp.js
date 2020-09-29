const mailchimp = require('@mailchimp/mailchimp_marketing');
const md5 = require('md5');
const mailchimpConfigurer = require('../configure').mailchimp; 

function MailChimpModule(){
    this.subscribe = function(userInfo){
        
        const listId = mailchimpConfigurer.listId;
        const subscribingUser = {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email
        };

        mailchimp.setConfig({
            apiKey: mailchimpConfigurer.apiKey,
            server: mailchimpConfigurer.server
        });
          
        async function run() {
            console.log("Run subscribe!!!");
            const response = await mailchimp.lists.addListMember(listId, {
                email_address: subscribingUser.email,
                status: "subscribed",
                merge_fields: {
                    FNAME: subscribingUser.firstName,
                    LNAME: subscribingUser.lastName
                }
            }).catch(error=>{
                console.log(error);
            });
           
        }

        run();
    }

 
    this.setForgetPasswordEvent = function(email,authCode){

        const listId = mailchimpConfigurer.listId;
        mailchimp.setConfig({
            apiKey: mailchimpConfigurer.apiKey,
            server: mailchimpConfigurer.server
        });
        
        const subscriberHash = md5(email.toLowerCase());
        const options = {
            name: "forget_password",
            properties: {
                'code':authCode
            }
        };
        
        async function run() {
            const response = await mailchimp.lists.createListMemberEvent(
                listId,
                subscriberHash,
                options
            ).catch(error=>{
                console.log(error);
            });
            
        }
        
        run();
    }

}


module.exports = MailChimpModule;