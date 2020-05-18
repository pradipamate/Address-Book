const defaultLoginstate=[];

export default(state=defaultLoginstate,action)=>{
    switch(action.type){
        case 'Login':
            return[
                ...action.payload
            ]
            default:
                return state;
    }
}