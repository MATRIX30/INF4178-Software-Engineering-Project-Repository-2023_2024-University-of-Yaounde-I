import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { config } from '../constants/config';
import { useToast } from 'react-native-paper-toast';
// import UserContext from '../contexts/UserContext';

const useDataFetching = (url, notAutoFect) => {
  const toaster = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState({
    error: "",
    success: ""
  })
  // const {user} = useContext(UserContext);
  
  const fetchData = useCallback(async () => {
    if(url){
      console.log("🚀 ~ file: useDataFetching.js:12 ~ useDataFetching ~ url:", url)
    try {
      setLoading(true);
      const response = await fetch(config.app.api_url+'/'+url, {
        method: 'GET',
        // headers: {
          //   Authorization: 'Bearer ' + user.token,
          // },
        });
      if(response.ok){

        const resultJson = await response.json();
        
        if (resultJson) {
          
          setData(resultJson?.result);
          setMessage({error: "", success: resultJson?.message})
          setLoading(false);
        }
      }else{
        setData(null)
      setMessage({error: response?.message, success: ''})
      console.log("🚀 ~ file: useDataFetching.js:45 ~ fetchData ~ e:", response)
      toaster.show({ message: "une erreur s'est produite", type: 'error', duration: 5000, position : 'top' })
      setMessage({error: "une erreur s'est produite", success: ''})
      setLoading(false);
      }
    } catch (e) {
      setData(null)
      console.log("🚀 ~ file: useDataFetching.js:40 ~ fetchData ~ e:", e)
      toaster.show({ message: e?.message, type: 'error', duration: 5000, position : 'top' })
      setMessage({error: e?.message, success: ''})
      setLoading(false);
    }
  }
  }, [url]);

  useEffect(() => {
    !notAutoFect && fetchData();
  }, [url]);


  return [loading, message, data, fetchData, setData];
};

export default useDataFetching;
