import axios from 'axios';
import React, { useEffect, useState } from 'react'

axios.defaults.baseURL = "https://opentdb.com"

const useAxios = ({url}) => {
    const [res,setRes] = useState(null);
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const fetchData = () => {
            axios
            .get(url)
            .then((res)=> setRes(res.data))
            .catch((err) => setError(err))
            .finally(()=>setLoading(false))
        }
        fetchData();
    },[url])
  return {
    res,
    error,
    loading
  }
}

export default useAxios