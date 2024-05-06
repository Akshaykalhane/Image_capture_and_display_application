export const gallaryReducer=(state,action)=>{
    switch(action.type){
      case 'set_zoomedIn':
        return {...state,isZoomed:true,zoomedImage:action.payload.img_url}
      case 'set_zoomout' : 
      return {...state,isZoomed:false,zoomedImage:null}
      case 'delete_img':
        return {
          zoomedImage:null,
          isZoomed:false,
          isDelete:false,
        }
      case 'set_delete':
        return {...state,isDelete:true}
      case 'cancel_delete':
        return {...state,isDelete:false}
    }
}

export const initialState={
    isZoomed:false,
    zoomedImage:null,
    isDelete:false
  }