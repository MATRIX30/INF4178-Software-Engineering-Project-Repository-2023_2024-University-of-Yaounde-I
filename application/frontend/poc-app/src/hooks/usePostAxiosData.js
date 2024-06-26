import { useState } from "react";
import { config } from "../constants/config";
import axios from "axios";
import { useToast } from "react-native-paper-toast";
// import { useAuthHeader } from "react-auth-kit";

const usePostAxiosData = (url, method = "POST") => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [errorMassage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState({
    status: null,
    message: "",
  });
  // const authHeader = useAuthHeader();
  const toaster = useToast();
  const postAxiosData = async (data, contentType) => {
    // console.log("🚀 ~ postAxiosData ~ data:", data)
    // console.log("🚀 ~ postAxiosData ~ `${config.app.api_url}/${url}`,:", `${config.app.api_url}/${url}`,)
    try {
      setLoading(true);
      setErrorMessage(null)
      const configurationData = {
        method: method,
        url: `${config.app.api_url}/${url}`,
        headers: {
          "Content-Type": contentType || "application/json",
          // Authorization: authHeader(),
        },
        data: data,
      };
      await axios(configurationData)
        .then((response) => {
          // console.log("🚀 ~ file: usePostAxiosData.js:44 ~ postAxiosData ~ entrie", response)

          setLoading(false);

          // console.log("RESPONSE post", response);
          if (response?.status === 200 || response?.status === 201 || response?.data?.status === 200 || response?.data?.status === 201) {
            
            // console.log("🚀 ~ file: usePostAxiosData.js:44 ~ postAxiosData ~ 200", response?.data)
            setResult(response?.data);
            setSuccessMessage({
              status: response?.data?.status || response?.status,
              message: response?.data?.message,
            });
            toaster.show({ message: response?.data?.message, type: 'success', position : 'top' })

          }

        })
        .catch((error) => {
          console.log("🚀 ~ file: usePostAxiosData.js:44 ~ postAxiosData ~ error:", error)
          let message =  error?.response?.data?.message ||  "Desolé, Une erreur s'est produite, Veillez eééssayer plutard"
          error?.code === 'ERR_NETWORK'? message = 'Problème de conexion. Verifiez votre connexion internet svp.' : ''
          toaster.show({ message: message, type: 'error', duration: 5000, position : 'top' })

          setLoading(false);
          setErrorMessage({
            status: error?.response?.status,
            message: message,
          });
          return null;
        });
    } catch (error) {
      setLoading(false);
      setErrorMessage({
        status: error?.response?.data?.status,
        message: error?.response?.data?.message || "Desolé, Une erreur s'est produite",
      });
    }
  };

  return [loading, postAxiosData, errorMassage, successMessage, result];
};

export default usePostAxiosData;