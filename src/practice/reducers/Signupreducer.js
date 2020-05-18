const defalutsignupstate=[];

export default(state=defalutsignupstate,action)=>{
        switch(action.type){
        case 'SIGN_UP':
        return state.concat(action.payload)
        
        default:
        return state;
        }
    }