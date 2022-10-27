import './commands/web/webCommands.ts'
import './commands/services/serviceCommands.ts'
declare global {
    namespace Cypress {
        interface Chainable {        
          login(username: string, password: string): Chainable<Element>,
          authenticate(username: string, password: string): Chainable<Element>
          getPsuedoAttribute(el:any, psuedoAttribute: string, propertyVal:string): Chainable<Element>
        }
      }
}
