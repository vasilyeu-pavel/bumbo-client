import actionTypes from '../constants/app';
import Immutable from 'immutable';

export default function validation (obj, dispatch) {

const destination = obj.get("destination") || obj.get("defaultDestination").toJS();
const searchParams = obj.get('searchParams')
const date_from =  searchParams.get('date_from')
const date_to =  searchParams.get('date_to')

const date_to_any = searchParams.get('date_to_any')

const validObjImmut =  Immutable.Map({
	validInputDestination: destination.id,
	validInputDateFrom: date_from,
	validInputDateTo: date_to,
})

const validObj = validObjImmut.toJS()

if (!date_to) {
    dispatch({ 
      type: actionTypes.SET_PARAMS_ANY,
    })
}

for (let key in validObj) {
    if (!validObj[key]) {
      dispatch({ 
        type: actionTypes.CHECKED_VALIDATION,
        payload: key,
       })
    }
  }
}