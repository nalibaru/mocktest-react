const checkAuthentication = async (username, password) => {
    try {
      const encodedUsername = encodeURIComponent(username);
      const encodedPassword = encodeURIComponent(password);
      const url = `http://localhost:3001/api/authenticate?username=${encodedUsername}&password=${encodedPassword}`;
  
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } 
      const data = await response.json();
      return data; 
    } catch (err) {
      console.error("Failed to fetch:", err);
      throw err; 
    }
  };
  
export default checkAuthentication;
  
