import { useEffect, useState} from "react";

export function GetTransactions(link) {
    var [items, setUsers] = useState([]);
    useEffect((items) => {
  
      const fetchFunction = async () => {
        const response = await fetch(link);
        const json = await response.json();
        items = setUsers(() => json.map((items) => (
            {
              'time': items.TIME,
              'value': items.VALUE
            })));
      };
  
      const controller = new AbortController(); // <-- create controller
    
      fetchFunction({ controller }); // <-- pass controller
    
      return () => controller.abort(); // <-- return cleanup function
    }, [link]);
  
    return items
  }

  export function GetPrice(link) {
    var [items, setUsers] = useState([]);
    useEffect((items) => {
  
      const fetchFunction = async () => {
        const response = await fetch(link);
        const json = await response.json();
        items = setUsers(() => json.map((items) => (
            {
              'time': items.time,
              'high': items.high,
              'low': items.low,
              'open': items.open,
              'close':items.close
            })));
      };
  
      const controller = new AbortController(); // <-- create controller
    
      fetchFunction({ controller }); // <-- pass controller
    
      return () => controller.abort(); // <-- return cleanup function
    }, [link]);
  
    return items
  }