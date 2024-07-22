import React, { createContext, useContext, useState, useEffect } from 'react';
export const curr_context = createContext();

export default function Central(props) {
  const backend_url = 'http://localhost:7000';
  const [beforeCall,setBeforeCall]=useState(false);
  const [userid, set_userid] = useState(null);
  const [google_user, set_google_user] = useState(null);
  const [user, set_user] = useState(null);
  const [tables, setTables] = useState(['Books', 'Users']);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [isMySQL, setMySQL] = useState(null);
  const [mongodbObj, setMongodbObj] = useState({});
  const [sqlObj, setSqlObj] = useState({});
  useEffect(() => {
    console.log(google_user);
    (async () => {
      if (google_user) {
        let body = {
          name: google_user.name,
          email: google_user.email,
          picture: google_user.picture,
          password: '12345678',
        };
        // await fetcher("/aagam/add_if_not" , body)
        // const data = await fetcher("/aagam/userid" , {email : google_user.email})
        // set_userid(data._id)
        set_user(body);
      }
    })();
  }, [google_user]);
  return (
    <>
      <curr_context.Provider
        value={{
          backend_url,
          user,
          set_user,
          google_user,
          userid,
          set_google_user,
          tables,
          setTables,
          selectedCollection,
          setSelectedCollection,
          isMySQL,
          setMySQL,
          mongodbObj,
          setMongodbObj,
          sqlObj,
          setSqlObj,
          beforeCall,
          setBeforeCall
        }}
      >
        {props.children}
      </curr_context.Provider>
    </>
  );
}
