
export class CustomError extends Error {
    
    data: any;

    constructor(message: any) {
        if( ! (typeof message === 'string') ){
            super();
            this.data = message;
        } else super(message);
    }

  }